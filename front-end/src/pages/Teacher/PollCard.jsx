import React from 'react';
import { format } from 'timeago.js';

const PollCard = ({ poll }) => {
    const stats = poll?.responses.reduce((acc, item, idx) => {
        if (!acc[item.answer]) {
            acc[item.answer] = 0;
        }
        acc[item.answer] += 1;

        return acc;
    }, {});
    return (
        <div style={{ padding: '1rem' }}>
            <div className="poll-card">
                <p className="poll-title">{poll.title}</p>
                <p
                    style={{
                        marginTop: '-1rem',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: 'grey'
                    }}
                >
                    {format(poll.createdAt)}
                </p>
                {poll.options.map((option, key) => (
                    <div style={{ width: '100%' }} key={key}>
                        <div
                            style={{
                                justifyContent: 'space-between'
                            }}
                            className="row"
                        >
                            <p className="option-title">
                                {option.title}{' '}
                                {poll.correctIndex === key && '✅'}
                            </p>{' '}
                            :<p>{option.impressions}</p>
                        </div>
                        <div className="option-progress-wrapper">
                            <div
                                className="option-progress"
                                style={{
                                    width: `${Math.floor(
                                        (stats[key] ||
                                            0 / poll.responses.length) * 100
                                    )}`
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PollCard;
