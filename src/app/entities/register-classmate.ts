import { Classmate } from './classmate';

import { RegisterClassmateParameters } from './entitiesParameterInterfaces/register-classmate-parameters';

export class RegisterClassmate extends Classmate {
    public userEmail : string;
    public userPassword : string;

    constructor(registerClassmateParameters: RegisterClassmateParameters) {
        super({name: registerClassmateParameters.name, lastName: registerClassmateParameters.lastName, Sessions: registerClassmateParameters.Sessions})

        this.userEmail = registerClassmateParameters.userEmail;
        this.userPassword = registerClassmateParameters.userPassword;
    }
}