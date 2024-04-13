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
}

const TextArea = ({ className, placeholder }: TextAreaProps) => {
  const resize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <textarea
      className={className}
      placeholder={placeholder}
      onInput={resize}
      rows={1}
    ></textarea>
  );
};

export default TextArea;
