import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { Mentor, User } from '../../types';
import './Profile.css';

interface ProfileProps {
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
 * @component
 * @example
 * ```
 * <Profile isMine={true} userInfo={{
 *  type: ProfileType.STUDENT,
      login: 'john@mail.com',
      username: 'John Doe',
      email: 'john@mail.com',
      avatar: 'avatar.png',
      tgId: '@id'
 *   }}
 * />
 * ```
 * @param {boolean} isMine Flag to show edit button
 * @param {boolean} isEdit Flag to show save button
 * @param {Student | Mentor} userInfo User information
 * @returns {React.FC} Profile component
 */
const Profile: React.FC<ProfileProps> = ({
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
