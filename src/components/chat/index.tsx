import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { IMessage } from '../../types';
import './styles.css';
import ChatInput from '../chat-input';
import MessageList from '../messages';
import { botTimeOut } from '../../utils';

const Chat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isPending, setIsPending] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  }, []);

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;
    const trimmedMessage = userMessage.trim();
    const newUserMessage: IMessage = { text: trimmedMessage, type: 'user' };
    setIsPending(true);

    try {
      const result = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: trimmedMessage }],
      }, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
      });

      const botMessageContent = result.data.choices[0].message.content;
      const botMessage: IMessage = { text: '', type: 'bot' };
      setMessages(prevMessages => [...prevMessages, newUserMessage, botMessage]);

      botTimeOut(botMessageContent, (currentText) => {
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].text = currentText;
          return newMessages;
        });
      });
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        newUserMessage,
        { text: "Failed to fetch response.", type: 'bot' }
      ]);
    } finally {
      setIsPending(false);
      setUserMessage('');
    }
  };

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isPending) {
      handleSubmit();
    }
  }, [handleSubmit, isPending]);

    return (
        <div className="chat-container">
          <MessageList messages={messages} />
          <ChatInput
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress} 
            handleSubmit={handleSubmit}
            isPending={isPending}
            userMessage={userMessage}
          />
      </div>
    )
}

export default Chat;