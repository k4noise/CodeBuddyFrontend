import { RequestState } from '../../types';

/**
 * Represents a request data.
 * @interface Request
 * @property {number} id unique identifier of the request.
 * @property {RequestState} requestState current state of the request, look at interface
 * @property {number} mentorId mentor id from request
 * @property {number} studentId student id from request
 * @property {string} description request text
 */
export interface Request {
  id: number;
  requestState: RequestState;
  mentorId: number;
  studentId: number;
  description: string;
}
