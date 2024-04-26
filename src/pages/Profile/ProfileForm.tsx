import InputField from '../../components/InputField/InputField';
import PasswordField from '../../components/PasswordField/PasswordField';
import TextArea from '../../components/TextArea/TextArea';
import ProfileHeader from './ProfileHeader';
import ProfileSection from './ProfileSection';
import { Mentor, ProfileType, User } from '../../types';
import { possibleTagColors, getRandomItem } from '../../utils';

interface ProfileFormProps {
  type: ProfileType;
  isMine: boolean;
  isEdit: boolean;
  userInfo: User | Mentor;
  onSave: () => void;
  onEditClick: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  type,
  isMine,
  isEdit,
  userInfo,
  onSave,
  onEditClick,
}) => {
  const hasEdit = isMine && isEdit;

  return (
    <form className="profile__form">
      <ProfileHeader
        username={userInfo.username}
        isMine={isMine}
        isEdit={isEdit}
        onSave={onSave}
        onEditClick={onEditClick}
      />

      <ProfileSection>
        <label className="profile__form-label">
          Роль:
          <input
            type="text"
            readOnly
            value={type}
            className="profile__form-input"
          />
        </label>
        <InputField
          isEdit={hasEdit}
          label="Почта:"
          value={userInfo.email}
          labelClassName="profile__form-label"
          inputClassName="profile__form-input"
        />
        <InputField
          isEdit={hasEdit}
          label="Телеграмм:"
          value={userInfo.tgId}
          labelClassName="profile__form-label"
          inputClassName="profile__form-input"
        />
      </ProfileSection>

      {isMine && (
        <ProfileSection title="Безопасность:">
          <InputField
            isEdit={hasEdit}
            label="Логин:"
            value={userInfo.login}
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
          value={userInfo.bio ?? ''}
        />
      </ProfileSection>

      {type === ProfileType.MENTOR && (
        <ProfileSection title="Ключевые слова:">
          <div className="profile__form-tags">
            {(userInfo as Mentor).tags.map((tag) => {
              const color = getRandomItem(possibleTagColors);
              return (
                <span
                  key={tag}
                  className="profile__form-tag"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}15`,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </ProfileSection>
      )}
    </form>
  );
};

export default ProfileForm;
