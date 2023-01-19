import React from 'react';
import './header.css';
import Logo from '../../assets/logointervue.png';
import chatIcon from '../../assets/chat.svg';
import { useChat } from '../../Context/ChatContext';
const Header = () => {
    const { isChatEnabled, toggleChatVisibility } = useChat();
    return (
        <div className="header-wrapper">
            <img src={Logo} />

            {isChatEnabled && (
                <button onClick={toggleChatVisibility}>
                    <img className="chat-icon" src={chatIcon} />
                </button>
            )}
        </div>
    );
};

export default Header;
