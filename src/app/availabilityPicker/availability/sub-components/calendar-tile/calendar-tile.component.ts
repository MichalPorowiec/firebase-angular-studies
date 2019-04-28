import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import { SessionDayAvailability } from 'src/app/entities/session-day-availability';
import { SessionDay } from 'src/app/entities/session-day';
import { AvailabilityService } from 'src/app/availabilityPicker/services/availability.service';
import { CustomValidatorService } from '../../../../services/custom-validator.service';
import { AvailabilityRequestService } from '../../../services/availability-request.service';

@Component({
  selector: 'app-calendar-tile',
  templateUrl: './calendar-tile.component.html',
  styleUrls: ['./calendar-tile.component.scss']
})
export class CalendarTileComponent implements OnInit {
  @Input() availability: SessionDayAvailability;
  @Input() tileDate: Date;
  @Input() tileColor: {'backgroundColor', 'color'};
  @Input() sessionId: string;
  isAvailable: boolean;
  availabilityForm: FormGroup;
  unavailabilityForm: FormGroup;
  currentSlide: number;
  availableFrom: string;
  availableTo: string;
  isDone: boolean;
  tileDateDisplay: string;
  faCheck; faTimes; faUndo;

  constructor(
    private availabilityService: AvailabilityService, 
    private customValidators: CustomValidatorService, 
    private availabilityRequestService:AvailabilityRequestService
  ) {
    this.faCheck = faCheck;
    this.faTimes = faTimes;
    this.faUndo = faUndo;

    this.currentSlide = 1;
    this.isDone = false;

    this.availabilityForm = new FormGroup({
      availableFrom: new FormControl(null),
      availableTo: new FormControl(null),
      availableWholeDay: new FormControl(null),
      unavailabilityReason: new FormControl(null)
    });
    this.availabilityForm.setValidators(this.customValidators.timeValidator());
  }

  private _tileDataInitialization() {
    if (this.availability) {
      this.availableFrom = this.availability.availableFrom.getHours().toString();
      this.availableTo = this.availability.availableTo.getHours().toString();
    } else {
      this.availableFrom = '';
      this.availableTo = '';
    }
  }

  availabilityResponse(isAvailable: boolean) {
    this.isAvailable = isAvailable;
    this.currentSlide = 2;
  }

  ngOnInit(): void {
    const day = this.tileDate.getDate() < 10 ? `0${this.tileDate.getDate()}` : this.tileDate.getDate();
    const month = this.tileDate.getMonth() + 1 < 10 ? `0${this.tileDate.getMonth() + 1}` : this.tileDate.getMonth() + 1;
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = daysNames[this.tileDate.getDay()];
    
    this.tileDateDisplay = `${day}.${month} ${dayName}`;

    this._tileDataInitialization();
  }

  requestResponseHandler(responseStatus: boolean) {
    this.isDone = responseStatus;
    this.currentSlide += 1;
  }

  requestSendHandler() {
    this.currentSlide += 1;
  }

  onSubmit() {
    let availableWholeDay = this.availabilityForm.controls.availableWholeDay.value; 

    const sessionDay = new SessionDay({
      timeStamp: this.tileDate,
      available: true,
      AvailabilityTime: new SessionDayAvailability({
        availableFrom: new Date(),
        availableTo: new Date()
      })
    });

    const availableFrom = new Date(this.tileDate);
    const availableTo = new Date(this.tileDate);

    if (!availableWholeDay) {
      availableFrom.setHours(parseInt(this.availabilityForm.controls.availableFrom.value));
      availableTo.setHours(parseInt(this.availabilityForm.controls.availableTo.value));
    } else {
      availableFrom.setHours(1);
      availableTo.setHours(23);
      availableTo.setMinutes(59);
    }

    sessionDay.AvailabilityTime.availableFrom = availableFrom;
    sessionDay.AvailabilityTime.availableTo = availableTo;

    this.currentSlide += 1;
    this.availabilityService.initAvailability(sessionDay, this.sessionId).then((requestResponse) => {
      this.requestResponseHandler(requestResponse);
    });
  }

  noAvailableSubmit() {
    this.requestSendHandler();
    this.availabilityRequestService.notAvailableRequest(this.availabilityForm, this.tileDate, this.sessionId).then((requestStatus: boolean) => {
      this.requestResponseHandler(requestStatus);
    });
  }
}
