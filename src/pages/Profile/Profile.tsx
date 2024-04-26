import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { Mentor, ProfileType, User } from '../../types';
import './Profile.css';

interface ProfileProps {
  /* [STUDENT, MENTOR] profile type*/
  type: ProfileType;
  /* Flag to show edit button */
  isMine: boolean;
  /* Flag to show save button */
  isEdit?: boolean;
  /* Describe to user data */
  userInfo: User | Mentor;
}

/**
 * Profile page
 * Shows all user data with avatar
 * @param {ProfileType} type [STUDENT, MENTOR] Look at ProfileType enum
 * @param {boolean} isMine Flag to show edit button
 * @param {boolean} isEdit Flag to show save button
 * @param {Student | Mentor} userInfo User information
 * @returns {React.FC} Profile component
 */
const Profile: React.FC<ProfileProps> = ({
  type,
  isMine,
  isEdit = false,
  userInfo,
}: ProfileProps) => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('edit');
  };

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img src={userInfo.avatar} alt="avatar" className="profile__avatar" />
      </div>
      <div className="profile__form-wrapper">
        <ProfileForm
          type={type}
          isMine={isMine}
          isEdit={isEdit}
          userInfo={userInfo}
          onSave={handleSave}
          onEditClick={handleEditClick}
        />
      </div>
    </section>
  );
};

export default Profile;
