import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ResetComponent } from './reset/index';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }

];

export const routing = RouterModule.forRoot(routes, { useHash: true });
