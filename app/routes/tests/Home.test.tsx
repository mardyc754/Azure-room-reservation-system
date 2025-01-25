import { screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';

import { HomePageButtons } from '@/components/HomePageButtons';

import { renderComponent } from './testingHelpers';

describe('Home', () => {
  it('renders proper buttons when user is not authenticated', () => {
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: HomePageButtons
      }
    ]);

    renderComponent(<Stub />, { isAuthenticated: false });

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
    const Stub = createRoutesStub([
      {
        path: '/',
        Component: HomePageButtons
      }
    ]);

    renderComponent(<Stub />, { isAuthenticated: true });

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
