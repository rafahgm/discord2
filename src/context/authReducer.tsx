import { User } from 'firebase/auth';
import { logout } from '../services/firebase';
import { AuthState } from './authProvider';

export type AuthAction =
    | {
          type: 'LOGIN';
          payload: User;
      }
    | {
          type: 'LOGOUT';
      };

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            const user: DiscordUser = {
                displayName: action.payload.displayName ?? "Usuário do Discord2",
                email: action.payload.email,
                uid: action.payload.uid
            }
            return {
                user: user,
            };
        case 'LOGOUT':
            // TODO: Logout
            logout();
            return {
                user: undefined
            };
        default:
            return state;
    }
};
