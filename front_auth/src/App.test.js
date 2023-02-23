import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const inputUsuario = screen.getByTestId("usuario-input");
  expect(inputUsuario).toBeInTheDocument();
  expect(inputUsuario).toHaveAttribute("type", "text");
  const inputPassword = screen.getByTestId("password-input");
  expect(inputPassword).toBeInTheDocument();
  expect(inputPassword).toHaveAttribute("type", "password");
});
