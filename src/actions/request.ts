import { ProfileType, RequestState } from '../types';
import { AxiosMethod, sendRequest } from './sendRequest';

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

export const getRequests = async (profileType: ProfileType) => {
  const getRequestsUrl =
    profileType == ProfileType.STUDENT
      ? `${import.meta.env.VITE_API_BASE_URL}/students/requests`
      : `${import.meta.env.VITE_API_BASE_URL}/mentors/requests`;
  return await sendRequest<Request[]>(getRequestsUrl, AxiosMethod.GET, true);
};

export const respondToRequest = async (newState: string, id: number) => {
  const respondToRequestUrl = `${
    import.meta.env.VITE_API_BASE_URL
  }/mentors/requests/${id}?request=${newState}`;
  return await sendRequest<void>(respondToRequestUrl, AxiosMethod.PUT, true);
};
