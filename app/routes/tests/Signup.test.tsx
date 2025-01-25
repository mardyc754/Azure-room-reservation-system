import { createRoutesStub } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from '@/components/forms/SignupForm';

describe('SignupForm', () => {
  it('renders error messages', async () => {
    const Stub = createRoutesStub([
      {
        path: '/sign-up',
        Component: SignupForm
      }
    ]);

    render(<Stub initialEntries={['/sign-up']} />);

    userEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(
      await screen.findByText('Username must be at least 3 characters')
    ).toBeInTheDocument();

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
        path: '/sign-up',
        Component: SignupForm
      }
    ]);

    render(<Stub initialEntries={['/sign-up']} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    userEvent.type(emailInput, 'test@email.com', { skipClick: true });
    userEvent.type(passwordInput, 'password', { skipClick: true });

    userEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    expect(
      screen.queryByText('Username must be at least 3 characters')
    ).not.toBeInTheDocument();

    expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Password must be at least 8 characters')
    ).not.toBeInTheDocument();
  });
});
