import React, { useState } from 'react';
import constants from '../../constants';
import { useStudent } from '../../Context/StudentContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../Context/ChatContext';
const NameForm = () => {
    const { student, setstudent } = useStudent();
    const navigate = useNavigate();
    const { enableChat } = useChat();
    const [name, setname] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('Please enter name first');
            return;
        }
        //Post request to send student data
        const response = await fetch(
            `${constants.BACKEND_URL}/student/create`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ name: name.trim() })
            }
        ).then((res) => res.json());

        if (response.error) {
            toast.error(response.error.message);
            return;
        }

        sessionStorage.setItem('student-id', response.student._id);
        sessionStorage.setItem('student-name', response.student.name);

        setstudent(response.student);
        enableChat();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={name}
                    onChange={(e) => {
                        setname(e.target.value);
                    }}
                    autoFocus
                    placeholder="Enter your name"
                    className="student-name-input"
                ></input>
                <button className="cta">Continue</button>
            </form>
        </div>
    );
};

export default NameForm;
