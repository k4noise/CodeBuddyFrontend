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
  fromRequest: boolean,
  profileType: ProfileType,
  id: number
) => {
  if (isMine) {
    return await getUserData(profileType);
  }

  if (fromRequest) {
    const url =
      profileType == ProfileType.STUDENT
        ? `${import.meta.env.VITE_API_BASE_URL}/mentors/students/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/students/mentors/${id}`;
    return await sendRequest<UserData>(url, AxiosMethod.GET, true);
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
  avatarFile: File
) => {
  const formData = new FormData();
  formData.append('image', avatarFile, 'image.jpg');
  const profileUpdateUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/accounts/photo`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/accounts/photo`;
  await sendRequest<void>(profileUpdateUrl, AxiosMethod.PUT, true, formData);

  const response = await getProfileData(true, false, profileType, 0);
  if (response.data)
    sessionStorage.setItem('avatarUrl', response.data.photoUrl);
  return response.data?.photoUrl;
};

export const addTagsToMentor = async (oldTags: string[], tags: string[]) => {
  const addTagsToMentorUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/mentors/accounts/keywords?keyword=`;
  for (let tag of tags) {
    await addTag(tag);
  }
  const allTags = [...oldTags, ...tags];

  return await sendRequest<void>(
    addTagsToMentorUrl + allTags,
    AxiosMethod.PUT,
    true
  );
};

const addTag = async (tag: string) => {
  const addTagUrl = `${import.meta.env.VITE_API_BASE_URL}/keywords`;
  return await sendRequest<void>(addTagUrl, AxiosMethod.POST, true, {
    keyword: tag,
  });
};
