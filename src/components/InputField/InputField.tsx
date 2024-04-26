import { useState } from 'react';

interface InputFieldProps {
  isEdit: boolean;
  /* caption text, visible always */
  label: string;
  /* initial input value */
  value: string;
  /* css class for label styling */
  labelClassName: string;
  /* caption text, visible only for empty input */
  inputClassName: string;
}

/**
 * Input field component
 * Shows readonly input with edit/save button
 * @component
 * @param {boolean} isEdit state flag
 * @param {string} label always visible text
 * @param {string} value initial input value
 * @param {string} labelClassName label css classname
 * @param {string} inputClassName input css classname
 * @returns {React.FC} Input field
 */
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
