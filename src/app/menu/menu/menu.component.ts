import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuRoute } from '../interfaces/menu-route';
import { faTable, faUser, faQuestion, faGraduationCap} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  headerIcon;
  menuItems: MenuRoute[];

  constructor(private router: Router) {
    this.headerIcon = faGraduationCap;

    this.menuItems = [
      {name: 'Session Availability', icon: faTable, routerLink: '/availabilityPicker'},
      {name: 'Questions', icon: faQuestion, routerLink: '/questions'},
      {name: 'Profile', icon: faUser, routerLink: '/profile'}];
   }

   _checkActive() {
     this.menuItems.map(el => ('/' + el.name) === this.router.url);
   }

  ngOnInit() {
  }

}
