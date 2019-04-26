import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailabilityComponent } from '../availabilityPicker/availability/availability.component';

const routes: Routes = [
  {path: "availabilityPicker", component: AvailabilityComponent},
  {path: "questions", component: AvailabilityComponent},
  {path: "profile", component: AvailabilityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
