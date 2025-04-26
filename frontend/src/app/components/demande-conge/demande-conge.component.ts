import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeaveService } from '../../services/leave.service';
declare const coreui: any;
@Component({
  selector: 'app-demande-conge',
  imports: [FormsModule],
  templateUrl: './demande-conge.component.html',
  styleUrl: './demande-conge.component.css'
})
export class DemandeCongeComponent{
  form = {
    start_date: '',
    end_date: '',
    type: '',
    comments: ''
  };

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    const myCalendar = document.getElementById('myCalendarDisabledDates3');
    if (myCalendar) {
      const disableWeekends = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
      };

      const specificDates = [
        new Date(2024, 10, 25),
        new Date(2024, 11, 4),
        new Date(2024, 11, 12)
      ];

      const options = {
        calendarDate: new Date(2024, 10, 1),
        calendars: 2,
        disabledDates: [disableWeekends, ...specificDates],
        locale: 'fr-FR'
      };

      // @ts-ignore
      new coreui.Calendar(myCalendar, options);
    }
  }



  onSubmit(formData: any): void {
    this.leaveService.createDemand(this.form).subscribe({
      next: res => {
        alert('Demande soumise avec succès');
        formData.resetForm();
      },
      error: err => {
        console.error(err);
        alert('Erreur lors de la soumission');
      }
    });
}
}