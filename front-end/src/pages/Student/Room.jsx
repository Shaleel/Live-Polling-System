import React, { useEffect } from 'react';
import { useState } from 'react';
import constants from '../../constants';
import { useChat } from '../../Context/ChatContext';
import { useSocket } from '../../Context/SocketContext';
import { useStudent } from '../../Context/StudentContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../../assets/loading.gif';
import LivePoll from '../../components/LivePoll';
import PollContextProvider from '../../Context/PollContext';
import Results from '../../components/LivePoll/Results';
const Room = () => {
    const { student, setstudent } = useStudent();
    const { enableChat } = useChat();
    const socket = useSocket();
    const navigate = useNavigate();
    useEffect(() => {
        enableChat();

        let studentResponse = null;

        if (student || studentResponse) {
            socket.on('connect', () => {
                console.log('student connected');
                enableChat();
            });

            return () => {
                socket.off('connect');
            };
        }
    }, [student]);
    return (
        <PollContextProvider>
            <div>
                <h2>Hello {student?.name}!</h2>
                <p>
                    <img src={loadingGif} style={{ height: '1rem' }}></img>{' '}
                    Waiting for the teacher to create a poll
                </p>
                <LivePoll />
                <Results />
            </div>
        </PollContextProvider>
    );
};

export default Room;
