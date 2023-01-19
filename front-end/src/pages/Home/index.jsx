import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <h1>Select what typeof user you are ?</h1>
            <div className="inline">
                <a className="inline" href="/student">
                    <div
                        className="card inline"
                        style={{ marginRight: '1rem' }}
                    >
                        <h1>🎒</h1>
                        <h2>Student</h2>
                    </div>
                </a>
                <a className="inline" href="/teacher">
                    <div className="card inline">
                        <h1>🧑‍🏫</h1>
                        <h2>Teacher</h2>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Home;
