import { ClassmateParameters } from 'src/app/entities/entitiesParameterInterfaces/classmate-parameters';
import { ClassmateSession } from './classmate-session';

export class Classmate {
    name:string;
    lastName:string;
    Sessions?:ClassmateSession[];
    id?:string;

    constructor(classmateParameters:ClassmateParameters) {
        this.name = classmateParameters.name;
        this.lastName = classmateParameters.lastName;
        if(classmateParameters.Sessions) {
            this.Sessions = classmateParameters.Sessions;
        }
        if(classmateParameters.id) {
            this.id = classmateParameters.id;
        }
    }
}