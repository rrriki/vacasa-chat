import {Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

export const appRoutes: Routes = [
  {path: '', redirectTo: '/chat', pathMatch: 'full'},
  {path: 'home', redirectTo: '/chat', pathMatch: 'full'},
  {path: 'chat', loadChildren: './chat/chat.module#ChatModule', canActivate: [AuthGuard]},
  {path: 'users', loadChildren: './user/user.module#UserModule'},
  {path: '**', redirectTo: '404'}
];
