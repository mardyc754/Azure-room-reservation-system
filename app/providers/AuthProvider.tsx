import { createContext, useContext, type ContextType } from 'react';

import type { User } from '@/db/schema';

const AuthContext = createContext<
  | { currentUser: Pick<User, 'id' | 'email' | 'username'> | undefined }
  | undefined
>(undefined);

type AuthContextType = ContextType<typeof AuthContext>;

export const AuthProvider = ({
  children,
  currentUser
}: {
  children: React.ReactNode;
} & AuthContextType) => {
  return <AuthContext value={{ currentUser }}>{children}</AuthContext>;
};

export const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
