import { ExaminSessionParameters } from './entitiesParameterInterfaces/examin-session-parameters';

export class ExaminSession implements ExaminSessionParameters {
    sessionName: string;
    isActive: boolean;
    sessionIndex: number;
    sessionStart: Date;
    sessionEnd: Date;

    constructor(parameters: ExaminSessionParameters) {
        this.sessionEnd = parameters.sessionEnd,
        this.sessionStart = parameters.sessionStart,
        this.sessionIndex = parameters.sessionIndex,
        this.sessionName = parameters.sessionName,
        this.isActive = parameters.isActive;
    }
}
