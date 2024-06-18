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

/**
 * Extracts the date portion of a date string and formats it as DD.MM.YYYY
 * @param {string} date - The date string to extract the date from
 * @returns {string} - The extracted date in DD.MM.YYYY format
 */
export const extractDate = (date: string) => {
  return date.slice(0, 10).split('-').reverse().join('.');
};
