import { Injectable } from '@angular/core';
import { AvailabilityInterface } from '../availability/interfaces/availability';
import { SessionDay } from 'src/app/entities/session-day';
import { FirestoreService } from 'src/app/firebase/db/firestore.service';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from './session.service';
import { ExaminSession } from 'src/app/entities/examin-session';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService implements AvailabilityInterface {
  constructor(private firestore: FirestoreService,  private userService: UserService, private sessionService: SessionService) { }

  updateAvailability(sessionDay: SessionDay, sessionId: string, dayId: string): Promise<boolean> {
    return this.firestore.editUserAvailability(sessionDay, sessionId, dayId)
  }

  initAvailability(sessionDay: SessionDay, sessionId: string): Promise<boolean> {
    return this.firestore.initUserAvailability(sessionDay, sessionId);
  }

  getAvailability(sessionId: string): Promise<SessionDay[]> {
    return this.firestore.getAvailability(sessionId);
  }

  getActiveSessionAvilability(): Promise<SessionDay[]> {
    return this.sessionService.getActiveSession().then((activeSession: ExaminSession) => {
      return this.getAvailability(activeSession.sessionName);
    });
  }

  initActiveSessionAvilability(){
    return this.getActiveSessionAvilability().then((currentExamSessionDays: SessionDay[]) => {
      if (currentExamSessionDays.length < 1) {
        console.log();
      }
    });
  }
}
