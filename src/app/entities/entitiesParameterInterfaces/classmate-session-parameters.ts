import { SessionDay } from '../session-day';

export interface ClassmateSessionParameters {
    didPass: boolean;
    sessionRef: string;
    availability: SessionDay[];
}