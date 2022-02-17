import React from 'react'
import { AuthContext } from 'contexts/auth';

export const useAuth = () => {
  return React.useContext(AuthContext);
}