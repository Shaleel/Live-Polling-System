import { createContext, useContext, useState, useEffect } from 'react';
import constants from '../constants';

//create a context, with createContext api
export const StudentContext = createContext({ student: null, loading: false });

const StudentContextProvider = (props) => {
    // this state will be shared with all components
    const [student, setstudent] = useState(null);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        async function fetchStudent() {
            const response = await fetch(
                `${constants.BACKEND_URL}/student/get/${sessionStorage.getItem(
                    'student-id'
                )}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Accept: 'application/json'
                    }
                }
            ).then((res) => res.json());

            if (response.error) {
                toast.error('unable to fetch student details');
                sessionStorage.removeItem('student-id');
                return;
            }

            setstudent(response.student);
        }
        if (sessionStorage.getItem('student-id') && !student) {
            fetchStudent();
        }
    }, []);
    return (
        // this is the provider providing state
        <StudentContext.Provider
            value={{ student, setstudent, loading, setloading }}
        >
            {props.children}
        </StudentContext.Provider>
    );
};
export const useStudent = () => useContext(StudentContext);
export default StudentContextProvider;
