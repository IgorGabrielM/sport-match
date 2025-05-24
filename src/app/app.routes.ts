import { Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {EventDetailComponent} from './pages/event-detail/event-detail.component';
import {ForumComponent} from './pages/forum/forum.component';
import {EventsComponent} from './pages/events/events.component';
import {MyEventsComponent} from './pages/my-events/my-events.component';
import {PostsComponent} from './pages/posts/posts.component';
import {CreateUserComponent} from './pages/create-user/create-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'events', component: EventsComponent },
  { path: 'my-events', component: MyEventsComponent },
  { path: 'posts/:id', component: PostsComponent },
];
