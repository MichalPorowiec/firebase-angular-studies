import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';
import { SessionDayAvailability } from 'src/app/entities/session-day-availability';
import { SessionDay } from 'src/app/entities/session-day';
import { AvailabilityService } from 'src/app/availabilityPicker/services/availability.service';

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

  constructor(private availabilityServcie: AvailabilityService) {
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
    this.availabilityForm.setValidators(this.timeValidator());
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
    const month = this.tileDate.getMonth() < 10 ? `0${this.tileDate.getMonth()}` : this.tileDate.getMonth();
    this.tileDateDisplay = `${day}.${month}`;

    this._tileDataInitialization();
  }

  requestResponseHandler(responseStatus: boolean) {
    this.isDone = responseStatus;
    this.currentSlide += 1;
  }

  timeValidator(): ValidatorFn {
    return (form: FormGroup): ValidationErrors => {
      const availableFrom = form.controls['availableFrom'];
      const availableTo = form.controls['availableTo'];
      const availableWholeDay = form.controls['availableWholeDay'];

      const checkboxIsTrue = (availableWholeDay.value == null || availableWholeDay.value === false);
      if ((availableFrom.value == null ||
        availableFrom.value > 24 ||
        availableFrom.value < 0 ||
        isNaN(parseInt(availableFrom.value))) &&
        checkboxIsTrue ) {
        return {outOfRange: true};
      }
      if ((availableTo.value == null ||
        availableTo.value > 24 ||
        availableTo.value < 0 ||
        isNaN(parseInt(availableTo.value))) &&
        checkboxIsTrue) {
        return {outOfRange: true};
      }

      return null;
    };
  }

  onSubmit() {
    const availableWholeDay = this.availabilityForm.controls.availableWholeDay.value;

    const sessionDay = new SessionDay({
      timeStamp: this.tileDate,
      available: true,
      AvailabilityTime: new SessionDayAvailability({
        availableFrom: new Date(),
        availableTo: new Date()
      })
    });

    if (availableWholeDay !== false) {
      const availableFrom = parseInt(this.availabilityForm.controls.availableFrom.value);
      const availableTo = parseInt(this.availabilityForm.controls.availableTo.value);

      sessionDay.AvailabilityTime.availableFrom = new Date(null, null, null, availableFrom);
      sessionDay.AvailabilityTime.availableTo = new Date(null, null, null, availableTo);
    } else {
      sessionDay.AvailabilityTime.availableFrom = new Date(null, null, null, 0);
      sessionDay.AvailabilityTime.availableTo = new Date(null, null , null, 24);
    }

    this.currentSlide += 1;
    this.availabilityServcie.initAvailability(sessionDay, this.sessionId).then((requestResponse) => {
      this.requestResponseHandler(requestResponse);
    });
  }

  noAvailableSubmit() {
    const sessionDay = new SessionDay({
      available: false,
      timeStamp: this.tileDate,
      unavailabilityReason: this.availabilityForm.controls.unavailabilityReason.value
    });

    this.currentSlide += 1;
    this.availabilityServcie.initAvailability(sessionDay, this.sessionId).then((requsestResponse) => {
      this.requestResponseHandler(requsestResponse);
    });
  }
}
