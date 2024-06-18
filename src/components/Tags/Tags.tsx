import { useId } from 'react';
import Tag from './Tag';
import './Tags.css';

const TAG_COLORS = ['#FFA800', '#1168A7', '#470E8F', '#FF0000'];

interface TagsProps {
  /* words for quick mentor search */
  tags: string[];
  /* flag is component in edit mode */
  isEdit: boolean;
  /* added tags */
  newTags: { value: string; color: string; isEdit: boolean }[];
  /* callback for adding tags */
  setNewTags: (
    tags: { value: string; color: string; isEdit: boolean }[]
  ) => void;
  /* class name for container */
  className?: string;
}

/**
 * Tags component
 * Shows tags in custom container
 * @component
 * @param {TagsProps} props 
 * @returns {JSX.Element} Tags component
 */
const Tags = ({ tags, className, newTags, setNewTags, isEdit }: TagsProps) => {
  const colorGetter = randomColorGetter(TAG_COLORS);
  const id = useId();

  const handleAddOrSaveTagClick = () => {
    const lastTag = newTags[newTags.length - 1];
    if (lastTag && lastTag.isEdit) {
      setNewTags((prev) => {
        const updatedTags = [...prev];
        updatedTags[updatedTags.length - 1] = {
          ...updatedTags[updatedTags.length - 1],
          isEdit: false,
        };
        return updatedTags;
      });
    } else {
      const color = colorGetter();
      setNewTags((prev) => [...prev, { value: '', isEdit: true, color }]);
    }
  };

  return (
    <div className={`tags ${className ?? ''}`} data-testid="tags">
      {!tags.length && !isEdit ? (
        <span className="message">Ключевые слова не добавлены</span>
      ) : (
        tags?.map((tag, index) => {
          const color = colorGetter();
          return (
            <Tag
              key={`${id}-${index}`}
              tag={tag.keyword}
              color={color}
              isEdit={false}
            />
          );
        })
      )}
      {isEdit &&
        newTags?.map((tag, index) => {
          return (
            <Tag
              key={`${id}-new-${index}`}
              tag={tag.value}
              color={tag.color}
              isEdit={tag.isEdit}
              onSave={(tagValue) => {
                setNewTags((prev) => {
                  const updatedTags = [...prev];
                  updatedTags[index] = {
                    ...updatedTags[index],
                    value: tagValue,
                  };
                  return updatedTags;
                });
              }}
            />
          );
        })}
      {isEdit && (
        <button
          type="button"
          className="tags__button"
          onClick={handleAddOrSaveTagClick}
        >
          {newTags.length === 0 || !newTags[newTags.length - 1].isEdit
            ? 'Добавить'
            : 'Сохранить'}
        </button>
      )}
    </div>
  );
};

const randomColorGetter = (colors: string[]) => {
  let availableColors = [...colors];
  let usedColors: string[] = [];

  return () => {
    if (availableColors.length === 0) {
      availableColors = [...usedColors];
      usedColors = [];
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const randomColor = availableColors[randomIndex];
    usedColors.push(randomColor);
    availableColors.splice(randomIndex, 1);

    return randomColor;
  };
};

export default Tags;
