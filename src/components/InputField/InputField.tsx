import { useState } from 'react';

interface InputFieldProps {
  isEdit: boolean;
  label: string;
  value: string;
  labelClassName: string;
  inputClassName: string;
}

const InputField = ({
  isEdit,
  label,
  value,
  labelClassName,
  inputClassName,
}: InputFieldProps) => {
  const [isReadonly, setIsReadonly] = useState(true);

  const handleClick = () => {
    setIsReadonly((prevIsReadonly) => !prevIsReadonly);
  };

  return (
    <label
      className={`${labelClassName}${
        isEdit ? ` ${labelClassName}-active` : ''
      }`}
    >
      <span>{label}</span>
      <input
        type="text"
        readOnly={isReadonly}
        defaultValue={value}
        className={inputClassName}
      />
      {isEdit && (
        <button
          type="button"
          onClick={handleClick}
          className={`${inputClassName}-edit${
            !isReadonly ? ` ${inputClassName}-edit-active` : ''
          }`}
        />
      )}
    </label>
  );
};

export default InputField;
