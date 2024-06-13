import TextArea from '../TextArea/TextArea';
import { useEffect, useId, useState } from 'react';
import defaultAvatarImage from '../../assets/avatar1.png';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { commentPost } from '../../actions/post';
import { extractDate, getAvatar } from '../../actions/util';
import { ProfileType } from '../../types';
import { UserData } from '../../actions/dto/user';
import { getProfileData } from '../../actions/profile';
import { Comment as CommentType } from '../../actions/dto/post';
import { toast } from 'react-toastify';

interface CommentData {
  /** commentator avatar **/
  photoUrl: string;
  /** comment date (default dd.mm.yy) **/
  date: string;
  /** comment text **/
  content: string;
  /** flag for correct comment show **/
  isMine?: boolean;
  mentor: number;
  student: number;
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
const Comment = ({
  photoUrl,
  date,
  content,
  isMine,
  mentor,
  student,
}: CommentData): JSX.Element => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const getUserData = async () => {
    const { data } = await getProfileData(
      false,
      false,
      student ? ProfileType.STUDENT : ProfileType.MENTOR,
      student ?? mentor
    );
    setUserData(data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div
      className={`question__comments-comment${
        isMine ? ' question__comments-mine' : ''
      }`}
      data-testid="comment"
    >
      <div className="question__comments-user">
        {isMine && <button className="question__comments-delete" />}
        <img
          src={getAvatar(
            userData?.photoUrl,
            mentor ? ProfileType.MENTOR : ProfileType.STUDENT
          )}
          alt={`${student} avatar`}
          className="question__comments-user-avatar"
        />
        <span className="question__comments-user-name">{`${
          userData?.firstName ?? ''
        } ${userData?.lastName ?? ''}`}</span>
        <span className="question__comments-user-date">
          {extractDate(date)}
        </span>
      </div>
      <p className="question__comments-text">{content}</p>
    </div>
  );
};

interface CommentsProps {
  comments: CommentType[];
  loadComments: (all?: boolean) => CommentType[];
  addComment: (comment: string) => void;
  moreComments: boolean;
}

/**
 * Comments component
 * Shows group of comments with form to comment
 * @param {CommentData[]} comments comments data, look at interface
 * @returns {JSX.Element} Comments component
 */
const Comments = ({
  comments,
  addComment,
  loadComments,
  moreComments,
}: CommentsProps) => {
  let userAvatar = Cookies.get('avatarUrl');
  const idPrefix = useId();
  const { handleSubmit, register, reset } = useForm();
  const profileType: ProfileType = Cookies.get('profileType');
  return (
    <>
      <div className="question__comments" data-testid="comments">
        {comments?.map((comment, index) => (
          <Comment {...comment} key={`${idPrefix}-${index}`} />
        ))}
      </div>
      {moreComments && (
        <button
          type="button"
          className="question__comments-show"
          onClick={loadComments}
        >
          Показать следующие пять
        </button>
      )}
      <form
        className="question__comments-form"
        data-testid="sendComment"
        onSubmit={handleSubmit(async (d) => {
          if (d.comment.length === 0)
            toast('Комментарий не может быть пустым', { type: 'error' });
          else {
            addComment(d.comment);
            reset();
          }
        })}
      >
        <div className="question__comments-form-user">
          <img
            src={getAvatar(userAvatar, profileType)}
            alt="avatar"
            className="question__comments-form-avatar"
          />
          <span className="question__comments-form-name">
            {Cookies.get('firstName')
              ? `${Cookies.get('firstName')} ${Cookies.get('lastName')}`
              : 'Иван Иванов'}
          </span>
        </div>
        <TextArea
          placeholder="Напишите комментарий"
          className="question__comments-form-comment"
          validationOptions={register('comment')}
        />
        <button className="question__comments-send">Отправить</button>
      </form>
    </>
  );
};

export default Comments;
export type { CommentData };
export { Comment };
