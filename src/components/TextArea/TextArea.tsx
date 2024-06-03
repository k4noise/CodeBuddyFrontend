import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * TextArea component
 * Default <textarea> component with auto-resize height
 * @component
 * @example
 * ```
 * <TextArea className="question__textarea" placeholder="Какой у вас вопрос?" />
 * ```
 * @param {string} className additional class name for textarea
 * @param {string} placeholder custom placeholder text
 * @returns {JSX.Element} TextArea
 */
interface TextAreaProps {
  /** additional class name for textarea **/
  className: string;
  /** custom placeholder text **/
  placeholder: string;
  /** is possible edit text **/
  readonly?: boolean;
  /** text in textarea **/
  value?: string;
  max?: number;
  validationOptions?: UseFormRegisterReturn;
}

const TextArea = ({
  className,
  placeholder,
  readonly = false,
  value,
  max,
  validationOptions,
}: TextAreaProps) => {
  const resize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <textarea
      {...validationOptions}
      className={className}
      placeholder={placeholder}
      onInput={resize}
      readOnly={readonly}
      rows={1}
      maxLength={max}
      defaultValue={value}
    ></textarea>
  );
};

export default TextArea;
