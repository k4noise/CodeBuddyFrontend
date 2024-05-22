export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  telegram: string;
  description: string;
  photoUrl: string;
}

export interface LoginUser {
  login: string;
  password: string;
}

export interface MentorData {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  photoUrl: string;
  keywords: string[];
}
