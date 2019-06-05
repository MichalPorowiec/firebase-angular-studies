import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { MenuRoute } from '../interfaces/menu-route';
import { faTable, faUser, faEnvelope, faQuestion, faGraduationCap} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges{
  headerIcon;
  menuItems: MenuRoute[];

  constructor(private router: Router) {
    this.headerIcon = faGraduationCap;

    this.menuItems = [
      {name: 'Session Availability', icon: faTable, routerLink: '/availabilityPicker'},
      {name: 'Questions', icon: faQuestion, routerLink: '/questions'},
      {name: 'Email Generator', icon: faEnvelope, routerLink: '/emailGenerator'}
    ];

    if (window.location.pathname === "/") {
      this.menuItems[0].isActive = true;
    }
   }

  ngOnInit() {

  }

  ngOnChanges() {
    if (window.location.pathname === "/") {
      this.menuItems[0].isActive = true;
    } else {
      this.menuItems[0].isActive = false;
    }
  }
}
