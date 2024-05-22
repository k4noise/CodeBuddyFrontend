import axios from 'axios';
import { ProfileType } from '../types';
import { getUserData } from './auth';
import { UserData } from './dto/user';
import { AxiosMethod, sendRequest } from './sendRequest';

/**
 * Get profile data
 * Returns profile data if it allowed
 * @param {boolean} isMine flag is mine profile
 * @param {ProfileType} profileType mentor or student
 * @param {number} id profile id
 * @returns {ResponseData<UserData>}
 */
export const getProfileData = async (
  isMine: boolean,
  profileType: ProfileType,
  id: number
) => {
  if (isMine) {
    return await getUserData(profileType);
  }

  const profileUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/${id}`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/${id}`;

  return await sendRequest<UserData>(profileUrl, AxiosMethod.GET, true);
};
