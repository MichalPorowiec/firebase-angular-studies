import { ClassmateParameters } from './classmate-parameters';

export interface RegisterClassmateParameters extends ClassmateParameters {
    userEmail : string;
    userPassword : string;
}