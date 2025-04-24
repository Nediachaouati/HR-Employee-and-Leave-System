import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DemandeCongeComponent } from './components/demande-conge/demande-conge.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponentComponent,
      },
      {
        path: 'home',
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
      }

    ];

