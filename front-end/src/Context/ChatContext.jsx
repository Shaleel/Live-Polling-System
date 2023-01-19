import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

//create a context, with createContext api
export const ChatContext = createContext({
    isChatEnabled: false,
    chats: [],
    showChat: false
});

const ChatContextProvider = (props) => {
    // this state will be shared with all components
    const [chats, setchats] = useState([]);
    const [isChatEnabled, setisChatEnabled] = useState(false);
    const [showChat, setshowChat] = useState(false);
    const socket = useSocket();
    const toggleChatVisibility = () => {
        setshowChat(!showChat);
    };

    useEffect(() => {
        socket.on('chat', (data) => {
            setchats([...chats, data]);
        });

        return () => {
            socket.off('chat');
        };
    });

    const enableChat = () => {
        setisChatEnabled(true);
    };
    return (
        // this is the provider providing state
        <ChatContext.Provider
            value={{
                chats,
                isChatEnabled,
                showChat,
                toggleChatVisibility,
                enableChat,
                setchats
            }}
        >
            {props.children}
        </ChatContext.Provider>
    );
};
export const useChat = () => useContext(ChatContext);
export default ChatContextProvider;
