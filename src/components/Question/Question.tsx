import './Question.css';
import CommentIcon from '../../assets/comment.svg';
import LikeIcon from '../../assets/like.svg';
import Comments, { CommentData } from './Comments';
import ImageGallery from '../../pages/Home/ImageGallery/ImageGallery';

/**
 * Question component
 * Shows question block with comments
 * @component
 * @example
 * ```
 * <Question
 *  avatar: 'user-avatar.jpg',
 *   authorName: 'John Doe',
 *   question: 'Sample question',
 *   images: ['image1.jpg', 'image2.jpg'],
 *   likes: 5,
 *   comments: [
 *     { avatar: 'avatar1.jpg', username: 'Alice', date: '2024-04-13', comment: 'Comment 1' },
 *     { avatar: 'avatar2.jpg', username: 'Bob', date: '2024-04-14', comment: 'Comment 2' }
 *  ]
 * ```
 * @param {QuestionProps} props question data (look interface)
 * @returns {JSX.Element}
 */

interface QuestionProps {
  /** question author avatar **/
  avatar: string;
  /** question author name **/
  authorName: string;
  /** question text **/
  question: string;
  /** question author avatar **/
  likes: number;
  /** question comments */
  comments: CommentData[];
  /** question images, put empty if no images **/
  images: string[];
}

const Question = (props: QuestionProps) => {
  return (
    <div className="question" data-testid="question">
      <div className="question__author">
        <img
          src={props.avatar}
          alt={`${props.authorName} avatar`}
          className="question__author-avatar"
        />
        <span className="question__author-name">{props.authorName}</span>
      </div>
      <p className="question__text">{props.question}</p>
      <ImageGallery images={props.images} editMode={false} />
      <div className="question__reactions">
        <span className="question__reactions-comments question__reactions-active">
          <img src={CommentIcon} alt="comments count" />
          {props.comments.length}
        </span>
        <span className="question__reactions-likes">
          <img src={LikeIcon} alt="likes count" />
          {props.likes}
        </span>
      </div>
      <Comments comments={props.comments} />
    </div>
  );
};

export default Question;
export type { QuestionProps };
