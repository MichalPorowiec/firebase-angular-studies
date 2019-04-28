import { Component, OnInit } from '@angular/core';
import { SessionDay } from '../../entities/session-day';
import { ClassmateSession } from 'src/app/entities/classmate-session';
import { AvailabilityService } from '../services/availability.service';
import { SessionDayAvailability } from 'src/app/entities/session-day-availability';
import { SessionService } from '../services/session.service';
import { ExaminSession } from '../../entities/examin-session';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-availability',
  host: {class: 'routingClass'},
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  sessionRef: string;
  sessionDays: Promise<SessionDay[]>;

  constructor(private availabilityService: AvailabilityService, private sessionService: SessionService) {
    this.sessionService.getActiveSession().then((activeSession: ExaminSession) => {
      this.sessionRef = activeSession.sessionName;
      this.sessionDays = this.availabilityService.getAvailability(activeSession.sessionName);
    })
  }

  checkColor(index: number) {
    if ((index % 2) === 1) {
      return {backgroundColor: 'white', 'color:' : '#213248'};
    } else {
      return {color: 'white', backgroundColor : '#213248'};
    }
  }
}
