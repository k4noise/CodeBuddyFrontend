export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface LoginUser {
  login: string;
  password: string;
}
