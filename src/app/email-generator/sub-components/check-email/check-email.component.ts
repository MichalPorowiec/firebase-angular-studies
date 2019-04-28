import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-email',
  host: {class: 'routingClass'},
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {
  professorsEmail: string;
  constructor() {
    this.professorsEmail = "Janusz.Testowy@posl.pl";
   }

  ngOnInit() {
  }

}
