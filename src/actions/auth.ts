import { ProfileType } from '../types';
import { CreateUser, LoginUser, UserData } from './dto/user';
import { AxiosMethod, sendRequest } from './sendRequest';

/**
 * Register user to server
 * If success, login user
 * @param {CreateUser} userDto user data, look at interface
 * @param {ProfileType} profileType mentor or student
 * @returns {ResponseData<UserData>}
 */
export const registerUser = async (
  userDto: CreateUser,
  profileType: ProfileType
) => {
  const registerUrl =
    profileType === ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors`;
  const { data, error } = await sendRequest<UserData>(
    registerUrl,
    AxiosMethod.POST,
    false,
    userDto
  );
  if (!error && data) {
    const request = await loginUser(
      { login: userDto.email, password: userDto.password },
      profileType
    );
    return request;
  }
  return { data, error };
};

/**
 * Login user to server
 * If success, save user data to sessionStorage and receive JSESSIONID cookie from server
 * @param {LoginUser} loginDto login and password
 * @param {ProfileType} profileType mentor or student
 * @returns {ResponseData<UserData>}
 */
export const loginUser = async (
  loginDto: LoginUser,
  profileType: ProfileType
) => {
  const loginUrl = `${import.meta.env.VITE_API_BASE_URL}/login`;
  const userCredintals = `username=${loginDto.login}&password=${loginDto.password}`;
  const loginResponse = await sendRequest<UserData>(
    loginUrl,
    AxiosMethod.POST,
    true,
    userCredintals
  );

  if (!loginResponse.error && loginResponse.data) {
    const profileResponse = await getUserData(profileType);
    if (!profileResponse.error)
      saveUserData(profileResponse.data as UserData, profileType);
    return profileResponse;
  }

  return loginResponse;
};

/**
 * Logout user
 * Remove all user data from sessionStorage and remove cookie
 * @returns {ResponseData<void>}
 */
export const logoutUser = async () => {
  const logoutUrl = `${import.meta.env.VITE_API_BASE_URL}/logout`;
  const { error } = await sendRequest<void>(logoutUrl, AxiosMethod.POST, false);
  if (!error) deleteUserData();
};
/**
 * Get user data from server
 * @param {ProfileType} profileType mentor or student
 * @returns {Promise<AxiosResponse>} data type - UserData
 */

export const getUserData = async (profileType: ProfileType) => {
  const profileUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts`;
  return await sendRequest<UserData>(profileUrl, AxiosMethod.GET, true);
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
