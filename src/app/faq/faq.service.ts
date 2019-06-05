import { Injectable } from '@angular/core';
import { Question } from './entities/question';
import { FirestoreService } from '../firebase/db/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private db:FirestoreService) { }

  getQuestions(): Promise<Question[]> {
    return this.db.getQuestions();
  }
}
