import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Question from './Question';

const QUESTION_WITHOUT_IMAGES = {
  avatar: 'user-avatar.jpg',
  authorName: 'John Doe',
  question: 'Sample question',
  likes: 5,
  comments: [
    {
      avatar: 'avatar1.jpg',
      username: 'Alice',
      date: '2024-04-13',
      comment: 'Comment 1',
    },
    {
      avatar: 'avatar2.jpg',
      username: 'Bob',
      date: '2024-04-14',
      comment: 'Comment 2',
    },
  ],
};

describe('Test question with pictures', () => {
  const QUESTION_WITH_IMAGES = {
    ...QUESTION_WITHOUT_IMAGES,
    images: ['image1.jpg', 'image2.jpg'],
  };

  beforeEach(() => {
    render(<Question {...QUESTION_WITH_IMAGES} />);
  });

  test('Question data exists', () => {
    expect(
      screen.getAllByAltText(`${QUESTION_WITH_IMAGES.authorName} avatar`)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(QUESTION_WITH_IMAGES.authorName)[0]
    ).toBeInTheDocument();
    expect(screen.getByText(QUESTION_WITH_IMAGES.question)).toBeInTheDocument();
    expect(screen.getByText(QUESTION_WITH_IMAGES.likes)).toBeInTheDocument();
    expect(
      screen.getByText(QUESTION_WITH_IMAGES.comments.length)
    ).toBeInTheDocument();
  });

  test('Pictures exists', () => {
    const images = screen.getAllByAltText('bug');
    images.forEach((image) => expect(image).toBeInTheDocument());
    expect(images.length).toEqual(QUESTION_WITH_IMAGES['images'].length);
  });

  test('Comments exists', () => {
    const comments = screen.getByTestId('comments');
    expect(comments).toBeInTheDocument();
  });
});

describe('Test question without pictures', () => {
  beforeEach(() => {
    render(<Question {...QUESTION_WITHOUT_IMAGES} />);
  });

  test('Question data exists', () => {
    expect(
      screen.getAllByAltText(`${QUESTION_WITHOUT_IMAGES.authorName} avatar`)[0]
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(QUESTION_WITHOUT_IMAGES.authorName)[0]
    ).toBeInTheDocument();
    expect(
      screen.getByText(QUESTION_WITHOUT_IMAGES.question)
    ).toBeInTheDocument();
    expect(screen.getByText(QUESTION_WITHOUT_IMAGES.likes)).toBeInTheDocument();
    expect(
      screen.getByText(QUESTION_WITHOUT_IMAGES.comments.length)
    ).toBeInTheDocument();
  });

  test('Pictures not exists', () => {
    const images = screen.queryAllByAltText('bug');
    expect(images.length).toEqual(0);
  });

  test('Comments exists', () => {
    const comments = screen.getByTestId('comments');
    expect(comments).toBeInTheDocument();
  });
});
