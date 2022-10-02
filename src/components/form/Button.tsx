import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import chroma from 'chroma-js';

interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit';
    size?: 'normal' | 'small' | 'large';
    fullWidth?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyles = createUseStyles((theme: AppTheme) => ({
    button: {
        margin: '0.25rem 0.125rem',
        padding: (props: ButtonProps) => {
            switch (props.size) {
                case 'large':
                    return '0.5rem 1rem';
                case 'normal':
                    return '0.375rem 0.75rem';
                case 'small':
                    return '0.25rem 0.5rem';
            }
        },
        fontSize: (props: ButtonProps) => {
            switch (props.size) {
                case 'large':
                    return '1.2rem';
                case 'normal':
                    return '1rem';
                case 'small':
                    return '0.875rem';
            }
        },
        lineHeight: 1.5,
        textAlign: 'center',
        textDecoration: 'none',
        verticalAlign: 'middle',
        display: 'block',
        width: (props: ButtonProps) => (props.fullWidth ? '100%' : 'auto'),
        borderRadius: theme.border.radius,
        backgroundColor: theme.colors.primary,
        color: theme.colors.foreground,
        cursor: 'pointer',
        border: '1px solid transparent',
        transition: 'background-color 150ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        '&:hover': {
            backgroundColor: chroma(theme.colors.primary).darken(0.4).hex(),
        },
        '&:active': {
            backgroundColor: chroma(theme.colors.primary).brighten(0.4).hex(),
        },
    },
}));

const Button: React.FC<ButtonProps> = (props) => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme, ...props });

    return <button type={props.type} className={`${styles.button} ${props.className}`} onClick={props.onClick}>{props.children}</button>;
};

Button.defaultProps = {
    type: 'button',
    size: 'normal',
};

export default Button;
