import './Question.css';
import CommentIcon from '../../assets/comment.svg';
import LikeIcon from '../../assets/like.svg';
import Comments, { CommentData } from './Comments';
import ImageGallery from '../../pages/Home/ImageGallery/ImageGallery';
import { Post } from '../../actions/dto/post';
import { useEffect, useState } from 'react';
import { UserData } from '../../actions/dto/user';
import { ProfileType } from '../../types';
import { getProfileData } from '../../actions/profile';
import { getAvatar } from '../../actions/util';
import { commentPost, getCommentsByPost } from '../../actions/post';

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
  id: number;
}

const Question = (props: Post) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsPageCount, setCommentsPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const getAuthorData = async () => {
    const { data } = await getProfileData(
      false,
      false,
      ProfileType.STUDENT,
      props.studentId
    );
    setUserData(data);
  };

  const getComments = async () => {
    const { data } = await getCommentsByPost(props.id);
    setComments(data?.content);
    setCommentCount(data.totalElements);
    setCommentsPageCount(data.totalPages);
  };

  const loadComments = async (all: boolean = false) => {
    if (all) {
      const comments: CommentData = [];
      for (let i = 0; i <= commentsPageCount; i++) {
        const { data } = await getCommentsByPost(props.id, i);
        comments.push(...data.content);
      }
      setComments(comments);
      setPage(commentsPageCount);
    } else {
      const { data } = await getCommentsByPost(props.id, page);
      setComments((prev) => [...prev, ...data.content]);
      if (data.totalPages) setPage((prev) => ++prev);
    }
  };

  const addComment = async (comment: string) => {
    await commentPost(props.id, comment);
    setCommentCount((prev) => ++prev);
    loadComments(true);
  };

  useEffect(() => {
    getAuthorData();
    getComments();
  }, [props.id]);

  return (
    <div className="question" data-testid="question">
      <div className="question__author">
        <img
          src={getAvatar(userData?.photoUrl, ProfileType.STUDENT)}
          alt={`${userData?.firstName} avatar`}
          className="question__author-avatar"
        />
        <span className="question__author-name">{`${
          userData?.firstName ?? ''
        } ${userData?.lastName ?? ''}`}</span>
      </div>
      <p className="question__text">{props.description}</p>
      <ImageGallery images={props.urlPhoto} editMode={false} />
      <div className="question__reactions">
        <span className="question__reactions-comments">
          <img src={CommentIcon} alt="comments count" />
          {commentCount}
        </span>
        <span className="question__reactions-likes">
          <img src={LikeIcon} alt="likes count" />
          {+props.countOfLikes}
        </span>
      </div>
      <Comments
        comments={comments}
        loadComments={loadComments}
        moreComments={page !== commentsPageCount && commentCount !== 0}
        addComment={addComment}
      />
    </div>
  );
};

export default Question;
export type { QuestionProps };
