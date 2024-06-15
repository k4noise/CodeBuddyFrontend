import PasswordField from '../../components/PasswordField/PasswordField';
import TextArea from '../../components/TextArea/TextArea';
import ProfileSection from './ProfileSection';
import Tags from '../../components/Tags/Tags';
import { ProfileType } from '../../types';
import { useLocation } from 'react-router-dom';
import { UserData } from '../../actions/dto/user';
import * as zod from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
interface ProfileFormProps {
  /* Flag to show edit button */
  isMine: boolean;
  /* student or mentor */
  profileType: ProfileType;
  /* Describe to user data */
  userInfo: UserData;
  /* Callback to save button click */
  onSave: (data: FieldValues) => void;
  /* Callback to save button click */
  onEditClick: () => void;
  fromRequest?: boolean;
}

const createProfileSchema = (existingEmail: string) =>
  zod
    .object({
      email: zod.string().email('Некорректный email'),
      telegram: zod
        .string()
        .startsWith('@', 'Укажите короткое имя вместе с @')
        .or(zod.literal('')),
      password: zod.string().optional(),
      newPassword: zod
        .string()
        .min(8, 'Не менее 8 символов')
        .refine(
          (value) =>
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/.test(
              value ?? ''
            ),
          'Пароль должен содержать минимум одну цифру, одну большую и маленькую буквы и один спецсимвол'
        )
        .or(zod.literal('')),
      about: zod.string().optional(),
      existingEmail: zod.string().default(existingEmail),
    })
    .refine(
      (data) => {
        if (data.email !== data.existingEmail || data.newPassword !== '') {
          return !!data.password && data.password.length >= 8;
        }
        return true;
      },
      {
        message: 'Укажите пароль для изменения данных',
        path: ['password'],
      }
    )
    .refine(
      (data) => data.newPassword === '' || data.newPassword !== data.password,
      {
        message: 'Пароли должны быть разными',
        path: ['newPassword'],
      }
    );

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
 *    telegram: '@ivan_ivanov',
 *  }}
 *  onSave=() => console.log('save')
 *  onEdit=() => console.log('edit')
 * />
 * ```
 * @param {boolean} isMine Flag to show edit button
 * @param {boolean} isEdit Flag to show save button
 * @param {UserData} userInfo User information
 * @param {function} onSave Callback to save button click
 * @param {function} onEditClick Callback to edit button click
 * @returns {React.FC} Profile form component
 */
const ProfileForm: React.FC<ProfileFormProps> = ({
  isMine,
  profileType,
  userInfo,
  onSave,
  onEditClick,
  fromRequest,
}: ProfileFormProps) => {
  const location = useLocation();
  const isEdit = location.pathname.includes('/edit');
  const hasEdit = isMine && isEdit;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProfileSchema(userInfo.email)),
  });
  const [tags, setTags] = useState([]);

  const sendForm = (data: FieldValues) => {
    onSave({ ...data, tags });
    reset();
  };

  useEffect(() => {
    reset({
      email: userInfo.email,
      telegram: userInfo.telegram,
      description: userInfo.description,
    });
  }, [userInfo, reset]);

  return (
    <form
      className="profile__form"
      data-testid="profileForm"
      onSubmit={handleSubmit(sendForm)}
      encType="multipart/form-data"
    >
      <div className="profile__form-common">
        <span className="profile__username">{`${userInfo.firstName ?? ''} ${
          userInfo.lastName ?? ''
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
            type="submit"
            data-testid="save"
            className="profile__form-save"
          >
            Сохранить
          </button>
        )}
      </div>
      <ProfileSection>
        <label className="profile__form-label">
          Роль :
          <input
            type="text"
            readOnly
            value={profileType}
            className="profile__form-input"
          />
        </label>
        <label className="profile__form-label">
          Почта :
          <input
            type="text"
            value={userInfo.email ?? 'Скрыта'}
            className="profile__form-input"
            readOnly={!isEdit}
            {...register('email')}
          />
        </label>
        {errors.email?.message && (
          <p className="zod-error">{errors.email?.message}</p>
        )}
        <label className="profile__form-label">
          Телеграмм :
          <input
            type="text"
            defaultValue={
              isMine
                ? userInfo.telegram ?? ''
                : fromRequest
                ? userInfo.telegram ?? 'Не указан'
                : 'Скрыт'
            }
            className="profile__form-input"
            readOnly={!isEdit}
            {...register('telegram')}
          />
        </label>
        {errors.telegram?.message && (
          <p className="zod-error">{errors.telegram?.message}</p>
        )}
      </ProfileSection>

      {isMine && (
        <ProfileSection title="Безопасность:">
          <label className="profile__form-label">
            Логин :
            <input
              type="email"
              readOnly
              value={userInfo?.email}
              className="profile__form-input"
            />
          </label>
          {isEdit && (
            <>
              <PasswordField
                label="Пароль :"
                labelClassName="profile__form-label"
                inputClassName="profile__form-input"
                validationOptions={register('password')}
              />
              {errors.password?.message && (
                <p className="zod-error">{errors.password?.message}</p>
              )}
              <PasswordField
                label="Новый пароль :"
                labelClassName="profile__form-label"
                inputClassName="profile__form-input"
                validationOptions={register('newPassword')}
              />
              {errors.newPassword?.message && (
                <p className="zod-error">{errors.newPassword?.message}</p>
              )}
            </>
          )}
        </ProfileSection>
      )}

      <ProfileSection title="О себе :">
        <TextArea
          className="profile__form-textarea"
          placeholder={hasEdit ? 'Введите текст (не более 255 символов)' : ''}
          readonly={!hasEdit}
          value={userInfo?.description ?? ''}
          validationOptions={register('about')}
          max={255}
        />
      </ProfileSection>

      {profileType == ProfileType.MENTOR && (
        <ProfileSection title="Ключевые слова :">
          <Tags
            tags={userInfo?.keywords ?? []}
            isEdit={isEdit}
            newTags={tags}
            setNewTags={setTags}
          />
        </ProfileSection>
      )}
    </form>
  );
};

export default ProfileForm;
