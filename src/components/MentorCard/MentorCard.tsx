import React from 'react';
import Tags from '../Tags/Tags';
import TextArea from '../TextArea/TextArea';
import MentorDefaultAvatarImage from '../../assets/mentor.png';
import './MentorCard.css';

interface MentorCardProps {
  /* mentor name */
  firstName: string;
  /* mentor surname */
  lastName: string;
  /* mentor avatar url */
  photoUrl: string;
  /* mentor bio */
  description: string;
  /* mentor quick words */
  keywords: string[];
  mentorView: boolean;
  /* callback to call when modal closing */
  onClick: React.MouseEventHandler;
}

/**
 * Mentor card component
 * Shows card with mentor info
 * @component
 * @param {string} firstName mentor name
 * @param {string} lastName mentor surname
 * @param {string | null} photoUrl mentor avatar url
 * @param {string} description mentor bio
 * @param {string[]} keywords mentor quick words
 * @param {React.MouseEventHandler} onClick callback to call when modal closing
 * @returns {JSX.Element} Mentor card component
 */
const MentorCard = ({
  firstName,
  lastName,
  photoUrl,
  description,
  keywords: tags,
  mentorView,
  onClick,
}: MentorCardProps) => {
  const username = `${firstName} ${lastName}`;
  return (
    <div className="mentor-card" data-testid="mentorCard">
      <img
        src={photoUrl ?? MentorDefaultAvatarImage}
        alt={`${username} avatar`}
        className="mentor-card__avatar"
      />
      <div className="mentor-card__info">
        <p className="mentor-card__username">{username}</p>
        <span>О себе:</span>
        <TextArea
          className="profile__form-textarea mentor-card__about"
          placeholder=""
          readonly={true}
          value={description}
        />
      </div>
      {!mentorView && (
        <button className="mentor-card__submit" onClick={onClick}>
          Оставить заявку
        </button>
      )}
      <Tags className="mentor-card__tags" tags={tags} />
    </div>
  );
};

export default MentorCard;
