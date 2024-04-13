import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Logo from './Logo';

describe('Test logo', () => {
  beforeEach(() => {
    render(<Logo />);
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
