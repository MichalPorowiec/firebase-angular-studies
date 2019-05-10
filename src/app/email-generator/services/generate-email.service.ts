import { Injectable } from '@angular/core';
import { ProfessorEmail } from '../entities/professor-email';
import { FirestoreService } from 'src/app/firebase/db/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateEmailService {

  constructor(private db: FirestoreService) { }

  generateEmail(professorName: string, professorLastName: string): Promise<ProfessorEmail> {
    return new Promise((resolve, reject) => {
      this._getSpecialEmail(professorName, professorLastName).then((response) => {
        response ? resolve(response) : resolve(this._generateStandardEmail(professorName, professorLastName))
      });
    });
  }

  private _getSpecialEmail(professorName: string, professorLastName: string): Promise<ProfessorEmail> {
    return new Promise((resolve, reject) => {
      professorName = professorName.toLowerCase();
      professorLastName = professorName.toLowerCase();

      this.db.getSpecialEmails().then((emails: ProfessorEmail[]) => {
        const email = emails.find((el: ProfessorEmail) => {
          return `${el.name.toLowerCase()} ${el.lastName.toLowerCase()}` === `${ProfessorEmail} ${professorLastName}`
        })

        email ? resolve(email) : reject(false);
      });
    });
  }

  private _generateStandardEmail(professorName: string, professorLastName: string): ProfessorEmail {
    const email = `${professorName.toLowerCase()}.${professorLastName.toLocaleLowerCase()}@polsl.pl`;
    const profEmail = new ProfessorEmail({
      name: (professorName),
      lastName: (professorLastName),
      email: email
    });

    return profEmail;
  }
}
