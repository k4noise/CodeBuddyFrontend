import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import './PasswordField.css';

interface PasswordFieldProps {
  /* caption text, visible always */
  label: string;
  /* css class for label styling */
  labelClassName: string;
  /* css class for input styling */
  inputClassName: string;
  /* zod register('field') object */
  validationOptions?: UseFormRegisterReturn;
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
    <label className={`${props.labelClassName} password__label`}>
      {props.label}
      <input
        type={isShowing ? 'text' : 'password'}
        placeholder={props.placeholder}
        className={`password__input  ${props.inputClassName}`}
        {...props?.validationOptions}
      />
      <button
        type="button"
        onClick={() => setShowing((isShowed) => !isShowed)}
        className={`password__view${isShowing ? ` password__view-active` : ''}`}
      ></button>
    </label>
  );
};

export default PasswordField;
