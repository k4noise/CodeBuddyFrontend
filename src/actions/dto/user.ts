/**
 * Represents create new user data.
 * @interface CreateUser
 * @property {string} firstName user name
 * @property {string} lastName user surname
 * @property {string} email user email
 * @property {string} password user password
 * @property {string} repeatPassword user password repeat
 */
export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

/**
 * Represents user data.
 * @interface UserData
 * @property {string} firstName user name
 * @property {string} lastName user surname
 * @property {string} email user email
 * @property {string} description text about user
 * @property {string} photoUrl avatar url
 * @property {string} [telegram] telegram nickname with @
 * @property {string[]} [keywords] if user - mentor, contains keywords about self experience
 */
export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  description: string;
  photoUrl: string;
  telegram?: string;
  keywords?: string[];
}

/**
 * Represents login user data.
 * @interface LoginUser
 * @property {string} login user email
 * @property {string} password user password
 */
export interface LoginUser {
  login: string;
  password: string;
}

/**
 * Represents mentor data.
 * @interface MentorData
 * @property {number} id mentor identificator
 * @property {string} firstName mentor name
 * @property {string} lastName mentor surname
 * @property {string} description mentor about data
 * @property {string} photoUrl mentor avatar url
 * @property {string[]} keywords keywords about self experience
 */
export interface MentorData {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  photoUrl: string;
  keywords: string[];
}

/**
 * Represents update user settings data.
 * @interface UpdateSettingsData
 * @property {string} [telegram] telegram nickname with @
 * @property {string} [description] about info
 * @property {string[]} keywords only from mentor: keywords about self experience
 */
export interface UpdateSettingsData {
  telegram?: string;
  description?: string;
  keywords: string[];
}

/**
 * Represents update user security data.
 * @interface UpdateSecurityData
 * @property {string} [email] new user email
 * @property {string} [password] current user password
 * @property {string} [newPassword] new user password
 */
export interface UpdateSecurityData {
  email?: string;
  password?: string;
  newPassword?: string;
}
