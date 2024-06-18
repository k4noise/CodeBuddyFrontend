export enum ProfileType {
  STUDENT = 'Студент',
  MENTOR = 'Ментор',
}

export interface User {
  type: ProfileType;
  login: string;
  username: string;
  avatar: string;
  email: string;
  tgId: string;
  bio?: string;
}

export interface Student extends User {}

export interface Mentor extends User {
  tags: string[];
}

export enum StudentRequestState {
  SEND = 'Ваш запрос отправлен',
  ACCEPTED = 'Ваш запрос принят',
  REJECTED = 'Ваш запрос отклонен',
}

export enum MentorRequestState {
  SEND = 'Новый запрос',
  ACCEPTED = 'Вы приняли запрос',
  REJECTED = 'Вы отклонили запрос',
}
export type RequestState = StudentRequestState | MentorRequestState;

export enum RequestPopupType {
  STUDENT_VIEW,
  MENTOR_VIEW,
  CREATE_VIEW,
  SHOW_VIEW,
}
