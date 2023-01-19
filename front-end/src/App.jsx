import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
import { Toaster } from 'react-hot-toast';
import SocketContextProvider from './Context/SocketContext';
import ChatContextProvider from './Context/ChatContext';
import Chat from './components/Chat';
import StudentContextProvider from './Context/StudentContext';
import Room from './pages/Student/Room';

function App() {
    return (
        <SocketContextProvider>
            <ChatContextProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/teacher" element={<Teacher />} />
                        <Route path="/student" element={<Student />} />
                        {sessionStorage.getItem('student-id') && (
                            <Route path="/room" element={<Room />} />
                        )}
                        {/* Fallback Condition */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Toaster />
                </BrowserRouter>
            </ChatContextProvider>
        </SocketContextProvider>
    );
}

export default App;
