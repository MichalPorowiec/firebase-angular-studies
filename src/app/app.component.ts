import { Component } from '@angular/core';
import { FirestoreService } from './firebase/db/firestore.service';
import { Observable } from 'rxjs';
import { Classmate } from './entities/classmate';
import { SessionService } from './availabilityPicker/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ADSI';
  classmates:Observable<Classmate[]>;

  constructor(private db: FirestoreService, private session: SessionService) {
  }
}
