import { Injectable } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/db/firestore.service';
import { ExaminSession } from 'src/app/entities/examin-session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private firestore: FirestoreService) {

   }

  getSessions(): Promise<ExaminSession[]> {
    return this.firestore.getSessions();
  }

  getActiveSession(): Promise<ExaminSession> {
    return new Promise((resolve, reject) => {
      this.getSessions().then((sessions: ExaminSession[]) => {
        const activeSession = sessions.find((session: ExaminSession) => session.isActive === true);

        !activeSession ? reject('No Active Session Available') : resolve(activeSession);
      });
    });
  }
}
