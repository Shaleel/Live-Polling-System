import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import './poll-form.css';
import Timer from './Timer';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSocket } from '../../Context/SocketContext';
import { useTeacher } from '../../Context/TeacherContext';

const PollForm = () => {
    const [options, setoptions] = useState([]);
    const [timerVal, settimerVal] = useState(60 * 1000); //60s or 1 min
    const { setrealtimeResults, togglePrevPollsVisibility } = useTeacher();
    const [correctIndex, setcorrectIndex] = useState(-1);
    const questionRef = useRef(null);
    const socket = useSocket();
    const addOption = () => {
        const id = `option-${options.length}`;
        setoptions([...options, { id: id }]);
    };

    const addQuestion = () => {
        const questionObj = {
            title: questionRef.current.value.trim(),
            options: options.map((option) => {
                return document.getElementById(option.id).value.trim();
            }),
            timer: timerVal,
            correctIndex: correctIndex
        };

        //---------Error Handling ---------------
        if (!questionObj.title) {
            toast.error('Question title cannot be empty');
            return;
        }

        if (options.length === 0) {
            toast.error('Options cannot be empty');
            return;
        }
        for (let option of questionObj.options) {
            if (!option) {
                toast.error('Options cannot be empty');
                return;
            }
        }

        if (questionObj.correctIndex === -1) {
            toast.error('Correct option is not chosen');
            return;
        }
        //---------Error Handling ---------------

        socket.emit('new-question', questionObj, (confirmation) => {
            if (confirmation.status == 'OK') {
                toast.success('Question sent successfullly');
                setrealtimeResults(confirmation.pollData);
            }
        });
    };
    return (
        <div className="poll-form-wrapper">
            <button
                onClick={togglePrevPollsVisibility}
                style={{ position: 'fixed', right: '1rem', top: '7rem' }}
            >
                See Previous Polls
            </button>

            <h3>Question</h3>
            <textarea
                ref={questionRef}
                className="text-area"
                placeholder="Type your question"
            ></textarea>

            <div className="option-row">
                <p>Option</p>
                <p>Is Correct ?</p>
            </div>
            <Timer val={timerVal} setval={settimerVal} />
            {options.length === 0 ? (
                <p className="option-row">No option created</p>
            ) : (
                options.map((option, index) => (
                    <div className="option-row" key={option.id}>
                        <input
                            id={option.id}
                            className="option-input"
                            placeholder="title"
                        ></input>
                        <div
                            onClick={() => {
                                setcorrectIndex(index);
                            }}
                            className={`checkbox ${
                                index === correctIndex && 'checked'
                            }`}
                        >
                            {index === correctIndex && '✅'}
                        </div>
                    </div>
                ))
            )}

            <div className="button-row">
                <button onClick={addOption}>Add Option</button>
                <button
                    style={{ marginLeft: '1rem' }}
                    className="cta"
                    onClick={addQuestion}
                >
                    Ask Question →
                </button>
            </div>
        </div>
    );
};

export default PollForm;
