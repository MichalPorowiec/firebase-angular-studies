import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaSectionComponent } from './sub-components/qa-section/qa-section.component';
import { FaqComponent } from './faq.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [QaSectionComponent, FaqComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [ FaqComponent ]
})
export class FaqModule { }
