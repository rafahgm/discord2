import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo, useRef } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useAuthContext } from '../../context/authProvider';
import { subscribeMessages } from '../../services/firebase';
import Message from './Message';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const useStyles = createUseStyles((theme: AppTheme) => ({
    messages: {
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '10px 20px 0 10px',
        display: 'flex',
        flexDirection: 'column',

        '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },

        '& .simplebar-scrollbar::before': {
            backgroundColor: theme.colors.primary,
        },

        '& .simplebar-scrollbar.simplebar-visible:before': {
            opacity: 1,
        },
    },
}));

const useFirstRender = () => {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
};

<<<<<<< HEAD
const MessagesDisplay: React.FC<{ messages: Message[] }> = (props) => {
=======
const MessagesDisplay: React.FC<{messages: Message[]}> = ({messages}) => {
>>>>>>> f4e7660caf704cc9d3f7153f82684019cce8a117
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme });
    const { state } = useAuthContext();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const firstRender = useFirstRender();

    useEffect(() => {
<<<<<<< HEAD
        console.log(firstRender);
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
=======
        if (messagesEndRef.current){
            if(firstRender) {
                messagesEndRef.current.scrollIntoView();
            }else {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
>>>>>>> f4e7660caf704cc9d3f7153f82684019cce8a117
        }
    }, [messages]);

    return (
        <SimpleBar className={styles.messages}>
            <AnimatePresence>
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        text={msg.text}
                        self={msg.user.uid === state.user?.uid}
                        firstRender={firstRender}
                    />
                ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
        </SimpleBar>
    );
};

export default MessagesDisplay;
