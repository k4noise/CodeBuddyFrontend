import { render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from 'vitest';
import Footer from './Footer';
import { MemoryRouter } from 'react-router-dom';

describe('Test footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test('Logo exists', () => {
    const logoElement = screen.getByTestId('logo');
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
    const iconsWrapper = screen.getAllByTestId('socialIcons');
    expect(iconsWrapper).to.exist;
  });
});
