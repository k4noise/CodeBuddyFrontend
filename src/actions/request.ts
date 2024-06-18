import { ProfileType } from '../types';
import { AxiosMethod, sendRequest } from './sendRequest';

/**
 * Send request to mentor
 * @param {number} id mentor id
 * @param {string} requestDto.description request text
 * @returns {Promise<{error: number, data: null}>}
 */
export const sendRequestToMentor = async (
  id: number,
  requestDto: { description: string }
) => {
  const sendRequestUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/students/requests/mentors/${id}`;
  return await sendRequest<void>(
    sendRequestUrl,
    AxiosMethod.POST,
    true,
    requestDto
  );
};

/**
 * Get requests for a user
 * @param {ProfileType} profileType student or mentor
 * @returns {Promise<{error: number, data: Request[]}>}
 */
export const getRequests = async (profileType: ProfileType) => {
  const getRequestsUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/requests`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/requests`;
  return await sendRequest<Request[]>(getRequestsUrl, AxiosMethod.GET, true);
};

/**
 * Respond to a request
 * @param {string} newState new request state: accepted|rejected
 * @param {number} id request id
 * @returns {Promise<{error: number, data: null}>}
 */
export const respondToRequest = async (newState: string, id: number) => {
  const respondToRequestUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/mentors/requests/${id}?request=${newState}`;
  return await sendRequest<void>(respondToRequestUrl, AxiosMethod.PUT, true);
};
