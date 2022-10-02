import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import { AnimatePresence } from 'framer-motion';

import { AuthProvider } from './context/authProvider';
import SecureRoute from './components/SecureRoute';
import theme from './theme';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

const AnimatedRoutes = () => {
    const location = useLocation();
    const pathname = location.pathname.split('/')[0];
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={pathname}>
                <Route path='/*' element={<LandingPage />} />
                <Route
                    path='/app'
                    element={
                        <SecureRoute>
                            <Home />
                        </SecureRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <BrowserRouter>
                    <AnimatedRoutes />
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
