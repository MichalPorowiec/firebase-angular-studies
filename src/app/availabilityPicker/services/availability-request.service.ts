import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AvailabilityService } from './availability.service';
import { SessionDay } from '../../entities/session-day';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityRequestService {

  constructor(private availabilityService: AvailabilityService) { }

  availableRequest(availabilityForm: FormGroup) {

  }

  notAvailableRequest(availabilityForm: FormGroup, tileDate:Date,  sessionId: string): Promise<boolean> {
    const sessionDay = new SessionDay({
      available: false,
      timeStamp: tileDate,
      unavailabilityReason: availabilityForm.controls.unavailabilityReason.value
    });

    return this.availabilityService.initAvailability(sessionDay, sessionId);
  }
}
