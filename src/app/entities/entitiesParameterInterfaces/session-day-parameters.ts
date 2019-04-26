import { SessionDayAvailability } from '../session-day-availability';

export interface SessionDayParameters {
    timeStamp: Date;
    available: boolean;
    AvailabilityTime?: SessionDayAvailability;
    unavailabilityReason?: string;
}