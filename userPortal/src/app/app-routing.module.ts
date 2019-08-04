import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {DeshboardComponent} from './ui/deshboard/deshboard.component';
import {ErrorComponent} from './error/error.component';
import {ChangepasswordComponent} from './auth/changepassword/changepassword.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'dashboard', component: DeshboardComponent},
  {path: 'change-password', component: ChangepasswordComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
