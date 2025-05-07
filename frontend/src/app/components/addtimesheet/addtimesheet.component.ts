import { Component} from '@angular/core';
import { TimesheetService } from '../../services/timesheet.service';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-addtimesheet',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './addtimesheet.component.html',
  styleUrl: './addtimesheet.component.css'
})


export class AddtimesheetComponent{

timesheet = {
  date: '',
  hoursWorked: 0,
};
constructor(private timesheetService: TimesheetService) {}

submitForm() {
  this.timesheetService.addTimesheet(this.timesheet).subscribe({
    next: (res) => {
      alert('Timesheet submitted!');
      this.timesheet = { date: '', hoursWorked: 0 }
     }, error: (err) => alert('Error submitting timesheet'),
  });
}
}
