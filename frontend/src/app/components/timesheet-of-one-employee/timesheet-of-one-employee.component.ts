import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimesheetService } from '../../services/timesheet.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timesheet-of-one-employee',
  imports: [CommonModule],
  templateUrl: './timesheet-of-one-employee.component.html',
  styleUrl: './timesheet-of-one-employee.component.css'
})
export class TimesheetOfOneEmployeeComponent implements OnInit {
  timesheets: any[] = [];
  groupedTimesheets: any[] = []; // New variable to store the grouped timesheets
  todayTimesheet: any = null;    // Store today's timesheet
  employeeId: any;

  constructor(
    private route: ActivatedRoute,
    private timesheetService: TimesheetService
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id')); // Get employee ID
    this.loadTimesheets(); // Load timesheets
  }

  // Fetch the timesheets and group them by month
  loadTimesheets() {
    this.timesheetService.getTimesheetsByEmployee(this.employeeId).subscribe({
      next: (data: any[]) => {
        this.timesheets = data;

        // Separate today's timesheet
        const today = new Date();
        const todayDate = today.toISOString().split('T')[0]; // Get today's date (yyyy-mm-dd)
        this.todayTimesheet = this.timesheets.find(timesheet => timesheet.date === todayDate);

        // Group the remaining timesheets by month (except today's timesheet)
        this.groupedTimesheets = this.groupByMonth(
          this.timesheets.filter(timesheet => timesheet.date !== todayDate)
        );
      },
      error: (err) => {
        console.error('Failed to load timesheets:', err);
      }
    });
  }

  // Helper function to group timesheets by month
  groupByMonth(timesheets: any[]) {
    const months: { [key: string]: any[] } = {};

    timesheets.forEach(timesheet => {
      const month = new Date(timesheet.date).toISOString().split('T')[0].slice(0, 7); // Get yyyy-mm
      if (!months[month]) {
        months[month] = [];
      }
      months[month].push(timesheet);
    });

    return Object.keys(months).map(month => ({
      month: new Date(month), // Convert the key (yyyy-mm) to a Date object
      timesheets: months[month]
    }));
  }

  // Method to validate or reject a timesheet
  validate(id: number, action: 'validate' | 'reject') {
    this.timesheetService.validateTimesheet(id, action).subscribe({
      next: () => {
        this.loadTimesheets(); // Refresh the timesheets after validation
      },
      error: (err) => {
        console.error('Validation error:', err);
      }
    });
  }
}