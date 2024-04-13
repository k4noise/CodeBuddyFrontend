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
  const QUESTION = { ...QUESTION_WITHOUT_IMAGES };
  QUESTION['images'] = ['image1.jpg', 'image2.jpg'];

  beforeEach(() => render(<Question {...QUESTION} />));

  test('Question data exists', () => {
    expect(screen.getAllByAltText(`${QUESTION.authorName} avatar`)[0]).to.exist;
    expect(screen.getAllByText(QUESTION.authorName)[0]).to.exist;
    expect(screen.getByText(QUESTION.question)).to.exist;
    expect(screen.getByText(QUESTION.likes)).to.exist;
    expect(screen.getByText(QUESTION.comments.length)).to.exist;
  });

  test('Pictures exists', () => {
    const images = screen.getAllByAltText('bug');
    expect(images).to.exist;
    expect(images.length).toEqual(QUESTION['images'].length);
  });

  test('Comments exists', () => {
    QUESTION.comments.forEach((comment) => {
      expect(screen.getByText(comment.comment)).to.exist;
      expect(screen.getAllByText(comment.username)[0]).to.exist;
      expect(screen.getAllByAltText(`${comment.username} avatar`)[0]).to.exist;
      expect(screen.getByText(comment.date)).to.exist;
    });
  });
});

describe('Test question without pictures', () => {
  beforeEach(() => render(<Question {...QUESTION_WITHOUT_IMAGES} />));

  test('Question data exists', () => {
    expect(
      screen.getAllByAltText(`${QUESTION_WITHOUT_IMAGES.authorName} avatar`)[0]
    ).to.exist;
    expect(screen.getAllByText(QUESTION_WITHOUT_IMAGES.authorName)[0]).to.exist;
    expect(screen.getByText(QUESTION_WITHOUT_IMAGES.question)).to.exist;
    expect(screen.getByText(QUESTION_WITHOUT_IMAGES.likes)).to.exist;
    expect(screen.getByText(QUESTION_WITHOUT_IMAGES.comments.length)).to.exist;
  });

  test('Pictures not exists', () => {
    const images = screen.queryAllByAltText('bug');
    expect(images.length).toEqual(0);
  });

  test('Comments exists', () => {
    QUESTION_WITHOUT_IMAGES.comments.forEach((comment) => {
      expect(screen.getByText(comment.comment)).to.exist;
      expect(screen.getAllByText(QUESTION_WITHOUT_IMAGES.authorName)[0]).to
        .exist;
      expect(screen.getAllByAltText(`${comment.username} avatar`)[0]).to.exist;
      expect(screen.getAllByText(comment.date)[0]).to.exist;
    });
  });
});
