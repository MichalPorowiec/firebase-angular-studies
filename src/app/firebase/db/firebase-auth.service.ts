import { Injectable, OnInit } from '@angular/core';
import { RegisterClassmate } from '../../entities/register-classmate';
import { FirebaseAuth } from 'node_modules/@angular/fire';
import { LoginClassmateParameters } from '../../entities/entitiesParameterInterfaces/login-clasmate-parameters';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn: boolean;
  userId :string; 

  constructor(private auth: AngularFireAuth, private router: Router) { 
    this.isLoggedIn = false;

    this.auth.user.subscribe((userInfo: firebase.User) => {
      if (userInfo != null) {
        this.isLoggedIn = true;
        this.userId = userInfo.uid;
      }
    })
   }

  registerUser(userInfo:RegisterClassmate) :Promise<boolean> {
    return this.auth.auth
    .createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
    .then(callbackInfo => true)
    .catch(error => false)
  }

  loginUser(userInfo:LoginClassmateParameters) :Promise<string | boolean> {
    return this.auth.auth
    .signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
    .then(callbackInfo =>{
      this.isLoggedIn = true;
      return callbackInfo.user.uid;
    })
    .catch(error => false)
  }

  checkStatus(): Observable<firebase.User> {
    return this.auth.authState;
  }

  logoutUser(): Promise<void>{
    return this.auth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
