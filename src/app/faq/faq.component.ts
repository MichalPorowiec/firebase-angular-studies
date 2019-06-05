import { Component, OnInit } from '@angular/core';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Question } from './entities/question';
import { FaqService } from './faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  host: {class: 'routingClass'},
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  bookIcon;
  faq: Question[];  

  constructor(private faqService:FaqService) {
    this.bookIcon = faBookOpen;
    this.faq = [];
    this.faqService.getQuestions().then(questions => this.faq = questions)    
   }

  ngOnInit() {
  }

  isFaqInitialized() {
    return this.faq.length > 0;
  }
}
