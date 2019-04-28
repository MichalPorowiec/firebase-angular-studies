import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailabilityComponent } from '../availabilityPicker/availability/availability.component';
import { EmailGeneratorComponent } from '../email-generator/email-generator.component';

const routes: Routes = [
  {path: "availabilityPicker", component: AvailabilityComponent},
  {path: "questions", component: AvailabilityComponent},
  {path: "emailGenerator", component: EmailGeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
