import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import Request from './Request';
import { ProfileType, RequestType } from '../../types';
import { MemoryRouter } from 'react-router-dom';

const REQUEST_MENTOR_DATA = {
  profileType: ProfileType.MENTOR,
  username: 'Петр Петров',
  avatarUrl: '/avatar',
  status: RequestType.NEW,
};

const REQUEST_STUDENT_DATA = {
  profileType: ProfileType.STUDENT,
  username: 'Петр Петров',
  avatarUrl: '/avatar',
  status: RequestType.ACCEPTED,
};

describe('Test request', () => {
  test('Mentor info exists', () => {
    render(<Request {...REQUEST_MENTOR_DATA} />);
    const avatar = screen.getByAltText(
      `${REQUEST_MENTOR_DATA.username} avatar`
    );
    const username = screen.getByText(REQUEST_MENTOR_DATA.username);
    const status = screen.getByText(REQUEST_MENTOR_DATA.status);
    const acceptButton = screen.getByTestId('accept');
    const rejectButton = screen.getByTestId('reject');

    expect(avatar).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();
  });

  test('Student info exists', () => {
    render(
      <MemoryRouter>
        <Request {...REQUEST_STUDENT_DATA} />
      </MemoryRouter>
    );
    const avatar = screen.getByAltText(
      `${REQUEST_STUDENT_DATA.username} avatar`
    );
    const username = screen.getByText(REQUEST_STUDENT_DATA.username);
    const status = screen.getByText(REQUEST_STUDENT_DATA.status);
    const profileLink = screen.getByTestId('profileLink');
    const cancelButton = screen.getByTestId('cancel');

    expect(avatar).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
});
