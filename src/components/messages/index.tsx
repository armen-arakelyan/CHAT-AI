import React from 'react';
import { IMessage } from '../../types';
import './styles.css';

interface IProps {
  messages: IMessage[];
}

const MessageList: React.FC<IProps> = ({ messages }) => (
    <div className="messages">
        {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`}>
            {msg.text}
        </div>
        ))}
    </div>
);

export default MessageList;
