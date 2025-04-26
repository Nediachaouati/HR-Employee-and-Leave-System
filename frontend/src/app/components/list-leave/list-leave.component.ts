import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveService } from '../../services/leave.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-leave',
  imports: [CommonModule],
  templateUrl: './list-leave.component.html',
  styleUrl: './list-leave.component.css'
})
export class ListLeaveComponent {
  demandes: any[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveService.getMyDemands().subscribe(
      (data) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Error fetching demands', error);
      }
    );
  }


}
