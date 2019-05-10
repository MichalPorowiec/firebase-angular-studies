import { Injectable } from '@angular/core';
import { DbCommunication } from '../../interfaces/dbCommunication';
import { AngularFirestore } from '@angular/fire/firestore';
import { Classmate } from '../../entities/classmate';
import { Observable } from 'rxjs';
import { SessionDay } from '../../entities/session-day';
import { RegisterClassmate } from '../../entities/register-classmate';
import { UserService } from 'src/app/services/user.service';
import { ExaminSession } from 'src/app/entities/examin-session';
import { ExaminSessionDTO } from './dtos/examin-session-dto';
import { ProfessorEmail } from 'src/app/email-generator/entities/professor-email';
import { ProfessorEmailParameters } from 'src/app/email-generator/entities/parameters/professor-email-parameters';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements DbCommunication {
  constructor(private firestore: AngularFirestore, private userService: UserService) {

   }

  getUser(userId: string): Promise<Classmate> {
    const user = new Classmate({
      name: '',
      id: userId,
      lastName: '',
      Sessions: []
    });

    return new Promise((resolve, reject) => {
      this.firestore.collection('Classmates').doc('userId')
      .valueChanges()
      .subscribe((el: Classmate) => {
        if (!el) {
          reject('Sorry we were not able to get user information.')
        }
        user.name = el.name;
        user.lastName = el.lastName;
        user.Sessions = el.Sessions;
        resolve(user);
      });
    });
  }

  initUserInDb(userInfo: RegisterClassmate) {
    this.firestore.collection('Classmates').doc(userInfo.id).set({
      name: userInfo.name,
      lastName: userInfo.lastName,
      Sessions: []
    });
  }

  // User Session Operations
  editUserAvailability(dayToChange: SessionDay, sessionId: string, dayId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('Classmates').doc(this.userService.user.id)
      .collection('Sessions').doc(sessionId)
      .collection('SessionDays').doc(dayId)
      .update({...dayToChange})
      .then(() => resolve(true))
      .catch(() => reject(false));
    });
  }

  initUserAvailability(dayToChange: SessionDay, sessionId: string): Promise<boolean>{
    const decomposedDay = {
      available: dayToChange.available,
      timeStamp: dayToChange.timeStamp
    }

    Object.assign(decomposedDay,
       dayToChange.AvailabilityTime !== undefined ? { AvailabilityTime: {...dayToChange.AvailabilityTime} } : null,
       dayToChange.unavailabilityReason ? { unavailabilityReason: dayToChange.unavailabilityReason } : null
    );

    return new Promise((resolve, reject) => {
      this.firestore
      .collection('Classmates').doc(this.userService.user.id)
      .collection('Sessions').doc(sessionId)
      .collection('SessionDays')
      .doc(`${decomposedDay.timeStamp.getDate()}.${decomposedDay.timeStamp.getMonth()}`)
      .set(decomposedDay)
      .then((el) => resolve(true))
      .catch(() => reject(false));
    });
  }

  initUserSession(sessionDates: Date[], sessionId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const sessionDays: SessionDay[] = [];

      sessionDates.forEach((day: Date) => {
        const sessionDay = new SessionDay({
          available: false,
          timeStamp: day
        });
        
        if (sessionDay.timeStamp.getTime() > 0) {
          sessionDays.push(sessionDay);
        }
      })
      console.log(sessionDays);
      if (sessionDays.length == sessionDates.length) {
        sessionDays.forEach((sessionDay: SessionDay) => {
          this.initUserAvailability(sessionDay, sessionId)
        })
      }
    })
  }

  getAvailability(sessionId: string): Promise<SessionDay[]> {
    return new Promise((resolve, reject) => {
      this.firestore
      .collection('Classmates').doc(this.userService.user.id)
      .collection('Sessions').doc(sessionId)
      .collection('SessionDays')
      .valueChanges().subscribe((values: SessionDay[]) => {
        (values);
        if (!values) {
          reject('could not resolve values');
        }
        resolve(this._mapDayToClass(values));
      });
    });
  }

  getSessions(): Promise<ExaminSession[]>{
    return new Promise((resolve, reject) => {
      this.firestore.collection('Sessions').valueChanges().subscribe(dbData => {
        if (!dbData) {
          reject('no sessions available');
        }

        const dtoMapping = dbData.map((session: ExaminSessionDTO) => {
          return new ExaminSession({
            sessionName: session.sessionName,
            isActive: session.activeSession,
            sessionIndex: session.sessionIndex,
            sessionEnd: session.sessionEnd.toDate(),
            sessionStart: session.sessionStart.toDate()
          });
        });

        resolve(dtoMapping);
      });
    });
  }

  _mapDayToClass(objectsFromDb: any[]): SessionDay[] {
    return objectsFromDb.map(element => {
      const day = new SessionDay({
        timeStamp: element.timeStamp.toDate(),
        available: element.available
    });

      if (element.AvailabilityTime) {
        day.AvailabilityTime = {
          availableFrom: element.AvailabilityTime.availableFrom.toDate(),
          availableTo: element.AvailabilityTime.availableTo.toDate()
        };
      }

      if (element.unavailabilityReason) {
        day.unavailabilityReason = element.unavailabilityReason;
      }

      return day;
    });
  }

  getSpecialEmails(): Promise<ProfessorEmail[]> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('SpecialProfessorEmail').valueChanges().subscribe((emailList: ProfessorEmailParameters[]) => {
        const mails = emailList.map((email: ProfessorEmailParameters) => {
          return new ProfessorEmail({...email});
        });
      });
    });
  }

  getAllProfessors(): Promise<ProfessorEmail> {
    return new Promise((resolve, reject) => {
      this.firestore.collection('ProfessorsList').valueChanges().subscribe((response: ProfessorEmailParameters[]) => {
        response.map(el => {
          return new ProfessorEmail({...el});
        });
      });
    });
  }
}
  