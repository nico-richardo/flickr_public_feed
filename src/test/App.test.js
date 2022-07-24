import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders home', () => {
  render(<App />);
  const homeElement = screen.getAllByText("Gallery");
  expect(homeElement[0]).toBeInTheDocument();
});
