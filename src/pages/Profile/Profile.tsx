import { useNavigate, useParams } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { ProfileType } from '../../types';
import './Profile.css';
import { useEffect, useState } from 'react';
import { getProfileData } from '../../actions/profile';
import { UserData } from '../../actions/dto/user';
import defaultAvatarImage from '../../assets/avatar1.png';
import { handleError } from '../../actions/sendRequest';

interface ProfileProps {
  /* Flag to show edit button */
  isMine: boolean;
  /* Flag to show save button */
  isEdit?: boolean;
  /* profile type - student or mentor */
  profileType: ProfileType;
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
 * @param {UserData} userInfo User information
 * @returns {React.FC} Profile component
 */
const Profile: React.FC<ProfileProps> = ({
  isMine,
  isEdit = false,
  profileType,
}: ProfileProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  let userAvatar = user?.photoUrl;
  userAvatar =
    userAvatar !== null && userAvatar !== 'null'
      ? userAvatar
      : defaultAvatarImage;

  const getData = async () => {
    const { data, error } = await getProfileData(
      isMine,
      profileType,
      Number(id)
    );
    if (error) {
      handleError(error, navigate);
    }
    if (data) setUser(data);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleSave = () => {
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('edit');
  };

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img src={userAvatar} alt="avatar" className="profile__avatar" />
      </div>
      <div className="profile__form-wrapper">
        <ProfileForm
          isMine={isMine}
          isEdit={isEdit}
          profileType={profileType}
          userInfo={user as UserData}
          onSave={handleSave}
          onEditClick={handleEditClick}
        />
      </div>
    </section>
  );
};

export default Profile;
