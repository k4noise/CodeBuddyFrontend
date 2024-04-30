interface TagProps {
  tag: string;
  color: string;
}

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
