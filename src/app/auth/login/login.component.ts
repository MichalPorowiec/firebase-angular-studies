import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm : FormGroup;
  faCheck;

  constructor() {
    this.faCheck = faCheck;

    this.loginForm = new FormGroup({
      userEmail: new FormControl(),
      userPassword: new FormControl()
    })
   }

  tryToLogin() {

  }
}
