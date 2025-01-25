import { AuthProvider } from '@/providers/AuthProvider';
import { render, type RenderOptions } from '@testing-library/react';

export function renderComponent(
  component: React.ReactNode,
  options: Omit<RenderOptions, 'wrapper'> & { isAuthenticated: boolean } = {
    isAuthenticated: false
  }
) {
  const { isAuthenticated, ...renderOptions } = options;

  return render(component, {
    ...renderOptions,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <AuthProvider
        currentUser={
          isAuthenticated
            ? {
                id: 1,
                username: 'test',
                email: 'test@email.com'
              }
            : undefined
        }
      >
        {children}
      </AuthProvider>
    )
  });
}
