import { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';

//create a context, with createContext api
export const TeacherContext = createContext({ realtimeResults: null });

const TeacherContextProvider = (props) => {
    // this state will be shared with all components
    const socket = useSocket();
    const [realtimeResults, setrealtimeResults] = useState(null);
    const [showPrevPolls, setshowPrevPolls] = useState(false);
    useEffect(() => {
        socket.on('realtime-result', (data) => {
            console.log(data);
            setrealtimeResults(data);
        });

        return () => {
            socket.off('realtime-result');
        };
    }, []);

    const emptyResults = () => {
        setrealtimeResults(null);
    };

    const togglePrevPollsVisibility = () => {
        setshowPrevPolls(!showPrevPolls);
    };
    return (
        // this is the provider providing state
        <TeacherContext.Provider
            value={{
                realtimeResults,
                setrealtimeResults,
                emptyResults,
                showPrevPolls,
                togglePrevPollsVisibility
            }}
        >
            {props.children}
        </TeacherContext.Provider>
    );
};
export const useTeacher = () => useContext(TeacherContext);
export default TeacherContextProvider;
