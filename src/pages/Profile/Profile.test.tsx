import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';
import { ProfileType, Mentor, Student } from '../../types';

describe('Test student profile', () => {
  const student: Student = {
    type: ProfileType.STUDENT,
    login: 'johndoe',
    username: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.png',
    tgId: '@id',
  };

  it('Exist profile avatar and form', () => {
    render(
      <MemoryRouter>
        <Profile isMine={true} userInfo={student} />
      </MemoryRouter>
    );
    const avatarElement = screen.getByAltText('avatar');
    const profileForm = screen.getByTestId('profileForm');
    expect(avatarElement).toBeInTheDocument();
    expect(profileForm).toBeInTheDocument();
  });

  it('Exist user info in form', () => {
    render(
      <MemoryRouter>
        <Profile isMine={true} userInfo={student} />
      </MemoryRouter>
    );

    const userTypeField = screen.getByDisplayValue(student.type);
    expect(userTypeField).toBeInTheDocument();
    expect(userTypeField).toHaveAttribute('readonly');

    const loginField = screen.getByDisplayValue(student.login);
    expect(loginField).toBeInTheDocument();
    expect(loginField).toHaveAttribute('readonly');

    const usernameSpan = screen.getByText(student.username);
    expect(usernameSpan).toBeInTheDocument();

    const emailField = screen.getByDisplayValue(student.email);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('readonly');

    const tgField = screen.getByDisplayValue(student.tgId);
    expect(tgField).toBeInTheDocument();
    expect(tgField).toHaveAttribute('readonly');
  });

  it('Work edit profile mode', () => {
    const { container } = render(
      <MemoryRouter>
        <Profile isMine={true} isEdit={true} userInfo={student} />
      </MemoryRouter>
    );

    const passwordField = container.querySelectorAll('input[type="password"]');
    expect(passwordField.length).toBe(2);
  });

  it("Don't work edit with someone profile", () => {
    const { container } = render(
      <MemoryRouter>
        <Profile isMine={false} isEdit={true} userInfo={student} />
      </MemoryRouter>
    );

    const passwordField = container.querySelectorAll('input[type="password"]');
    expect(passwordField).toBeNull;
  });

  it('Exist someone profile data', () => {
    render(
      <MemoryRouter>
        <Profile isMine={false} userInfo={student} />
      </MemoryRouter>
    );

    const userTypeField = screen.getByDisplayValue(student.type);
    expect(userTypeField).toBeInTheDocument();
    expect(userTypeField).toHaveAttribute('readonly');

    const loginField = screen.queryByDisplayValue(student.login);
    expect(loginField).not.toBeInTheDocument();

    const usernameSpan = screen.getByText(student.username);
    expect(usernameSpan).toBeInTheDocument();

    const emailField = screen.getByDisplayValue(student.email);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('readonly');

    const tgField = screen.getByDisplayValue(student.tgId);
    expect(tgField).toBeInTheDocument();
    expect(tgField).toHaveAttribute('readonly');
  });
});

describe('Mentor profile', () => {
  const mentor: Mentor = {
    type: ProfileType.MENTOR,
    login: 'johndoe',
    username: 'John Doe',
    email: 'john@example.com',
    avatar: 'avatar.png',
    tgId: '@id',
    tags: ['1', '2', '3'],
  };

  it('Exist profile avatar and form', () => {
    render(
      <MemoryRouter>
        <Profile isMine={true} userInfo={mentor} />
      </MemoryRouter>
    );
    const avatarElement = screen.getByAltText('avatar');
    const profileForm = screen.getByTestId('profileForm');
    expect(avatarElement).toBeInTheDocument();
    expect(profileForm).toBeInTheDocument();
  });

  it('Exist user info in form', () => {
    render(
      <MemoryRouter>
        <Profile isMine={true} userInfo={mentor} />
      </MemoryRouter>
    );

    const userTypeField = screen.getByDisplayValue(mentor.type);
    expect(userTypeField).toBeInTheDocument();
    expect(userTypeField).toHaveAttribute('readonly');

    const loginField = screen.getByDisplayValue(mentor.login);
    expect(loginField).toBeInTheDocument();
    expect(loginField).toHaveAttribute('readonly');

    const usernameSpan = screen.getByText(mentor.username);
    expect(usernameSpan).toBeInTheDocument();

    const emailField = screen.getByDisplayValue(mentor.email);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('readonly');

    const tgField = screen.getByDisplayValue(mentor.tgId);
    expect(tgField).toBeInTheDocument();
    expect(tgField).toHaveAttribute('readonly');

    mentor.tags.forEach((tag) => {
      const tagElement = screen.getByText(tag);
      expect(tagElement).toBeInTheDocument();
    });
  });

  it('Work edit profile mode', () => {
    const { container } = render(
      <MemoryRouter>
        <Profile isMine={true} isEdit={true} userInfo={mentor} />
      </MemoryRouter>
    );

    const passwordField = container.querySelectorAll('input[type="password"]');
    expect(passwordField.length).toBe(2);
  });

  it("Don't work edit with someone profile", () => {
    const { container } = render(
      <MemoryRouter>
        <Profile isMine={false} isEdit={true} userInfo={mentor} />
      </MemoryRouter>
    );

    const passwordField = container.querySelectorAll('input[type="password"]');
    expect(passwordField).toBeNull;
  });

  it('Exist someone profile data', () => {
    render(
      <MemoryRouter>
        <Profile isMine={false} userInfo={mentor} />
      </MemoryRouter>
    );

    const userTypeField = screen.getByDisplayValue(mentor.type);
    expect(userTypeField).toBeInTheDocument();
    expect(userTypeField).toHaveAttribute('readonly');

    const loginField = screen.queryByDisplayValue(mentor.login);
    expect(loginField).not.toBeInTheDocument();

    const usernameSpan = screen.getByText(mentor.username);
    expect(usernameSpan).toBeInTheDocument();

    const emailField = screen.getByDisplayValue(mentor.email);
    expect(emailField).toBeInTheDocument();
    expect(emailField).toHaveAttribute('readonly');

    const tgField = screen.getByDisplayValue(mentor.tgId);
    expect(tgField).toBeInTheDocument();
    expect(tgField).toHaveAttribute('readonly');
  });
});
