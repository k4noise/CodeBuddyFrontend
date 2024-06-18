/**
 * Represents a post data.
 * @interface Post
 * @property {number} [id] unique identifier of the post.
 * @property {string} description post description.
 * @property {number} countOfLikes number of post likes.
 * @property {Date} localDateTime date&time when post has been created.
 * @property {Comment[]} comments post comments.
 * @property {number} studentId post author id
 * @property {string[]} urlPhoto post photo urls [max 3]
 */
export interface Post {
  id?: number;
  description: string;
  countOfLikes: number;
  localDateTime: Date;
  comments: Comment[];
  studentId: number;
  urlPhoto: string[];
}

/**
 * Represents a comment data.
 * @interface Comment
 * @property {string} content comment text
 * @property {Date} date date&time when comment has been created
 * @property {string} photoUrl author avatar url
 * @property {number} student if present, author - student and given student id
 * @property {number} mentor if present, author - mentor and given mentor id
 */
export interface Comment {
  content: string;
  date: Date;
  photoUrl: string;
  student: number;
  mentor: number;
}
