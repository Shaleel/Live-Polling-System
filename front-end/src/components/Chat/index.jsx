import React from 'react';
import { useRef } from 'react';
import { useChat } from '../../Context/ChatContext';
import { useSocket } from '../../Context/SocketContext';
import './chat.css';
import { format } from 'timeago.js';
const Chat = ({ type }) => {
    const { chats, isChatEnabled, showChat, toggleChatVisibility, setchats } =
        useChat();
    const socket = useSocket();
    const inputRef = useRef(null);
    const submitHandler = (e) => {
        e.preventDefault();

        let senderName =
            type === 'student'
                ? sessionStorage.getItem('student-name')
                : 'Host';
        socket.emit('chat', {
            sender: senderName,
            message: inputRef.current.value,
            createdAt: new Date()
        });

        inputRef.current.value = '';
    };
    if (!isChatEnabled) return <></>;
    return (
        <div className={`chat-wrapper ${showChat && 'show-chat'}`}>
            <h2>Chat</h2>
            <button onClick={toggleChatVisibility} className="close-btn">
                ✕
            </button>

            <div className="chat-list">
                {chats.length ? (
                    chats.map((chat, index) => (
                        <div key={index}>
                            <div className="chat-area">
                                <span className="chat-header">
                                    {chat.sender} :{' '}
                                </span>
                                <span className="chat-message">
                                    {chat.message}
                                </span>
                            </div>
                            <span className="chat-time">
                                {format(chat.createdAt)}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No chats as of now</p>
                )}
            </div>

            <form onSubmit={submitHandler} className="chat-input">
                <input ref={inputRef} placeholder="Enter Message" />
                <button className="cta">Send</button>
            </form>
        </div>
    );
};

export default Chat;
