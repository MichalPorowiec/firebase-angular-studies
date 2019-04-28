import { Injectable } from '@angular/core';
import { ExaminSession } from '../entities/examin-session';
import { SessionDay } from '../entities/session-day';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  makeArrayBetweenDates(sessionToInit: ExaminSession): Date[] {
    const dateArray: Date[] = [];

    const initDate: Date = new Date(sessionToInit.sessionStart);
    const finishDate: Date = new Date(sessionToInit.sessionEnd);

    console.log(initDate);
    const transferDate: Date = new Date(initDate);

    while (transferDate <= finishDate) {
      dateArray.push(new Date(transferDate));

      transferDate.setDate(transferDate.getDate() + 1)
    }

    return dateArray;
  }

  sortSessionDays(dateArray: SessionDay[]): SessionDay[] {
    return dateArray.sort((firstDay: SessionDay, secondDay: SessionDay) => firstDay.timeStamp > secondDay.timeStamp ? 1 : -1);
  }
}
