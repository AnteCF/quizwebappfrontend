import React from 'react';
import { Button, Card, List, Rating, Typography } from '@mui/material';

const MessageReceived = (props) => {
    return (
            <Card>
                <Typography variant='h5'>{props.from}</Typography>
                <Typography variant='h2'>{props.text}</Typography>
            </Card>
    );
};

const ChatMessagesPlaceholder = (props) => {
    return (
        <>
            <h2>Messages:</h2>
            {props.messagesReceived
                .filter(message => message.from !== props.username)
                .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </>
    );
}

export default ChatMessagesPlaceholder;