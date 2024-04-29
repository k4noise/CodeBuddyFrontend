import TextArea from '../TextArea/TextArea';

interface CommentData {
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

/**
 * Comment component
 * Shows one comment
 * @component
 * @param {string} avatar
 * @param {string} username
 * @param {string} date
 * @param {string} comment
 * @param {boolean} isMine
 * @returns {JSX.Element} Comment component
 */
const Comment = ({ avatar, username, date, comment, isMine }: CommentData) => (
  <div
    className={`question__comments-comment${
      isMine ? ' question__comments-mine' : ''
    }`}
    data-testid="comment"
  >
    <div className="question__comments-user">
      {isMine && <button className="question__comments-delete" />}
      <img
        src={avatar}
        alt={`${username} avatar`}
        className="question__comments-user-avatar"
      />
      <span className="question__comments-user-name">{username}</span>
      <span className="question__comments-user-date">{date}</span>
    </div>
    <p className="question__comments-text">{comment}</p>
  </div>
);

/**
 * Comments component
 * Shows group of comments with form to comment
 * @param {CommentData[]} comments comments data, look at interface
 * @returns {React.FC} Comments component
 */
const Comments: React.FC<{ comments: CommentData[] }> = ({ comments }) => {
  return (
    <>
      <div className="question__comments" data-testid="comments">
        {comments.map((comment) => (
          <Comment {...comment} />
        ))}
      </div>
      <button className="question__comments-show">
        Показать следующие пять
      </button>
      <form className="question__comments-form" data-testid="sendComment">
        <div className="question__comments-form-user">
          <img
            src={comments[1].avatar}
            alt="avatar"
            className="question__comments-form-avatar"
          />
          <span className="question__comments-form-name">
            {comments[1].username}
          </span>
        </div>
        <TextArea
          placeholder="Напишите комментарий"
          className="question__comments-form-comment"
        />
      </form>
    </>
  );
};

export default Comments;
export type { CommentData };
export { Comment };