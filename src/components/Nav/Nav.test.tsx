import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Nav from './Nav';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const LINKS = [
  { text: 'link1', href: '/link1' },
  { text: 'link2', href: '/link2' },
];

const BUTTONS_TEXTS = ['Регистрация', 'Вход'];

describe('Test nav with auth buttons', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Nav links={LINKS} hasAuthButtons={true} />
      </MemoryRouter>
    );
  });

  test('Logo exists', () => {
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('Links exists', () => {
    LINKS.forEach(({ text, href }) => {
      const linkElement: HTMLLinkElement = screen.getByText(text);
      const trimmedUrl = linkElement.href.replace(/^(?:\/\/|[^/]+)*\//, '/');
      expect(linkElement).toBeInTheDocument();
      expect(trimmedUrl).toEqual(href);
    });
  });

  test('Buttons exists', () => {
    BUTTONS_TEXTS.forEach((text) => {
      const buttonElement = screen.getByText(text);
      expect(buttonElement).toBeInTheDocument();
    });
  });
});

describe('Test nav without auth buttons', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Nav links={LINKS} hasAuthButtons={false} />
      </MemoryRouter>
    );
  });

  test('Logo exists', () => {
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('Links exists', () => {
    LINKS.forEach(({ text, href }) => {
      const linkElement: HTMLLinkElement = screen.getByText(text);
      const trimmedUrl = linkElement.href.replace(/^(?:\/\/|[^/]+)*\//, '/');
      expect(linkElement).toBeInTheDocument();
      expect(trimmedUrl).toEqual(href);
    });
  });

  test('Buttons not exists', () => {
    BUTTONS_TEXTS.forEach((text) => {
      const buttonElement = screen.queryByText(text);
      expect(buttonElement).not.toBeInTheDocument();
    });
  });
});
