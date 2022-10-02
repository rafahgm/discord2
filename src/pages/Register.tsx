import React from 'react';
import { createUser } from '../services/firebase';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createUseStyles, useTheme } from 'react-jss';
import { Input } from '../components/form';
import Button from '../components/form/Button';
import chroma from 'chroma-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    form: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: chroma(theme.colors.background).alpha(0.7).hex(),
        padding: '20px 40px 20px 40px',
        backdropFilter: 'blur(8px)',
        width: '25%',
        minWidth: '380px',
        borderRadius: theme.border.radius,
    },
    backButton: {
        color: 'white',
        fontSize: '1rem',
        padding: '0.75rem',
        display: 'flex',
        gap: '10px',
        textDecoration: 'none',
    },
}));
const Register = () => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme });
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        Swal.fire({
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
        event.preventDefault();
        const data = Object.fromEntries(
            new FormData(event.currentTarget).entries()
        );

        createUser(
            data.email.toString(),
            data.password.toString(),
            data.displayName.toString()
        ).then((user) => {
            if (user) {
                Swal.fire({
                    icon: 'success',
                    text: 'Usuário criado com sucesos',
                }).then((result) => {
                    navigate('/login', { replace: true });
                });
            }
        });
    };
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
            className={styles.container}
        >
            <form className={styles.form} onSubmit={handleSubmit}>
                <Link className={styles.backButton} to='/'>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Voltar
                </Link>
                <Input label='E-mail' name='email' type='email' />
                <Input label='Senha' name='password' type='password' />
                <Input label='Nome de usuário' name='displayName' />

                <Button type='submit' size='large' fullWidth>
                    Registrar
                </Button>
            </form>
        </motion.div>
    );
};

export default Register;
