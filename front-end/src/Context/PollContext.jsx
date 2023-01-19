import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { useStudent } from './StudentContext';

//create a context, with createContext api
export const PollContext = createContext({ live: false });

const PollContextProvider = (props) => {
    // this state will be shared with all components
    const [currentPoll, setcurrentPoll] = useState(null);
    const [results, setresults] = useState(null);
    const { student } = useStudent();
    const socket = useSocket();
    useEffect(() => {
        socket.on('new-question', (data) => {
            setcurrentPoll(data);
            if (results) setresults(null);
        });

        socket.on('reveal-result', (data) => {
            setcurrentPoll(null);

            setresults(data);
        });

        return () => {
            socket.off('new-question');
            socket.off('reveal-result');
        };
    }, []);

    const emptyResults = () => {
        setresults(null);
    };

    return (
        // this is the provider providing state
        <PollContext.Provider value={{ currentPoll, results, emptyResults }}>
            {props.children}
        </PollContext.Provider>
    );
};
export const usePoll = () => useContext(PollContext);
export default PollContextProvider;
