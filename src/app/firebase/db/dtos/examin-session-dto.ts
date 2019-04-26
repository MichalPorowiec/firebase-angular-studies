export interface ExaminSessionDTO {
    sessionIndex: number;
    sessionEnd: {toDate: () => Date};
    sessionStart: {toDate: () => Date};
    sessionName: string;
    activeSession: boolean;
}