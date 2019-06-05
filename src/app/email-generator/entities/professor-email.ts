import { ProfessorEmailParameters } from './parameters/professor-email-parameters';

export class ProfessorEmail {
    pName: string;
    lastName: string;
    email: string;

    constructor(private professorsEmailParameters: ProfessorEmailParameters) {
        this.pName = professorsEmailParameters.pName;
        this.lastName = professorsEmailParameters.lastName;
        this.email = professorsEmailParameters.email;
    }
}
