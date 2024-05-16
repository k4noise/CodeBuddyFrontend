import { ProfileType } from '../types';
import { CreateUser, LoginUser, UserData } from './dto/user';
import axios from 'axios';

/**
 * Register user to server
 * If success, login user
 * @param {CreateUser} userDto user data, look at interface
 * @param {ProfileType} profileType mentor or student
 * @returns {void}
 */
export const registerUser = async (
  userDto: CreateUser,
  profileType: ProfileType
) => {
  const REGISTER_URL =
    profileType === ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors`;
  try {
    await axios.post(REGISTER_URL, userDto, { withCredentials: true });
    await loginUser(
      { login: userDto.email, password: userDto.password },
      profileType
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Login user to server
 * If success, save user data to sessionStorage and receive JSESSIONID cookie from server
 * @param {LoginUser} loginDto login and password
 * @param {ProfileType} profileType mentor or student
 * @returns {void}
 */
export const loginUser = async (
  loginDto: LoginUser,
  profileType: ProfileType
) => {
  const userCredintals = `username=${loginDto.login}&password=${loginDto.password}`;
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login`,
      userCredintals,
      { withCredentials: true }
    );
    const { data: userData } = await getUserData(profileType);

    if (typeof userData === 'string')
      throw new Error('Неверный логин или пароль');

    saveUserData(userData, profileType);
  } catch (error) {
    if (error.name === 'AxiosError') {
      throw new Error('Неверный тип профиля');
    }
    console.error(error);
    throw error;
  }
};

/**
 * Logout user
 * Remove all user data from sessionStorage and remove cookie
 * @returns {void}
 */
export const logoutUser = async (): Promise<void> => {
  await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`);
  deleteUserData();
};
/**
 * Get user data from server
 * @param {ProfileType} profileType mentor or student
 * @returns {Promise<AxiosResponse>} data type - UserData
 */

export const getUserData = async (profileType: ProfileType) => {
  const PROFILE_URL =
    profileType === ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts`;
  return await axios.get(PROFILE_URL, { withCredentials: true });
};

/**
 * Save data to sessionStorage
 * @param {UserData} data data to save
 * @param {ProfileType} profileType mentor or student
 * @returns {void}
 */
const saveUserData = (data: UserData, profileType: ProfileType) => {
  sessionStorage.setItem('profileType', profileType);
  sessionStorage.setItem('firstName', data.firstName);
  sessionStorage.setItem('lastName', data.lastName);
  sessionStorage.setItem('avatarUrl', data.photoUrl);
};

/**
 * Remove data from sessionStorage
 * @returns {void}
 */
const deleteUserData = () => {
  sessionStorage.removeItem('profileType');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('avatarUrl');
};
