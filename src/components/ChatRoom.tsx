import React from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import { useAuthContext } from '../context/authProvider';

import { getMessages, sendMessage } from '../services/firebase';
import ChatRoomInput from './chatRoom/ChatRoomInput';
import MessagesDisplay from './chatRoom/MessagesDisplay';

const useStyles = createUseStyles((theme: AppTheme) => ({
    container: {
        backgroundColor: theme.colors.background,
        height: '100vh',
        maxHeight: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr auto',
    },
    input: {
        padding: '0.375em 0.75em',
        fontSize: '1rem',
        borderRadius: theme.border.radius,
        border: '1px solid transparent',
        outline: 'none',
    },
    button: {
        borderRadius: '50%',
        border: '1px solid transparent',
        backgroundColor: theme.colors.primary,
        color: theme.colors.foreground,
    },
    messages: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
        gap: '20px',
        padding: '10px 10px 0 10px',
    },
}));

function useMessages() {
    const [messages, setMessages] = React.useState<Message[]>([]);

    React.useEffect(() => {
        const unsubscribe = subscribeMessages(setMessages);
        return unsubscribe;
    }, []);

    return messages;
}

function ChatRoom() {
    const theme = useTheme<AppTheme>();
    const styles = useStyles({ theme });
    const { state } = useAuthContext();

    /* É necessário realizar um pre-fetch das mensagens, para que o MessagesDisplay seja somente atualizado quando
    quando novas mensagens chegarem. Se não o elemento MessageDisplay é renderizando com messages sendo [] e
    depois renderizado novamente com as mensagens do Firebase. Isso atrapalha o controle das animações
    */
    const messages = useMessages();

    return (
        <div className={styles.container}>
            {messages.length > 0 ? (
                <MessagesDisplay messages={messages} />
            ) : (
                <Loader />
            )}

            <ChatRoomInput
                onSubmit={(text: string) => {
                    if (text.length !== 0 && state.user) {
                        const message: Message = {
                            text: text,
                            user: state.user,
                        };
                        sendMessage(message);
                    }
                }}
            />
        </div>
    );
}

export default ChatRoom;
