import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../firebase/db/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: FirebaseAuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logoutUser().then(() => {
      this.router.navigateByUrl('/');
    })
  }
}
