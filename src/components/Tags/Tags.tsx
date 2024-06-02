import { useId } from 'react';
import Tag from './Tag';
import './Tags.css';

const TAG_COLORS = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

interface TagsProps {
  /* words for quick mentor search */
  tags: string[];
  /* flag is component in edit mode */
  isEdit: boolean;
  newTags: { value: string; color: string; isEdit: boolean }[];
  setNewTags: (tag: object) => void;
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
const Tags = ({ tags, className, newTags, setNewTags, isEdit }: TagsProps) => {
  const colorGetter = randomColorGetter(TAG_COLORS);
  const handleAddTagClick = () => {
    const color = colorGetter();
    if (newTags[newTags.length - 1]?.isEdit !== true)
      setNewTags((prev) => [...prev, { value: '', isEdit: true, color }]);
  };

  const handleTagEnter = (tagValue: string, color: string, index: number) => {
    setNewTags((prev) => {
      const updatedTags = [...prev];
      updatedTags[index] = { value: tagValue, isEdit: false, color: color };
      return updatedTags;
    });
  };

  return (
    <div className={`tags ${className ?? ''}`} data-testid="tags">
      {!tags.length && !isEdit ? (
        <span className="message">Ключевые слова не добавлены</span>
      ) : (
        tags?.map((tag) => {
          const color = colorGetter();
          return (
            <Tag
              tag={tag?.keyword}
              color={color}
              key={useId()}
              isEdit={false}
            />
          );
        })
      )}
      {isEdit &&
        newTags?.map((tag, index) => {
          return (
            <Tag
              tag={tag.value}
              color={tag.color}
              key={useId()}
              isEdit={tag.isEdit}
              onEnter={(tagValue) => handleTagEnter(tagValue, tag.color, index)}
            />
          );
        })}
      {isEdit && (
        <button
          type="button"
          className="tags__button"
          onClick={handleAddTagClick}
        >
          Добавить
        </button>
      )}
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
