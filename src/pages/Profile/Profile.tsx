import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { ProfileType } from '../../types';
import './Profile.css';
import { useEffect, useState } from 'react';
import {
  getProfileData,
  updateAvatar,
  updateSecurity,
  updateProfile,
  // addTags,
} from '../../actions/profile';
import {
  UpdateSecurityData,
  UpdateSettingsData,
  UserData,
} from '../../actions/dto/user';
import { handleError } from '../../actions/sendRequest';
import { getAvatar } from '../../actions/util';
import { FieldValues } from 'react-hook-form';
import { useAuth } from '../../AuthProvider';
import { loginUser, logoutUser } from '../../actions/auth';

interface ProfileProps {
  /* Flag to show edit button */
  isMine: boolean;
  /* profile type - student or mentor */
  profileType?: ProfileType;
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
 * @param {UserData} userInfo User information
 * @returns {React.FC} Profile component
 */
const Profile: React.FC<ProfileProps> = ({
  isMine,
  profileType,
}: ProfileProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { avatar, changeAvatar } = useAuth();
  const [user, setUser] = useState<UserData | null>(null);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');

  if (!profileType)
    profileType = sessionStorage.getItem('profileType') as ProfileType;
  let userAvatar = getAvatar(avatar, profileType);

  const getData = async () => {
    const { data, error } = await getProfileData(
      isMine,
      profileType,
      Number(id)
    );

    if (data) setUser(data);
    else if (error) {
      handleError(error, navigate);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!user)
    return <div className="load-error">Ошибка загрузки данных профиля</div>;

  const handleSave = async (data: FieldValues) => {
    console.log(data);
    if (newAvatar) {
      await updateAvatar(profileType, newAvatar);
      changeAvatar(newAvatar);
    }
    if (data.telegram || data.description) {
      const settingsData: UpdateSettingsData = {
        telegram: data.telegram,
        description: data.description,
      };
      await updateProfile(profileType, settingsData);
      await logoutUser();
      await loginUser(
        {
          login: data.email,
          password: data.password,
        },
        profileType
      );
    }
    if (data.newPassword) {
      const securityData: UpdateSecurityData = {
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
      };
      await updateSecurity(profileType, securityData);
      await logoutUser();
      await loginUser(
        {
          login: data.email,
          password: data.newPassword ?? data.password,
        },
        profileType
      );
    }

    // if (data.tags) {
    //   await addTags(data.tags.filter((tag) => tag.value));
    // }
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('edit');
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUser({ ...user, photoUrl: newAvatar as string });
  };

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img
          src={newAvatar ?? userAvatar}
          alt="avatar"
          className="profile__avatar"
        />
        {isEdit && (
          <button className="profile__avatar-upload">
            Загрузить
            <input
              type="file"
              name="avatar"
              accept="image/png, image/jpg, image/jpeg"
              className="profile__avatar-file"
              onChange={handleChangeAvatar}
            />
          </button>
        )}
      </div>
      <div className="profile__form-wrapper">
        <ProfileForm
          isMine={isMine}
          profileType={profileType}
          userInfo={user}
          onSave={handleSave}
          onEditClick={handleEditClick}
        />
      </div>
    </section>
  );
};

export default Profile;
