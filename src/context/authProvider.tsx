import React, { createContext, useContext, useReducer } from 'react';
import { AuthAction, authReducer } from './authReducer';

export interface AuthState {
    user?: DiscordUser;
}

interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const defaultAuthState: AuthState = {
    user: undefined,
};

const authContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(authReducer, defaultAuthState);
    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(authContext);
};
