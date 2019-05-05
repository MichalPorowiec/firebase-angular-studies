import { Injectable, OnInit } from '@angular/core';
import { RegisterClassmate } from '../../entities/register-classmate';
import { FirebaseAuth } from 'node_modules/@angular/fire';
import { LoginClassmateParameters } from '../../entities/entitiesParameterInterfaces/login-clasmate-parameters';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn: boolean;
  userId :string; 

  constructor(private auth: AngularFireAuth) { 
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

  loginUser(userInfo:LoginClassmateParameters) :Promise<boolean> {
    return this.auth.auth
    .signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
    .then(callbackInfo =>{
      this.isLoggedIn = true
      return this.isLoggedIn;
    })
    .catch(error => false)
  }

  checkStatus(): Observable<firebase.User> {
    return this.auth.authState;
  }

  logoutUser(): Promise<void>{
    if (this.isLoggedIn) {
      return this.auth.auth.signOut();
    }
  }
}
