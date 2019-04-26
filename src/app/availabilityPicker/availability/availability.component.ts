import { Component, OnInit } from '@angular/core';
import { SessionDay } from '../../entities/session-day';
import { ClassmateSession } from 'src/app/entities/classmate-session';
import { AvailabilityService } from '../services/availability.service';
import { SessionDayAvailability } from 'src/app/entities/session-day-availability';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  session: ClassmateSession;
  tiles: SessionDay[];

  constructor(private availabilityService: AvailabilityService, private ses: SessionService) {
    this.session = new ClassmateSession({
      didPass: false,
      sessionRef: 'sessionOne',
      availability: [
        new SessionDay({timeStamp: new Date(2019, 6, 25), available: false, AvailabilityTime: new SessionDayAvailability({
          availableFrom: new Date(0,0,0,12),
          availableTo: new Date(0,0,0,13)
        })}),
        new SessionDay({timeStamp: new Date(2019, 6, 26), available: false}),
        new SessionDay({timeStamp: new Date(2019, 6, 27), available: false}),
        new SessionDay({timeStamp: new Date(2019, 6, 28), available: false}),
        new SessionDay({timeStamp: new Date(2019, 6, 29), available: false}),
        new SessionDay({timeStamp: new Date(2019, 6, 30), available: false}),
        new SessionDay({timeStamp: new Date(2019, 6, 31), available: false}),
        new SessionDay({timeStamp: new Date(2019, 7, 1), available: false}),
        new SessionDay({timeStamp: new Date(2019, 7, 2), available: false}),
        new SessionDay({timeStamp: new Date(2019, 7, 3), available: false})
      ]
    });

    this.availabilityService.getAvailability('sessionOne').then(response => (response));
    this.tiles = this.session.availability;
   }

  checkColor(index: number) {
    if ((index % 2) === 1) {
      return {backgroundColor: 'white', 'color:' : '#213248'};
    } else {
      return {color: 'white', backgroundColor : '#213248'};
    }
  }
}
