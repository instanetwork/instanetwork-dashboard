import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/index';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(routes, { useHash: true });
