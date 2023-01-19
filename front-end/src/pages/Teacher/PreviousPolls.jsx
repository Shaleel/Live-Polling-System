import React from 'react';
import { useTeacher } from '../../Context/TeacherContext';
import './prev-polls.css';
import '../../components/Chat/chat.css';
import { useState, useEffect } from 'react';
import constants from '../../constants';
import PollCard from './PollCard';

const PreviousPolls = () => {
    const { showPrevPolls, togglePrevPollsVisibility } = useTeacher();
    const [list, setlist] = useState([]);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        async function fetchList() {
            const response = await fetch(
                `${constants.BACKEND_URL}/poll/get-all`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Accept: 'application/json'
                    }
                }
            ).then((res) => res.json());

            console.log(response);
            setlist(response);
        }

        fetchList();
    }, []);
    return (
        <div
            style={{ justifyContent: 'flex-start' }}
            className={`chat-wrapper ${showPrevPolls && 'show-chat'}`}
        >
            <h2>Previous Polls</h2>
            <button onClick={togglePrevPollsVisibility} className="close-btn">
                ✕
            </button>

            <div style={{ justifyContent: 'flex-start' }} className="chat-list">
                {list.length ? (
                    list.map((poll, index) => (
                        <PollCard key={index} poll={poll} />
                    ))
                ) : (
                    <p>No chats as of now</p>
                )}
            </div>
        </div>
    );
};

export default PreviousPolls;
