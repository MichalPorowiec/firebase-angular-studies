import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  makeArrayBetweenDates(initDate: Date, finishDate: Date): Date[] {
    const dateArray: Date[] = [];

    initDate = new Date(initDate.getFullYear(), initDate.getMonth(), initDate.getDate());
    finishDate = new Date(finishDate.getFullYear(), finishDate.getMonth(), finishDate.getDate());

    const initialDateTime = initDate.getTime();
    const finishDateTime = finishDate.getTime();

    for (let manipulationTime = initialDateTime; manipulationTime <= initialDateTime; manipulationTime += 86400000) {
      dateArray.push(new Date(manipulationTime))
    }

    return dateArray;
  }
}
