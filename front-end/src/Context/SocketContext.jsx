import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

import io from 'socket.io-client';
import constants from '../constants';

// TODO change backend URL
const socket = io.connect(constants.BACKEND_URL);
//create a context, with createContext api
export const SocketContext = createContext({ socket: socket });

const SocketContextProvider = (props) => {
    useEffect(() => {
        socket.on('connect_error', (err) => {
            toast.error('Unable to connect to the server');
        });

        return () => {
            socket.off('connect_error');
        };
    }, []);

    return (
        // this is the provider providing state
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
};
export const useSocket = () => useContext(SocketContext);
export default SocketContextProvider;
