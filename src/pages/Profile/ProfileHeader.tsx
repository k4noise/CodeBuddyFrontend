interface ProfileHeaderProps {
  username: string;
  isMine: boolean;
  isEdit: boolean;
  onSave: () => void;
  onEditClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  isMine,
  isEdit,
  onSave,
  onEditClick,
}) => {
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
