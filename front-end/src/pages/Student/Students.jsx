import React from 'react';
import { useStudent } from '../../Context/StudentContext';
import Room from './Room';
import NameForm from './NameForm';

const Students = () => {
    const { student } = useStudent();

    if (student) return <Room />;

    return <NameForm />;
};

export default Students;
