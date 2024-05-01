import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import MentorCard from './MentorCard';

const MENTOR = {
  username: 'John Doe',
  avatarUrl: '/23dg8dk.png',
  about: 'About me',
  tags: ['web', 'js', 'ts'],
};

describe('Test mentor card', () => {
  render(<MentorCard {...MENTOR} />);
  test('Mentor info exists', () => {
    expect(screen.getByText(MENTOR.username)).toBeInTheDocument();
    expect(screen.getByRole('img')?.src).toMatch(MENTOR.avatarUrl);
    expect(screen.getByDisplayValue(MENTOR.about)).toBeInTheDocument();
    expect(screen.getByTestId('tags')).toBeInTheDocument();
  });
});
