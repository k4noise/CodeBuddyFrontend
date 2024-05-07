import React from 'react';
import Tags from '../Tags/Tags';
import TextArea from '../TextArea/TextArea';
import './MentorCard.css';

interface MentorCardProps {
  /* mentor display name */
  username: string;
  /* mentor avatar url */
  avatarUrl: string;
  /* mentor bio */
  about: string;
  /* mentor quick words */
  tags: string[];
  /* callback to call when modal closing */
  onClick: React.MouseEventHandler;
}

/**
 * Mentor card component
 * Shows card with mentor info
 * @component
 * @param {string} username mentor display name
 * @param {string} avatarUrl mentor avatar url
 * @param {string} about mentor bio
 * @param {string[]} tags mentor quick words
 * @param {React.MouseEventHandler} onClick callback to call when modal closing
 * @returns {JSX.Element} Mentor card component
 */
const MentorCard = ({
  username,
  avatarUrl,
  about,
  tags,
  onClick,
}: MentorCardProps) => {
  return (
    <div className="mentor-card" data-testid="mentorCard">
      <img
        src={avatarUrl}
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
          value={about}
        />
      </div>
      <button className="mentor-card__submit" onClick={onClick}>
        Оставить заявку
      </button>
      <Tags className="mentor-card__tags" tags={tags} />
    </div>
  );
};

export default MentorCard;
