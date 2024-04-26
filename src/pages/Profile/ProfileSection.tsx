interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, children }) => {
  return (
    <div className="profile__form-section">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default ProfileSection;
