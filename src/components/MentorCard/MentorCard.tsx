import Tags from '../Tags/Tags';
import TextArea from '../TextArea/TextArea';
import './MentorCard.css';

interface MentorCardProps {
  username: string;
  avatarUrl: string;
  about: string;
  tags: string[];
}

const MentorCard = ({ username, avatarUrl, about, tags }: MentorCardProps) => {
  return (
    <div className="mentor-card">
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
      <button className="mentor-card__submit">Оставить заявку</button>
      <Tags className="mentor-card__tags" tags={tags} />
    </div>
  );
};

export default MentorCard;
