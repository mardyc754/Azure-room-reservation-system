import { screen } from '@testing-library/react';
import Home from '../Home';

import { renderComponent } from './testingHelpers';

vi.mock('react-router', async () => {
  const module = await vi.importActual('react-router');
  return {
    ...module,
    Form: ({ children }: { children: React.ReactNode }) => (
      <form>{children}</form>
    )
  };
});

describe('Home', () => {
  it('renders proper buttons when user is not authenticated', () => {
    renderComponent(<Home />, { isAuthenticated: false });

    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: 'Book a room' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Your reservations' })
    ).not.toBeInTheDocument();
  });

  it('renders proper buttons when user is authenticated', () => {
    renderComponent(<Home />, { isAuthenticated: true });

    expect(
      screen.queryByRole('button', { name: 'Sign in' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Sign up' })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Book a room' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Your reservations' })
    ).toBeInTheDocument();
  });
});
