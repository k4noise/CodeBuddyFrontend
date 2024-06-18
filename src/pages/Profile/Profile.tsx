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
  addTagsToMentor,
} from '../../actions/profile';
import {
  UpdateSecurityData,
  UpdateSettingsData,
  UserData,
} from '../../actions/dto/user';
import { handleError } from '../../actions/sendRequest';
import { getAvatar } from '../../actions/util';
import { FieldValues } from 'react-hook-form';
import { loginUser, logoutUser } from '../../actions/auth';
import { useAuth } from '../../AuthProvider';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

interface ProfileProps {
  /* Flag to show edit button */
  isMine: boolean;
  /* profile type - student or mentor */
  profileType?: ProfileType;
  /* flag for try get data with contact data */
  fromRequest: boolean;
}

/**
 * Profile page
 * Shows all user data with avatar
 * @component
 * @param {boolean} isMine Flag to show edit button
 * @param {UserData} profileType student or mentor
 * @param {boolean} fromRequest get data with contact dcata or not
 * @returns {React.FC} Profile component
 */
const Profile: React.FC<ProfileProps> = ({
  isMine,
  profileType,
  fromRequest,
}: ProfileProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const { avatar, changeAvatar } = useAuth();
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');

  if (!profileType) profileType = Cookies.get('profileType') as ProfileType;

  const getData = async () => {
    const { data, error } = await getProfileData(
      isMine,
      fromRequest,
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
  }, [location.pathname]);

  if (!user)
    return <div className="load-error">Ошибка загрузки данных профиля</div>;

  const handleSave = async (data: FieldValues) => {
    if (data.existingEmail !== data.email || data.newPassword) {
      const securityData: UpdateSecurityData = {
        email: data.email,
        password: data.password,
        newPassword: data.newPassword,
      };
      const { error } = await updateSecurity(profileType, securityData);
      if (error) {
        toast('Неправильный пароль', { type: 'error' });
        return;
      }
      await logoutUser();
      await loginUser(
        {
          login: data.email,
          password: data.newPassword ?? data.password,
        },
        profileType
      );
    }

    if (newAvatar) {
      toast('Идет загрузка аватара', { type: 'info' });
      const newAvatarUrl = await updateAvatar(profileType, avatarFile);
      if (newAvatarUrl) changeAvatar(data.photoUrl);
    }

    if (data.telegram || data.about) {
      const oldTags = user?.keywords
        ? user.keywords.map(({ keyword }) => keyword)
        : [];
      const tags = [...oldTags, ...data.tags.map((tag) => tag.value)];
      const settingsData: UpdateSettingsData = {
        telegram: data.telegram,
        description: data.about,
        keywords: tags,
      };
      await updateProfile(profileType, settingsData);
    }

    if (data.tags.length) {
      const oldTags = user?.keywords
        ? user.keywords.map(({ keyword }) => keyword)
        : [];
      await addTagsToMentor(
        oldTags,
        data.tags.map((tag) => tag.value)
      );
    }
    toast('Данные изменены', { type: 'success' });
    navigate(-1);
  };

  const handleEditClick = () => {
    navigate('edit');
  };

  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setUser({ ...user, photoUrl: newAvatar });
  };

  return (
    <section className="profile">
      <div className="profile__avatar-wrapper">
        <img
          src={newAvatar ?? getAvatar(user.photoUrl, profileType)}
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
          fromRequest={fromRequest}
        />
      </div>
    </section>
  );
};

export default Profile;
