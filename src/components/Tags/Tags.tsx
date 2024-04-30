import Tag from './Tag';
import './Tags.css';

const TAG_COLORS = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

interface TagsProps {
  tags: string[];
  className?: string;
}

const Tags = ({ tags, className }: TagsProps) => {
  const colorGetter = randomColorGetter(TAG_COLORS);
  return (
    <div className={`tags ${className ?? ''}`}>
      {tags.map((tag) => {
        const color = colorGetter();
        return <Tag tag={tag} color={color} key={tag} />;
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
