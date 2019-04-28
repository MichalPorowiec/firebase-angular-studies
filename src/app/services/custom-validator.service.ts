import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

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
}
