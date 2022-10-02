import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createUseStyles } from 'react-jss';
import { motion } from 'framer-motion';
import chroma from 'chroma-js';

import { useAuthContext } from '../context/authProvider';
import { loginUser } from '../services/firebase';
import { Input } from '../components/form';
import Button from '../components/form/Button';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    form: {
        backgroundColor: chroma(theme.colors.background).alpha(0.7).hex(),
        padding: '40px 40px 20px 40px',
        backdropFilter: 'blur(8px)',
        width: '25%',
        minWidth: '380px',
        borderRadius: theme.border.radius,
    },
    link: {
        color: theme.colors.foreground,
        textAlign: 'center',
        display: 'block',
        marginTop: '20px',
    },
}));

const Login = () => {
    const { dispatch } = useAuthContext();
    const styles = useStyles();
    const navigate = useNavigate();

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        Swal.fire({
            allowOutsideClick: false,
            heightAuto: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const formData = Object.fromEntries(
            new FormData(event.currentTarget).entries()
        );

        loginUser(formData.email.toString(), formData.password.toString()).then(
            (user) => {
                if (user) {
                    dispatch({ type: 'LOGIN', payload: user });
                    Swal.close();
                    navigate('/app', { replace: true });
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'Houve um erro desconhecido. Por favor tente novamente mais tarde.',
                    });
                }
            }
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            className={styles.container}
        >
            <form className={styles.form} onSubmit={handleLogin}>
                <Input type='email' name='email' label='E-mail' required />
                <Input type='password' name='password' label='Senha' required />
                <Button type='submit' size='large' fullWidth>
                    Login
                </Button>
                <Link className={styles.link} to='register' >
                    Crie sua conta
                </Link>
            </form>
        </motion.div>
    );
};

export default Login;
