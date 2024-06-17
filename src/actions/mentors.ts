import { MentorData } from './dto/user';
import { AxiosMethod, sendRequest } from './sendRequest';

/**
 * Retrieves a list of mentors.
 * @async
 * @function getMentors
 * @returns {Promise<{ error: number | null | null | null | null | null, data: {keywords: string[]; mentors: MentorData[] }}>} - An object containing the keywords and an array of mentor data.
 */
export const getMentors = async () => {
  const mentorsUrl = `${import.meta.env.VITE_API_BASE_URL}/mentors`;
  return await sendRequest<{
    keywords: string[];
    mentors: MentorData[];
  }>(mentorsUrl, AxiosMethod.GET, false);
};

/**
 * Retrieves a list of mentors based on the provided tags.
 * @async
 * @function getMentorsByTags
 * @param {string[]} tags - An array of tags to filter the mentors.
 * @returns {Promise<{ error: number | null, data: {keywords: string[]; mentors: MentorData[] }}>} - An object containing the keywords and an array of mentor data.
 */
export const getMentorsByTags = async (tags: string[]) => {
  const mentorsByTagsUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/mentors/keywords?keywordsId=`;
  return await sendRequest<{
    keywords: string[];
    mentors: MentorData[];
  }>(mentorsByTagsUrl + tags, AxiosMethod.GET, true);
};
