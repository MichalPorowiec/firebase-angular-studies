import { SessionDay } from 'src/app/entities/session-day';
import { Classmate } from 'src/app/entities/classmate';

export interface AvailabilityInterface {
    updateAvailability(sessionDay: SessionDay, sessionId: string, dayId: string): Promise<boolean>;
    initAvailability(sessionDay: SessionDay, sessionId: string): Promise<boolean>;
    getAvailability(sessionId: string): Promise<SessionDay[]>
}
