import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { LoginClassmateParameters } from '../../entities/entitiesParameterInterfaces/login-clasmate-parameters';
import { RegisterClassmate } from '../../entities/register-classmate';
import { Classmate } from 'src/app/entities/classmate';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseUserService {
  constructor(private auth: FirebaseAuthService, private firestore: FirestoreService) {
    
   }

  registerUser(userInfo: RegisterClassmate) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.registerUser(userInfo)
      .then(isRegistered => {
        if (isRegistered) {
          this.firestore.initUserInDb(userInfo);
          resolve(true);
        } else {
          reject("Can't register user. Try Again Later")
        }
      })
    })
  }

  loginUser(userInfo:LoginClassmateParameters) : Promise<Classmate> {
    return new Promise((resolve, reject) => {
      this.auth.loginUser(userInfo)
      .then(isLoggedIn => {
        if (isLoggedIn) {
          resolve(this.firestore.getUser(this.auth.userId));
        } else {
          reject("Login Failed. Try Again Later");
        }
      })
    })
  }
}
