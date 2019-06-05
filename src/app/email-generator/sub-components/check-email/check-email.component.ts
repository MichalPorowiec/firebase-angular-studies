import { Component, OnInit } from '@angular/core';
import { GenerateEmailService } from '../../services/generate-email.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-check-email',
  host: {class: 'routingClass'},
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss']
})
export class CheckEmailComponent implements OnInit {
  emailCheckForm: FormGroup;
  professorsEmail: string;

  constructor(private emailService: GenerateEmailService) {
   }

  ngOnInit() {
    this.emailCheckForm = new FormGroup({
      professorsName: new FormControl(null),
      professorsLastName: new FormControl(null),
    });

    this.professorsEmail = "";
  }

  generateEmail() {
    console.log('a')
    this.emailService.generateEmail(this.emailCheckForm.controls['professorsName'].value, this.emailCheckForm.controls['professorsLastName'].value)
    .then(resp => this.professorsEmail = resp.email).catch(error => this.professorsEmail = "no email found")
  }
}
