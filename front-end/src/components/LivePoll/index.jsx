import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { usePoll } from '../../Context/PollContext';
import { useSocket } from '../../Context/SocketContext';
import { useStudent } from '../../Context/StudentContext';
import LiveTimer from '../LiveTimer';
import './poll.css';

const LivePoll = () => {
    const { currentPoll, results } = usePoll();
    const socket = useSocket();
    const [checkedIndex, setcheckedIndex] = useState(-1);
    const [isAnswered, setisAnswered] = useState(false);
    const { student } = useStudent();

    useEffect(() => {
        setcheckedIndex(-1);
        setisAnswered(false);
    }, [currentPoll, results]);

    const submitResponse = async () => {
        socket.emit(
            'response',
            {
                studentId: student._id,
                pollId: currentPoll._id,
                response: checkedIndex
            },
            (confirm) => {
                if (confirm.status == 'OK') {
                    setisAnswered(true);
                    toast.success('Response submitted successfully');
                }
            }
        );
    };
    if (!currentPoll) return <></>;

    return (
        <div className={`poll-wrapper`}>
            <div className="poll-content">
                <div className="row">
                    <h2>Question : {currentPoll?.title}</h2>
                    <LiveTimer val={currentPoll.timer} />
                </div>
                {currentPoll.options.map((option, key) => {
                    return (
                        <div key={key} className=" row">
                            <h3>{option.title}</h3>
                            <div
                                onClick={() => {
                                    setcheckedIndex(key);
                                }}
                                style={{ marginLeft: '1rem' }}
                                className={`checkbox ${
                                    checkedIndex === key && 'checked'
                                }`}
                            >
                                {key === checkedIndex && '✅'}
                            </div>
                        </div>
                    );
                })}

                <p style={{ float: 'left', color: 'grey' }}>
                    Once the timer is over you'll be able to see poll results
                </p>

                {!isAnswered && (
                    <button
                        onClick={submitResponse}
                        style={{ float: 'right' }}
                        className="cta"
                    >
                        Submit Response
                    </button>
                )}
            </div>
        </div>
    );
};

export default LivePoll;
