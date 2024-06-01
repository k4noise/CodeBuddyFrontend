import { RequestState } from '../../types';

export interface Request {
  id: number;
  requestState: RequestState;
  mentorId: number;
  studentId: number;
  description: string;
}
