import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { faCheck, faTimes, faUndo } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class ViewTileCommunicationService {
  _currentSlide: number;
  _isRequestDone: boolean;
  _isAvailable: boolean;

  isRequestDone: Subject<boolean>;
  currentSlide: Subject<number>;
  isAvailable: Subject<boolean>;

  checkIcon; timesIcon; undoIcon;

  constructor() {
    this._currentSlide = 1;
    this._isRequestDone = false;
    this._isAvailable = false;

    this.isRequestDone = new Subject<boolean>();
    this.currentSlide = new Subject<number>();
    this.isAvailable = new Subject<boolean>();
    this.refreshValues({currentSlide: this._currentSlide, isAvailable: this._isAvailable, requestSuccess: this._isRequestDone});

    // init icons
    this.checkIcon = faCheck;
    this.timesIcon = faTimes;
    this.undoIcon = faUndo;
   }

  refreshValues(specifics:{currentSlide?: number, requestSuccess?: boolean, isAvailable?: boolean}) {
    if(specifics.currentSlide) {
      this._currentSlide = specifics.currentSlide;
    }
    if(specifics.requestSuccess) {
      this._isRequestDone = specifics.requestSuccess;
    }
    if(specifics.isAvailable) {
      this._isAvailable = specifics.isAvailable;
    }

    this._updateValues();
  }

  private _updateValues() {
    this.isRequestDone.next(this._isRequestDone);
    this.currentSlide.next(this._currentSlide);
    this.isAvailable.next(this._isAvailable);
  }
}
