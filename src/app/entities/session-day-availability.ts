import { SessionDayAvailabilityParameters } from './entitiesParameterInterfaces/session-day-availability-parameters';

export class SessionDayAvailability {
    availableFrom: Date;
    availableTo: Date;

    constructor(sessionDayAvailabilityParameters: SessionDayAvailabilityParameters) {
        this.availableFrom = sessionDayAvailabilityParameters.availableFrom;
        this.availableTo = sessionDayAvailabilityParameters.availableTo;
    }
}