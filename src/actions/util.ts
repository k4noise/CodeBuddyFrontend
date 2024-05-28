import { ProfileType } from '../types';
import defaultStudentAvatarImage from '../assets/avatar1.png';
import defaultMentorAvatarImage from '../assets/mentor.png';

/**
 * Get user avatar
 * If avatar exists, returns avatar
 * @param {string | null | undefined} avatar
 * @param {ProfileType} type student or mentor
 * @returns {string} avatar url
 */
export const getAvatar = (
  avatar: string | null | undefined,
  type: ProfileType
): string => {
  const isStudent = type == ProfileType.STUDENT;
  if (avatar && avatar !== null && avatar !== 'null') return avatar;

  return isStudent ? defaultStudentAvatarImage : defaultMentorAvatarImage;
};
