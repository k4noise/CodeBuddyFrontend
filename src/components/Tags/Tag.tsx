interface TagProps {
  /* quick mentor property */
  tag: string;
  /* tag border color */
  color: string;
}

/**
 * Tag component
 * Shows link to quick mentor search by tag
 * @component
 * @param {string} tag quick mentor property
 * @param {any} color tag border color
 * @returns {JSX.Element}
 */
const Tag = ({ tag, color }: TagProps) => {
  return (
    <span
      key={tag}
      className="tag"
      style={{
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      {tag}
    </span>
  );
};

export default Tag;
