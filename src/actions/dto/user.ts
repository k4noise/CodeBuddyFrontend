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
  description: string;
  photoUrl: string;
  telegram?: string;
  keywords?: string[];
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

export interface UpdateSettingsData {
  telegram?: string;
  description?: string;
  keywords: string[];
}

export interface UpdateSecurityData {
  email?: string;
  password?: string;
  newPassword?: string;
}
