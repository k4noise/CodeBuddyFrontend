import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Comments, { CommentData } from './Comments';

const comments: CommentData[] = [
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
];

describe('Test comments', () => {
  beforeEach(() => {
    render(<Comments comments={comments} />);
  });

  it('Comments exists', () => {
    const renderedComments = screen.getAllByTestId('comment');
    renderedComments.forEach((comment) => expect(comment).toBeInTheDocument());
  });

  it('Send comment form exists', () => {
    const form = screen.getByTestId('sendComment');
    expect(form).toBeInTheDocument();

    const avatar: HTMLImageElement | null = form.querySelector(
      '.question__comments-form-avatar'
    );
    expect(avatar).toBeInTheDocument();

    const username: HTMLSpanElement | null = form.querySelector(
      '.question__comments-form-name'
    );
    expect(username).toBeInTheDocument();
  });
});
