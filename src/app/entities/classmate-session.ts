import { ClassmateSessionParameters } from './entitiesParameterInterfaces/classmate-session-parameters';
import { SessionDay } from './session-day';

export class ClassmateSession {
    didPass: boolean;
    sessionRef: string;
    availability: SessionDay[];

    constructor(classmateSessionParameters: ClassmateSessionParameters) {
        this.didPass = classmateSessionParameters.didPass;
        this.sessionRef = classmateSessionParameters.sessionRef;
        this.availability = classmateSessionParameters.availability;
    }
}