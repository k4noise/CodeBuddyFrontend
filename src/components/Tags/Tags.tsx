import Tag from './Tag';
import './Tags.css';

const TAG_COLORS = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

interface TagsProps {
  /* words for quick mentor search */
  tags: string[];
  /* class name for container */
  className?: string;
}

/**
 * Tags component
 * Shows tags in custom container
 * @component
 * @param {string[]} tags words for quick mentor search
 * @param {string} classNameTagsProps class name for container
 * @returns {JSX.Element} Tags component
 */
const Tags = ({ tags, className }: TagsProps) => {
  const colorGetter = randomColorGetter(TAG_COLORS);
  return (
    <div className={`tags ${className ?? ''}`} data-testid="tags">
      {tags?.map((tag) => {
        const color = colorGetter();
        return <Tag tag={tag?.keyword} color={color} key={tag?.keyword} />;
      })}
    </div>
  );
};

const randomColorGetter = (colors: string[]) => {
  let availableColors = [...colors];

  return () => {
    if (availableColors.length === 0) {
      availableColors = [...colors];
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const randomColor = availableColors[randomIndex];
    availableColors.splice(randomIndex, 1);

    return randomColor;
  };
};

export default Tags;
