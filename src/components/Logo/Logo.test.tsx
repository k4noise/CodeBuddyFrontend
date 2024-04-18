import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Logo from './Logo';
import { MemoryRouter } from 'react-router-dom';

describe('Test logo', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
  });

  test('Logo exists', () => {
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).to.exist;

    const linkElement = logoElement.parentElement;
    const trimmedUrl = linkElement?.href.replace(/^(?:\/\/|[^/]+)*\//, '/');
    expect(linkElement?.tagName).toEqual('A');
    expect(trimmedUrl).toEqual('/');
  });
});
