import { getAuth } from 'firebase/auth';
import React, { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authProvider';
import { app } from '../services/firebase';
import SplashScreen from "./SplashScreen";

const SecureRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { state, dispatch } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = getAuth(app).onAuthStateChanged((user) => {
            if (user) {
                dispatch({
                    type: 'LOGIN',
                    payload: user,
                });
            }else {
                navigate('/', {replace: true});
            }
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch, navigate]);

    return state.user !== undefined ? children : <SplashScreen />;
};

export default SecureRoute;