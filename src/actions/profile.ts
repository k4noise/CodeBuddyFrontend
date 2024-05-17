import axios from 'axios';
import { ProfileType } from '../types';
import { getUserData } from './auth';
import { UserData } from './dto/user';

/**
 * Get profile data
 * Returns profile data if it allowed
 * @param {boolean} isMine flag is mine profile
 * @param {ProfileType} profileType mentor or student
 * @param {number} id profile id
 * @returns {Promise<UserData | string>}
 */
export const getProfileData = async (
  isMine: boolean,
  profileType: ProfileType,
  id: number
): Promise<UserData | string> => {
  if (isMine) {
    return await getUserData(profileType);
  }
  const PROFILE_URL =
    profileType === ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/${id}`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/${id}`;
  try {
    const { data } = await axios.get(PROFILE_URL, { withCredentials: true });
    console.log(data);
    if (typeof data === 'string') throw new Error('401');
    return data;
  } catch (error) {
    if (error?.request?.status === 302) {
      return JSON.parse(error.request.response);
    } else if (error?.message == 401 || error?.request?.status === 401) {
      throw new Error('401');
    } else if (error?.request?.status === 403) throw new Error('403');
    else if (error?.request?.status === 404) throw new Error('404');

    console.error(error);
    throw error;
  }
};
