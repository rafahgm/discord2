import React from 'react';
import { uniqueId } from 'lodash';
import { createUseStyles, useTheme } from 'react-jss';
import chroma from 'chroma-js';
type InputProps = {
    type?: 'text' | 'password' | 'email';
    required?: boolean;
    name?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    value?: string;
};

const useStyles = createUseStyles((theme: AppTheme) => ({
    floatingLabel: {
        position: 'relative',
        marginBottom: '1rem',
        '& > input': {
            padding: '1rem 0.75rem',
            lineHeight: '1.25',
            height: 'calc(3.5rem + 2px)',

            '&:focus, &:not(:placeholder-shown)': {
                paddingTop: '1.625rem',
                paddingBottom: '0.625rem'
            },

            '&:focus + label, &:not(:placeholder-shown) + label': {
                opacity: .75,
                transform: 'scale(.85) translateY(-0.5rem) translateX(0.15rem)'
            }
        },
        '& > label': {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            padding: '1rem 0.75rem',
            pointerEvents: 'none',
            border: '1px solid transparent',
            transformOrigin: '0 0',
            transition: 'opacity .1s ease-in-out, transform .1s ease-in-out'
        }
    },
    label: {
        color: theme.colors.text,
        display: 'block',
    },
    input: {
        padding: '0.375em 0.75em',
        borderRadius: theme.border.radius,
        border: '1px solid transparent',
        outline: 'none',
        lineHeight: '1.5em',
        fontSize: '1rem',
        width: '100%',
        transition: 'border 150ms ease-in-out, box-shadow 150ms ease-in-out',
        '&:focus': {
            border: `1px solid ${theme.colors.primary}`,
            boxShadow: `0 0 0 0.25rem ${chroma(theme.colors.primary).alpha(
                0.25
            )}`,
        },

        '&[type="password"]': {
            fontFamily: 'Verdana',
            letterSpacing: '0.125em'
        }
    },
}));

const Input: React.FC<InputProps> = (props) => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme });
    const id = uniqueId();

    let inputProps: {
        [k: string]: any;
    } = {
        id: id,
        name: props.name,
        required: props.required,
        type: 'text',
        value: props.value,
        onChange: props.onChange
    };

    switch (props.type) {
        case 'password':
            inputProps.type = 'password';

            break;
        case 'email':
            inputProps.type = 'email';
            inputProps = {
                ...inputProps,
                spellCheck: false,
            };
            break;
    }

    if (props.label) {
        return (
            <div className={styles.floatingLabel}>
                <input placeholder=" " className={`${styles.input} ${props.className}`} {...inputProps}  />
                <label htmlFor={id}>{props.label}</label>
            </div>
        );
    }

    return <input placeholder={props.placeholder} className={`${styles.input} ${props.className}`} {...inputProps} onChange={props.onChange} />;
};

export default Input;
