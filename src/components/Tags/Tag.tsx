import { Link } from 'react-router-dom';

interface TagProps {
  /* quick mentor property */
  tag?: string;
  /* tag border color */
  color: string;
  isEdit: boolean;
  onEnter?: (tagValue: string) => void;
}

/**
 * Tag component
 * Shows link to quick mentor search by tag
 * @component
 * @param {string} tag quick mentor property
 * @param {any} color tag border color
 * @returns {JSX.Element}
 */
const Tag = ({ tag, color, isEdit, onEnter }: TagProps) => {
  return isEdit ? (
    <input
      type="text"
      className="tag"
      onKeyDown={(event) => {
        if (event.key === 'Enter') onEnter(event.target.value);
      }}
    />
  ) : (
    <Link
      to={`/mentors?keyword=${tag}`}
      key={tag}
      className="tag"
      style={{
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      {tag}
    </Link>
  );
};

export default Tag;
