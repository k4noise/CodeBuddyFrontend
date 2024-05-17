import InputField from '../../components/InputField/InputField';
import PasswordField from '../../components/PasswordField/PasswordField';
import TextArea from '../../components/TextArea/TextArea';
import ProfileSection from './ProfileSection';
import Tags from '../../components/Tags/Tags';
import { ProfileType } from '../../types';
import { Link } from 'react-router-dom';
import { UserData } from '../../actions/dto/user';

interface ProfileFormProps {
  /* Flag to show edit button */
  isMine: boolean;
  /* Flag to show save button */
  isEdit: boolean;
  /* student or mentor */
  profileType: ProfileType;
  /* Describe to user data */
  userInfo: UserData;
  /* Callback to save button click */
  onSave: () => void;
  /* Callback to save button click */
  onEditClick: () => void;
}

/**
 * Profile form component
 * Shows all information about user and allow change it
 * @component
 * @example
 * ```
 * <ProfileForm
 *  type=ProfileType.STUDENT
 *  isMine={false}
 *  userInfo={{
 *    login: 'ivan.ivanov@mail.ru',
 *    username: 'Иван Иванов',
 *    avatar: AvatarImage,
 *    email: 'ivan.ivanov@mail.ru',
 *    tgId: '@ivan_ivanov',
 *  }}
 *  onSave=() => console.log('save')
 *  onEdit=() => console.log('edit')
 * />
 * ```
 * @param {boolean} isMine Flag to show edit button
 * @param {boolean} isEdit Flag to show save button
 * @param {Student | Mentor} userInfo User information
 * @param {function} onSave Callback to save button click
 * @param {function} onEditClick Callback to edit button click
 * @returns {React.FC} Profile form component
 */
const ProfileForm: React.FC<ProfileFormProps> = ({
  isMine,
  isEdit,
  profileType,
  userInfo,
  onSave,
  onEditClick,
}: ProfileFormProps) => {
  const hasEdit = isMine && isEdit;

  return (
    <form className="profile__form" data-testid="profileForm">
      <div className="profile__form-common">
        <span className="profile__username">{`${userInfo?.firstName ?? ''} ${
          userInfo?.lastName ?? ''
        }`}</span>
        {isMine && !isEdit && (
          <button
            className="profile__form-edit"
            type="button"
            data-testid="edit"
            onClick={onEditClick}
          ></button>
        )}
        {hasEdit && (
          <button
            type="button"
            onClick={onSave}
            data-testid="save"
            className="profile__form-save"
          >
            Сохранить
          </button>
        )}
      </div>
      <ProfileSection>
        <label className="profile__form-label">
          Роль:
          <input
            type="text"
            readOnly
            value={profileType}
            className="profile__form-input"
          />
        </label>
        {!isEdit && userInfo?.email ? (
          <Link
            to={`mailto:${userInfo?.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InputField
              isEdit={hasEdit}
              label="Почта :"
              value={userInfo?.email}
              labelClassName="profile__form-label"
              inputClassName="profile__form-input"
            />
          </Link>
        ) : (
          <InputField
            isEdit={hasEdit}
            label="Почта :"
            value={userInfo?.email ?? 'Скрыта'}
            labelClassName="profile__form-label"
            inputClassName="profile__form-input"
          />
        )}
        {!hasEdit && userInfo?.telegram ? (
          <Link
            to={`https://t.me/${userInfo?.telegram?.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InputField
              isEdit={hasEdit}
              label="Телеграмм:"
              value={userInfo?.telegram}
              labelClassName="profile__form-label"
              inputClassName="profile__form-input"
            />
          </Link>
        ) : (
          <InputField
            isEdit={hasEdit}
            label="Телеграмм:"
            value={userInfo?.telegram ?? 'Не указан'}
            labelClassName="profile__form-label"
            inputClassName="profile__form-input"
          />
        )}
      </ProfileSection>

      {isMine && (
        <ProfileSection title="Безопасность:">
          <InputField
            isEdit={hasEdit}
            label="Логин:"
            value={userInfo?.email}
            labelClassName="profile__form-label"
            inputClassName="profile__form-input"
          />
          {isEdit && (
            <>
              <PasswordField
                label="Пароль:"
                labelClassName="profile__form-label"
                inputClassName="profile__form-input"
              />
              <PasswordField
                label="Новый пароль:"
                labelClassName="profile__form-label"
                inputClassName="profile__form-input"
              />
            </>
          )}
        </ProfileSection>
      )}

      <ProfileSection title="О себе:">
        <TextArea
          className="profile__form-textarea"
          placeholder={hasEdit ? 'Введите текст' : ''}
          readonly={!hasEdit}
          value={userInfo?.description ?? ''}
        />
      </ProfileSection>

      {profileType === ProfileType.MENTOR && (
        <ProfileSection title="Ключевые слова:">
          <Tags tags={userInfo?.tags ?? []} />
        </ProfileSection>
      )}
    </form>
  );
};

export default ProfileForm;
