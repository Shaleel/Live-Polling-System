import React from 'react';
import { useState, useEffect } from 'react';
import NameForm from './NameForm';
import './student.css';
import StudentContextProvider, {
    useStudent
} from '../../Context/StudentContext';
import loadingImg from '../../assets/loading.gif';
import { useSocket } from '../../Context/SocketContext';
import { useChat } from '../../Context/ChatContext';
import Room from './Room';
import Students from './Students';
import Chat from '../../components/Chat/index';

const Student = () => {
    const { student, loading } = useStudent();
    return (
        <StudentContextProvider>
            {loading && (
                <img
                    style={{ height: '3rem' }}
                    alt="loading"
                    src={loadingImg}
                />
            )}{' '}
            <Students />
            <Chat type="student" />
        </StudentContextProvider>
    );
};

export default Student;
