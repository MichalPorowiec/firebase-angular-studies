import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from '../firebase/db/firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router:Router, private authService: FirebaseAuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.authService.checkStatus().subscribe((userInfo) => {
        if (userInfo) {
          if (this.router.url == '/login') {
            this.router.navigateByUrl('/');
          }
          
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })

      return true;
  }
  
}
