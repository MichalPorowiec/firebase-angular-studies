import { Injectable } from '@angular/core';
import { RegisterClassmate } from '../../entities/register-classmate';
import { FirebaseAuth } from 'node_modules/@angular/fire';
import { LoginClassmateParameters } from '../../entities/entitiesParameterInterfaces/login-clasmate-parameters';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isLoggedIn: boolean;
  userId :string; 

  constructor(private auth:FirebaseAuth) {
    this.isLoggedIn = false;

    if (this.isLoggedIn) {
      this.userId = this.auth.currentUser.uid;
    }
   }

  registerUser(userInfo:RegisterClassmate) :Promise<boolean> {
    return this.auth
    .createUserWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
    .then(callbackInfo => true)
    .catch(error => false)
  }

  loginUser(userInfo:LoginClassmateParameters) :Promise<boolean> {
    return this.auth
    .signInWithEmailAndPassword(userInfo.userEmail, userInfo.userPassword)
    .then(callbackInfo =>{
      this.isLoggedIn = true
      return this.isLoggedIn;
    })
    .catch(error => false)
  }
}
