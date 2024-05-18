import { KeyboardEvent } from "react";
import './styles.css';

interface IProps {
    userMessage: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
    isPending: boolean;
    handleSubmit: () => void;
}

const ChatInput = ({
    userMessage,
    handleInputChange,
    handleKeyPress,
    isPending,
    handleSubmit,
  }: IProps) => {
    return (
        <div className='chat-input-container'>
        <input
          type="text"
          value={userMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          disabled={isPending}
          placeholder="Type a message..."
        />
        <button disabled={isPending || !userMessage.trim()} onClick={handleSubmit}>Send</button>
      </div>
    )
}

export default ChatInput;
