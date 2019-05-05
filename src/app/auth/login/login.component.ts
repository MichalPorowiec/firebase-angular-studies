import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FirebaseAuthService } from '../../firebase/db/firebase-auth.service';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {class: 'routingClass'},
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  shouldThrowError: boolean;
  errorMessage: string;
  faCheck;

  constructor(private auth: FirebaseAuthService, private router:Router) {
    this.faCheck = faCheck;

    this.loginForm = new FormGroup({
      userEmail: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.required)
    })
   }

  tryToLogin() {
    this.auth.loginUser({
      userEmail: this.loginForm.controls.userEmail.value,
      userPassword: this.loginForm.controls.userPassword.value
    }).then(resp => {
      if (resp) {
        this.router.navigateByUrl('/');
      } else {
        this.throwError();
      }
    })
  }

  throwError(errorMessage?: string) {
    if (this.loginForm.invalid) {
      return;
    }

    if (!errorMessage) {
      this.errorMessage = "Unable to login, try again";
    } else {
      this.errorMessage = errorMessage;
    }

    this.shouldThrowError = true;
  }
}
