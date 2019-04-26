import { SessionDayParameters } from 'src/app/entities/entitiesParameterInterfaces/session-day-parameters';
import { SessionDayAvailability } from 'src/app/entities/session-day-availability';

export class SessionDay {
    timeStamp: Date;
    available: boolean;
    AvailabilityTime?: SessionDayAvailability;
    unavailabilityReason?: string;

    constructor(sessionDayParameters: SessionDayParameters) {
        this.timeStamp = sessionDayParameters.timeStamp;
        this.available = sessionDayParameters.available;
        this.AvailabilityTime = sessionDayParameters.AvailabilityTime;
        this.unavailabilityReason = sessionDayParameters.unavailabilityReason;
    }
}