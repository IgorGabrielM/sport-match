import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuard} from './data/guards/auth.guard';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: 'login', component: LoginComponent },
];
