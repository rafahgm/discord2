import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createUseStyles } from 'react-jss';
import SplashScreen from '../components/SplashScreen';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

const useStyles = createUseStyles((theme: AppTheme) => ({
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'blur(3px)',
        transform: 'scale(1.1)',
    },
    container: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
    },
}));

const LandingPage = () => {
    const [isLoading, setLoading] = useState<boolean>(true);
    const styles = useStyles();
    const location = useLocation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.container}
        >
            <AnimatePresence>
                <img
                    className={styles.backgroundImage}
                    alt=''
                    onLoad={() => setLoading(false)}
                    key='backgroundimage'
                    src='https://source.unsplash.com/random/?city,night'
                />
                <Routes location={location} key={'/'}>
                    <Route index element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Routes>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        key='splashscreeen'
                    >
                        <SplashScreen />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default LandingPage;
