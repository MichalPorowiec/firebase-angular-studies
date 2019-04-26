import { Observable } from 'rxjs';
import { Classmate } from '../entities/classmate';
import { SessionDay } from '../entities/session-day';

// For future in case if I would like to change monolit to Rest API 
export interface DbCommunication {
    getUser(UserId: string);

    editUserAvailability(dayToChange: SessionDay, sessionId: string, dayId: string);
    initUserAvailability(dayToChange: SessionDay, sessionId: string);
}