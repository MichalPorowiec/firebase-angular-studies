import { Injectable } from '@angular/core';
import { Classmate } from '../entities/classmate';
import { FirebaseAuthService } from '../firebase/db/firebase-auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Classmate;
  private _userIdCookieName;

  constructor(private auth:FirebaseAuthService, private cookies: CookieService) {
   this._userIdCookieName = 'adsi-user';
   const uid = this.cookies.get(this._userIdCookieName);

    this.user = new Classmate({
      name: '',
      lastName: ''
    })

    if (!uid || uid.length <= 0) {
      this.auth.logoutUser();
    }

    this.user.id = this.auth.userId;

    if (typeof(this.user.id) !== 'string' || this.user.id.length <= 0) {
      this.user.id = uid;
    }
   }
   //TODO integration with auth and removing the mock

  setUserId(uid: string) {
    this.cookies.set(this._userIdCookieName, uid);
    this.user.id = uid;
  }


}
