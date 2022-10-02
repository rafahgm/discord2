import {  faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import {faFaceSmile} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Input } from '../form';
import Button from '../form/Button';
import styles from './styles.module.scss';

type ChatRoomInputProps = {
    onSubmit?: Function;
};

const ChatRoomInput: React.FC<ChatRoomInputProps> = (props) => {
    const [text, setText] = useState<string>('');

    return (
        <form
            className={styles.container}
            onSubmit={(e) => {
                e.preventDefault();
                if (props.onSubmit) props.onSubmit(text);
                setText('');
            }}
        >
            <div className={styles.chat_input}>
                <FontAwesomeIcon className={styles.emoji} icon={faFaceSmile} />
                <Input
                    placeholder='Digite sua mensagem...'
                    className={styles.input}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
            </div>

            <Button className={styles.button} type='submit'>
                <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
        </form>
    );
};

export default ChatRoomInput;
