import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ user: { items: [] } }),
  })
) as jest.Mock;

describe('App', () => {
  it('renders submit button', () => {
    render(<App />);
    const btnText = screen.getByText(/Search/i);
    expect(btnText).toBeInTheDocument();
  });

  it('return user state when the response is resolved', () => {
    const { container } = render(<App />);
    const input = container.querySelector('input');
    input?.setAttribute('value', 'toto');
    const button = container.querySelector('button');
    expect(button?.type).toBe('submit');
    if (input) fireEvent.change(input);
    if (button) fireEvent.click(button);
    expect(input?.getAttribute('value')).toBe('toto');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
