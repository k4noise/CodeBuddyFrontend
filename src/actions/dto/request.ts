import { RequestType } from '../../types';

export interface Request {
  id: number;
  requestState: RequestType;
  mentorId: number;
  studentId: number;
  description: string;
}
