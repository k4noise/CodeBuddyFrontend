import './Question.css';
import CommentIcon from '../../assets/comment.svg';
import LikeIcon from '../../assets/like.svg';
import TextArea from '../TextArea/TextArea';

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
 * @param {QuestionComment} props question data (look interface)
 * @returns {JSX.Element}
 */
interface QuestionComment {
  /** commentator avatar **/
  avatar: string;
  /** commentator name **/
  username: string;
  /** comment date (default dd.mm.yy) **/
  date: string;
  /** comment text **/
  comment: string;
  /** flag for correct comment show **/
  isMine?: boolean;
}

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
  comments: QuestionComment[];
  /** question images [not required] **/
  images?: string[];
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
      <div className="question__images">
        {props?.images?.map((image) => (
          <img src={image} alt="bug" key={image} className="question__image" />
        ))}
      </div>
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
      <div className="question__comments">
        {props.comments.map((comment) => (
          <div
            className={`question__comments-comment${
              comment.isMine ? ' question__comments-mine' : ''
            }`}
            key={`${comment.username}${comment.comment}`}
          >
            <div className={'question__comments-user'}>
              {comment.isMine && (
                <button className="question__comments-delete"></button>
              )}
              <img
                src={comment.avatar}
                alt={`${comment.username} avatar`}
                className="question__comments-user-avatar"
              />
              <span className="question__comments-user-name">
                {comment.username}
              </span>
              <span className="question__comments-user-date">
                {comment.date}
              </span>
            </div>
            <p className="question__comments-text">{comment.comment}</p>
          </div>
        ))}
      </div>
      <button className="question__comments-show">
        Показать следующие пять
      </button>
      <form className="question__comments-form">
        <div className="question__comments-form-user">
          <img
            src={props.comments[1].avatar}
            alt="avatar"
            className="question__comments-form-avatar"
          />
          <span className="question__comments-form-name">
            {props.comments[1].username}
          </span>
        </div>
        <TextArea
          placeholder="Напишите комментарий"
          className="question__comments-form-comment"
        />
      </form>
    </div>
  );
};

export default Question;
export type { QuestionProps };
