import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from '@/components/forms/LoginForm';

describe('LoginForm', () => {
  it('renders error messages', async () => {
    const Stub = createRoutesStub([
      {
        path: '/sign-in',
        Component: LoginForm
      }
    ]);

    render(<Stub initialEntries={['/sign-in']} />);

    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(
      await screen.findByText('Invalid email address')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be at least 8 characters')
    ).toBeInTheDocument();
  });

  it('submits form properly', async () => {
    const Stub = createRoutesStub([
      {
        path: '/sign-in',
        Component: LoginForm,
        action() {
          return {
            email: 'test@email.com',
            password: 'password'
          };
        }
      }
    ]);

    render(<Stub initialEntries={['/sign-in']} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'test@email.com', { skipClick: true });
    userEvent.type(passwordInput, 'password', { skipClick: true });

    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must be at least 8 characters')
    ).not.toBeInTheDocument();
  });
});
