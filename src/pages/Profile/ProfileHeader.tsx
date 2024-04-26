interface ProfileHeaderProps {
  /* Username */
  username: string;
  /* Flag to show edit button */
  isMine: boolean;
  /* Flag to show save button */
  isEdit: boolean;
  /* Callback to save button click */
  onSave: () => void;
  /* Callback to edit button click */
  onEditClick: () => void;
}

/**
 * Profile header component
 * Shows information about user name
 * @component
 * @example
 * ```
 * <Profile
      type={ProfileType.STUDENT}
      isMine={true}
      isEdit={false}
      userInfo={{
        login: 'ivan.ivanov@mail.ru',
        username: 'Иван Иванов',
        avatar: AvatarImage,
        email: 'ivan.ivanov@mail.ru',
        tgId: '@ivan_ivanov',
      }}
    />
 * ```
 * @param {string} username Username
 * @param {boolean} isMine Flag to show edit button
 * @param {boolean} isEdit Flag to show save button
 * @param {function} onSave Callback to save button click
 * @param {function} onEditClick Callback to edit button click
 * @returns {any} Profile header component
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  isMine,
  isEdit,
  onSave,
  onEditClick,
}: ProfileHeaderProps) => {
  const hasEdit = isMine && isEdit;

  return (
    <div className="profile__form-common">
      <span className="profile__username">{username}</span>
      {isMine && !isEdit && (
        <button
          className="profile__form-edit"
          type="button"
          onClick={onEditClick}
        ></button>
      )}
      {hasEdit && (
        <button type="button" onClick={onSave} className="profile__form-save">
          Сохранить
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;
