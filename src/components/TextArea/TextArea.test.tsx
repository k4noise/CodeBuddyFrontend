import { render, screen } from '@testing-library/react';
import { test, expect, describe } from 'vitest';
import TextArea from './TextArea';

describe('Test textarea', () => {
  test('Textarea exists', async () => {
    render(<TextArea className="a" placeholder="some text" />);
    const textarea = await screen.findByPlaceholderText('some text');
    expect(textarea).toBeInTheDocument();
  });
});
