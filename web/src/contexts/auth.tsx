import React from 'react'
import auth from 'services/auth';

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

interface Props {
	children: React.ReactNode
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);

  const signin = (newUser: string, callback: VoidFunction) => {
    return auth.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return auth.signout(() => {
      setUser(null);
      callback();
    });
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
