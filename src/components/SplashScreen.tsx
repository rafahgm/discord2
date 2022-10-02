import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { ScaleLoader } from 'react-spinners';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
        zIndex: 100
    },
}));

const SplashScreen = () => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme });
    return (
        <AnimatePresence>
            <motion.div
            initial={{opacity: 1}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={styles.container}>
                <ScaleLoader
                    cssOverride={{
                        display: 'block',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    height={60}
                    width={10}
                    color={theme.colors.foreground}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default SplashScreen;
