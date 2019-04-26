import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvailabilityComponent } from './availability.component';
import { CalendarTileComponent } from './sub-components/calendar-tile/calendar-tile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AvailabilityComponent,
    CalendarTileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[
    AvailabilityComponent
  ]
})
export class AvailabilityModule { }
