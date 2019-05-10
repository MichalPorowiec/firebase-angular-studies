import { ProfessorEmailParameters } from './parameters/professor-email-parameters';

export class ProfessorEmail {
    name: string;
    lastName: string;
    email: string;

    constructor(private professorsEmailParameters: ProfessorEmailParameters) {
        this.name = ProfessorEmailParameters.name;
        this.lastName = professorsEmailParameters.lastName;
        this.email = professorsEmailParameters.email;
    }
}
