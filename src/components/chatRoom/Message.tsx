import { motion } from 'framer-motion';
import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        backgroundColor: (props: MessageProps) =>
            props.self ? theme.colors.primary : 'white',
        color: ({ self }: MessageProps) =>
            self ? 'white' : theme.colors.background,
        padding: '20px',
        borderRadius: theme.border.radius,
        width: 'fit-content',
        maxWidth: '400px',
        alignSelf: (props: MessageProps) => (props.self ? 'end' : 'start'),
    },
}));

type MessageProps = {
    text: string;
    self?: boolean;
    firstRender?: boolean;
};

const Message: React.FC<MessageProps> = (props) => {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme, ...props });
    const variants = {
        in: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        out: {
            opacity: 0,
            x: props.self ? '100%' : '-100%',
            scale: 0.5,
        },
    };
    return (
        <motion.div
            variants={variants}
            initial='out'
            animate='in'
            transition={{ duration: props.firstRender ? 0 : 0.25 }}
            className={styles.container}
        >
            {props.text}
        </motion.div>
    );
};

Message.defaultProps = {
    self: false,
};

export default Message;
