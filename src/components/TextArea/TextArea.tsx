interface TextAreaProps {
  className: string;
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
