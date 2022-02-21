import React from 'react'
import { AuthContext } from 'contexts/auth';

export const useAuth = () => React.useContext(AuthContext)