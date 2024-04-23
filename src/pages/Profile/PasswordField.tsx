import { useState } from 'react';

interface PasswordFieldProps {
  label: string;
}

const PasswordField = ({ label }: PasswordFieldProps) => {
  const [isShowing, setShowing] = useState(false);
  return (
    <label className={`profile__form-label  profile__form-label-active`}>
      {label}
      <input
        type={isShowing ? 'text' : 'password'}
        className="profile__form-input"
      />
      <button
        type="button"
        onClick={() => setShowing((isShowed) => !isShowed)}
        className="profile__form-input-view"
      ></button>
    </label>
  );
};

export default PasswordField;
