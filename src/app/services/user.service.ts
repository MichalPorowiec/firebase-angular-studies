import { Injectable } from '@angular/core';
import { Classmate } from '../entities/classmate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Classmate;

  constructor() {
    this.user = new Classmate({
      name: 'Jacek',
      lastName: 'Tetowy',
      Sessions: [],
      id: 'test'
    });
   }
}
