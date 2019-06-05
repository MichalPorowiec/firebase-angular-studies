import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailabilityComponent } from '../availabilityPicker/availability/availability.component';
import { EmailGeneratorComponent } from '../email-generator/email-generator.component';
import { LoginGuard } from './login.guard';
import { LoginComponent } from '../auth/login/login.component';
import { FaqComponent } from '../faq/faq.component';

const routes: Routes = [
  {path: "", component: AvailabilityComponent, canActivate: [LoginGuard]},
  {path: "availabilityPicker", component: AvailabilityComponent, canActivate: [LoginGuard]},
  {path: "questions", component: FaqComponent, canActivate: [LoginGuard]},
  {path: "emailGenerator", component: EmailGeneratorComponent, canActivate: [LoginGuard]},
  {path: "login", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
