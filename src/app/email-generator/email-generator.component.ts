import { Component, OnInit } from '@angular/core';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-email-generator',
  host: {class: 'routingClass'},
  templateUrl: './email-generator.component.html',
  styleUrls: ['./email-generator.component.scss']
})
export class EmailGeneratorComponent implements OnInit {
  shouldDisplayQuestionSection: boolean;
  shouldDisplayWholeEmailGenerator: boolean;
  shouldDisplayCheckEmail: boolean;
  faUndo;

  constructor() {
    this.faUndo = faUndo;

    this.shouldDisplayQuestionSection = true;
    this.shouldDisplayWholeEmailGenerator = false;
   }

  ngOnInit() {
  }
  
  displayWholeEmailGenerator() {
    this.shouldDisplayQuestionSection = false;
    this.shouldDisplayWholeEmailGenerator = true;
  }
  
  displayCheckEmail() {
    this.shouldDisplayQuestionSection = false;
    this.shouldDisplayCheckEmail = true;
  }

  returnToQuestionSection() {
    this.shouldDisplayQuestionSection = true;
    this.shouldDisplayCheckEmail = false;
    this.shouldDisplayWholeEmailGenerator = false;
  }
}
