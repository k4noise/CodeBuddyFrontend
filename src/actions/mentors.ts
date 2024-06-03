import { MentorData, UserData } from './dto/user';
import { AxiosMethod, sendRequest } from './sendRequest';

export const getMentors = async () => {
  const mentorsUrl = `${import.meta.env.VITE_API_BASE_URL}/mentors`;
  return await sendRequest<{
    keywords: string[];
    mentors: MentorData[];
  }>(mentorsUrl, AxiosMethod.GET, false);
};

export const getMentorsByTags = async (tags: string[]) => {
  const mentorsByTagsUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/mentors/keywords?keywordsId=`;
  return await sendRequest<{
    keywords: string[];
    mentors: MentorData[];
  }>(mentorsByTagsUrl + tags, AxiosMethod.GET, true);
};
