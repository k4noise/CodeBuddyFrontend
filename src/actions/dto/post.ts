export interface Post {
  id?: number;
  description: string;
  countOfLikes: number;
  localDateTime: Date;
  comments: Comment[];
  studentId: number;
  urlPhoto: string[];
}

export interface Comment {
  content: string;
  date: Date;
  photoUrl: string;
  student: number;
  mentor: number;
}
