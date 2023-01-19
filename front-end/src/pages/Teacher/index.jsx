import React from 'react';
import { useEffect } from 'react';
import LiveResults from '../../components/LivePoll/LiveResults';
import { useChat } from '../../Context/ChatContext';
import { useSocket } from '../../Context/SocketContext';
import PollForm from './PollForm';
import TeacherContextProvider from '../../Context/TeacherContext';
import PreviousPolls from './PreviousPolls';
import Chat from '../../components/Chat/index';

const Teacher = () => {
    const socket = useSocket();
    const { enableChat, isChatEnabled } = useChat();
    useEffect(() => {
        socket.on('connect', () => {
            console.log('teacher connected');
            enableChat();
        });

        return () => {
            socket.off('connect');
        };
    }, []);
    return (
        <TeacherContextProvider>
            <PollForm />
            <LiveResults />
            <PreviousPolls />
            <Chat />
        </TeacherContextProvider>
    );
};

export default Teacher;
