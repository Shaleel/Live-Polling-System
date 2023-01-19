import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { usePoll } from '../../Context/PollContext';
import { useSocket } from '../../Context/SocketContext';
import { useStudent } from '../../Context/StudentContext';
import LiveTimer from '../LiveTimer';
import './poll.css';

const Results = () => {
    const { results, emptyResults } = usePoll();
    const { student } = useStudent();
    const studentMarkedIndex = results?.responses.reduce((acc, res, idx) => {
        if (res.studentId == student._id) {
            return idx;
        }
        return acc;
    }, -1);

    const stats = results?.responses.reduce((acc, item, idx) => {
        if (!acc[item.answer]) {
            acc[item.answer] = 0;
        }
        acc[item.answer] += 1;

        return acc;
    }, {});

    if (!results) return <></>;

    return (
        <div className={`poll-wrapper`}>
            <div className="poll-content">
                <div
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    className="row"
                >
                    <span className="answer">Result</span>
                    <button
                        onClick={() => {
                            emptyResults();
                        }}
                    >
                        x
                    </button>
                </div>
                <div className="row">
                    <h2>Question : {results?.title}</h2>
                </div>
                {results.options.map((option, key) => {
                    return (
                        <div key={key} className="answer-row">
                            <span
                                style={{
                                    width: `${Math.floor(
                                        (stats[key] /
                                            results.responses.length) *
                                            100
                                    )}%`
                                }}
                                className="progress"
                            ></span>
                            <h3>{option.title}</h3>
                            <div
                                style={{ marginRight: '1rem' }}
                                className={`result-val row`}
                            >
                                <span className="data">
                                    {key === results.correctIndex && 'Correct'}
                                </span>
                                {key === studentMarkedIndex && '✅'}
                                <span className="data">
                                    {Math.floor(
                                        (stats[key] /
                                            results.responses.length) *
                                            100
                                    )}
                                    %
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Results;
