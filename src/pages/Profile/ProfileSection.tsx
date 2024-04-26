interface ProfileSectionProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * Profile section component
 * Shows profile section (example About, Security, etc...) with various fields
 * @component
 * @example
 * ```
 * <ProfileSection title="О себе">
 *  <textarea>Текст</textarea>
 * </ProfileSection>
 *
 * ```
 * @param {string} title Section title
 * @param {React.ReactNode} children Section fields set
 * @returns {React.FC} Profile section component
 */
const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
}: ProfileSectionProps) => {
  return (
    <div className="profile__form-section">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

export default ProfileSection;
