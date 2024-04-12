import './Question.css';
import CommentIcon from '../../assets/comment.svg';
import LikeIcon from '../../assets/like.svg';

interface QuestionComment {
  avatar: string;
  username: string;
  date: string;
  comment: string;
  isMine?: boolean;
}

interface QuestionProps {
  avatar: string;
  authorName: string;
  question: string;
  images: string[];
  likes: number;
  comments: QuestionComment[];
}

const Question = (props: QuestionProps) => {
  return (
    <div className="question">
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
        {props.images.map((image) => (
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
        <textarea
          rows={1}
          placeholder="Напишите комментарий"
          className="question__comments-form-comment"
        ></textarea>
      </form>
    </div>
  );
};

export default Question;
export type { QuestionProps };
