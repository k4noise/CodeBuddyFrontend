import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Tags from './Tags';

const TAGS = ['tag1', 'tag2', 'tag3'];

describe('Test tags', () => {
  render(<Tags tags={TAGS} />);
  test('Tags exists', () => {
    const tagsContainer = screen.getByTestId('tags');
    expect(tagsContainer).toBeInTheDocument();

    TAGS.forEach((tag) => expect(screen.getByText(tag)).toBeInTheDocument());
  });
});
