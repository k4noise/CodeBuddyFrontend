import { useState } from 'react';

interface PasswordFieldProps {
  label: string;
  labelClassName: string;
  inputClassName: string;
  placeholder?: string;
}

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
