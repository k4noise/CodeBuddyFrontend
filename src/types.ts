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
