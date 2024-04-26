import { useState } from 'react';

interface PasswordFieldProps {
  /* caption text, visible always */
  label: string;
  /* css class for label styling */
  labelClassName: string;
  /* css class for input styling */
  inputClassName: string;
  /* caption text, visible only for empty input */
  placeholder?: string;
}

/**
 * Password field component
 * Shows password input with custom label and hide/show button
 * @component
 * @param {PasswordFieldProps} props Look at PasswordFieldProps description
 * @returns {React.FC} Password field
 */
const PasswordField = (props: PasswordFieldProps) => {
  const [isShowing, setShowing] = useState(false);

  return (
    <label className={`${props.labelClassName} ${props.labelClassName}-active`}>
      {props.label}
      <input
        type={isShowing ? 'text' : 'password'}
        placeholder={props.placeholder}
        className={props.inputClassName}
      />
      <button
        type="button"
        onClick={() => setShowing((isShowed) => !isShowed)}
        className={`${props.inputClassName}-view${
          isShowing ? ` ${props.inputClassName}-view-active` : ''
        }`}
      ></button>
    </label>
  );
};

export default PasswordField;
