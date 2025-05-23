import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DemandeCongeComponent } from './components/demande-conge/demande-conge.component';
import { ListLeaveComponent } from './components/list-leave/list-leave.component';
import { LeaveListRhComponent } from './components/leave-list-rh/leave-list-rh.component';
import { PerformanceEvalutaionComponent } from './components/performance-evalutaion/performance-evalutaion.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { EvaluationsOneEmployeeComponent } from './components/evaluations-one-employee/evaluations-one-employee.component';
import { AddtimesheetComponent } from './components/addtimesheet/addtimesheet.component';
import { TimesheetOfOneEmployeeComponent } from './components/timesheet-of-one-employee/timesheet-of-one-employee.component';
import { MyTimesheetsComponent } from './components/my-timesheets/my-timesheets.component';
import { CrudEmployeeComponent } from './components/crud-employee/crud-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateCongeComponent } from './components/update-conge/update-conge.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponentComponent,
      },
      {
        path: 'statistics/:userId',
        component: HomeComponentComponent,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      },
      {
        path: 'demande-leave',
        component: DemandeCongeComponent
      },
      {
        path: 'list-leave',
        component: ListLeaveComponent
      },
      {
        path: 'leave-list-rh',
        component: LeaveListRhComponent
      },
      { path: 'performance-evaluation/:employeeId', component: PerformanceEvalutaionComponent },
      {
        path: 'employees',
        component: ListEmployeeComponent
      },
      { path: 'evaluations/:id', component: EvaluationsOneEmployeeComponent },
      { path: 'addtimesheet', component: AddtimesheetComponent },
      { path: 'timesheet/:id', component: TimesheetOfOneEmployeeComponent }, 
      { path: 'mytimesheet/:id', component: MyTimesheetsComponent }, 
      { path: 'crudemployee', component: CrudEmployeeComponent }, 

      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'update-conge/:id', component: UpdateCongeComponent },
    ];

