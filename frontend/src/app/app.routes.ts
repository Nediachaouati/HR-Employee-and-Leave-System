import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponentComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            {path:'navbar',component:NavbarComponent}
        ]
    }
];
