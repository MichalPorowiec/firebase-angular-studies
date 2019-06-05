import { Component, OnInit, Input } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-qa-section',
  templateUrl: './qa-section.component.html',
  styleUrls: ['./qa-section.component.scss']
})
export class QaSectionComponent implements OnInit {
  caretDownIcon;
  shouldShowAnswer;
  @Input() question;
  @Input() answer;

  constructor() {
    this.shouldShowAnswer = false;
    this.caretDownIcon = faAngleDown;
   }

  ngOnInit() {
  }

  showAnswer() {
    this.shouldShowAnswer = !this.shouldShowAnswer;
  }

}
