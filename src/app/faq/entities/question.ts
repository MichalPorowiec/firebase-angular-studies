import { QuestionParameters } from './entities-parameters/question-parameters';

export class Question {
    question: string;
    answer: string;

    constructor(params: QuestionParameters) {
        this.question = params.question;
        this.answer = params.answer;
    }
}