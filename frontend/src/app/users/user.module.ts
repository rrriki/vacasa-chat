import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserLoginComponent } from './user-login/user-login.component';

import {userRoutes} from './user.routes';
import { UserRegisterComponent } from './user-register/user-register.component';
import {UserService} from './user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [UserLoginComponent, UserRegisterComponent],
  providers: [UserService],
})
export class UserModule { }
