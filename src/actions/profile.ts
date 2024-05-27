import { ProfileType } from '../types';
import { getUserData } from './auth';
import { UpdateSecurityData, UpdateSettingsData, UserData } from './dto/user';
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

export const updateProfile = async (
  profileType: ProfileType,
  updateData: UpdateSettingsData
) => {
  const profileUpdateUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts/settings`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts/settings`;

  return await sendRequest<void>(
    profileUpdateUrl,
    AxiosMethod.PUT,
    true,
    updateData
  );
};

export const updateSecurity = async (
  profileType: ProfileType,
  updateData: UpdateSecurityData
) => {
  const profileUpdateUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts/security`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts/security`;
  return await sendRequest<void>(
    profileUpdateUrl,
    AxiosMethod.PUT,
    true,
    updateData
  );
};

export const updateAvatar = async (
  profileType: ProfileType,
  avatarBlob: string
) => {
  const blob = base64ToBlob(avatarBlob);
  const formData = new FormData();
  formData.append('image', blob, 'image.jpg');
  const profileUpdateUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts/photo`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts/photo`;
  sessionStorage.setItem('avatarUrl', avatarBlob);
  return await sendRequest<void>(
    profileUpdateUrl,
    AxiosMethod.PUT,
    true,
    formData
  );
};

// todo тэги
// const addTag = async (tag: string) => {
//   const addTagUrl = `${import.meta.env.VITE_API_BASE_URL}/keywords`;
//   return await sendRequest<void>(addTagUrl, AxiosMethod.POST, true);
// };

const base64ToBlob = (base64String: string): Blob => {
  const base64 = base64String.split(',')[1];
  const arrayBuffer = new ArrayBuffer(base64.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < base64.length; i++) {
    uint8Array[i] = base64.charCodeAt(i);
  }

  return new Blob([uint8Array]);
};
