import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Footer from './Footer';

describe('Test footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('Logo exists', () => {
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).to.exist;
  });

  test('Privacy link exists', () => {
    const privacyLink = screen.getByText('Политика конфиденциальности');
    expect(privacyLink).to.exist;
  });

  test('Data agreement link exists', () => {
    const dataAgreementLink = screen.getByText(
      'Соглашение на обработку персональных данных'
    );
    expect(dataAgreementLink).to.exist;
  });

  test('Social icons exists', () => {
    const ICONS_ALTS = ['Youtube', 'Facebook', 'Twitter'];
    ICONS_ALTS.forEach((imgAlt) => {
      const socialIcon = screen.getByAltText(imgAlt);
      expect(socialIcon).to.exist;
    });
  });
});
