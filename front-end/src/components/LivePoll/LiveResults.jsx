import React, { useEffect } from 'react';
import { useTeacher } from '../../Context/TeacherContext';
import LiveTimer from '../LiveTimer';
import './poll.css';
const LiveResults = ({}) => {
    const { realtimeResults: results, emptyResults } = useTeacher();

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
                    <span className="answer">Live</span>
                </div>
                <div
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    className="row"
                >
                    <h2>Question : {results?.title}</h2>
                    <LiveTimer val={results.timer} />
                    <button
                        onClick={() => {
                            emptyResults();
                        }}
                    >
                        x
                    </button>
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
                                <span className="data">
                                    {Math.floor(
                                        (stats[key] /
                                            results.responses.length) *
                                            100
                                    ) || 0}
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

export default LiveResults;
