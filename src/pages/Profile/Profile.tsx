import { useNavigate } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { ProfileType, User } from '../../types';
import './Profile.css';

interface ProfileProps {
  type: ProfileType;
  isMine: boolean;
  isEdit?: boolean;
  userInfo: User;
}

const Profile: React.FC<ProfileProps> = ({
  type,
  isMine,
  isEdit = false,
  userInfo,
}) => {
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
