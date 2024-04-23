import { useState } from 'react';

interface InputFieldProps {
  isEdit: boolean;
  label: string;
  value: string;
}

const InputField = (props: InputFieldProps) => {
  const [readonly, setReadonly] = useState(true);

  return (
    <label
      className={`profile__form-label${
        props.isEdit ? ' profile__form-label-active' : ''
      }`}
    >
      <span style={{ width: 'fit-content' }}>{props.label}</span>
      <input
        type="text"
        readOnly={readonly}
        defaultValue={props.value}
        className="profile__form-input"
      />
      {props.isEdit && (
        <button
          type="button"
          onClick={() => setReadonly((oldReadonly) => !oldReadonly)}
          className="profile__form-input-edit"
        ></button>
      )}
    </label>
  );
};

export default InputField;
