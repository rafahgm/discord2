import React from 'react';
import { useTheme } from 'react-jss';
import { HashLoader } from 'react-spinners';


const Loader = () => {
    const theme = useTheme<AppTheme>();
    return (
        <div style={{width: '100%'}}>
            <HashLoader
                cssOverride={{
                    display: 'block',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                color={theme.colors.primary}
            />
        </div>
    );
};

export default Loader;
