export type DiaryData = {
    id:number;
    date:string;
    weather: string;
    visibility: string;
    comment:string;
}
export type NewDiary = Omit<DiaryData,'id'>;

export interface ValidationError {
    message:string;
    errors: Record<string, string[]>
}