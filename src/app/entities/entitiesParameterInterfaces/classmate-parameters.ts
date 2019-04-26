import { ClassmateSession } from 'src/app/entities/classmate-session';

export interface ClassmateParameters {
    name:string;
    lastName:string;
    Sessions?:ClassmateSession[];
    id? :string;
}