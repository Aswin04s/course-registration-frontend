import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        regStudents();
    }, []);

    const regStudents = () => {
        fetch(API_ENDPOINTS.ENROLLED)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                return response.json();
            })
            .then((studentsData) => {
                setStudents(studentsData);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching students: ' + error.message);
                setLoading(false);
            });
    };

    const handleDeleteStudent = async (enrollmentId) => {
        if (window.confirm('Are you sure you want to delete this student enrollment?')) {
            try {
                const response = await fetch(`${API_ENDPOINTS.DELETE_STUDENT}/${enrollmentId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Student enrollment deleted successfully!');
                    regStudents();
                } else {
                    alert('Failed to delete student enrollment');
                }
            } catch (error) {
                alert('Error deleting student: ' + error.message);
            }
        }
    };

    const handleUpdateStudent = (student) => {
        const newName = prompt('Enter new name:', student.name);
        const newEmail = prompt('Enter new email:', student.emailId);
        const newCourse = prompt('Enter new course:', student.courseName);

        if (newName && newEmail && newCourse) {
            updateStudent(student.id, newName, newEmail, newCourse);
        }
    };

    const updateStudent = async (enrollmentId, name, emailId, courseName) => {
        try {
            const formData = new URLSearchParams();
            formData.append('enrollmentId', enrollmentId);
            formData.append('name', name);
            formData.append('emailId', emailId);
            formData.append('courseName', courseName);

            const response = await fetch(API_ENDPOINTS.UPDATE_STUDENT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            });

            if (response.ok) {
                alert('Student updated successfully!');
                regStudents();
            } else {
                alert('Failed to update student');
            }
        } catch (error) {
            alert('Error updating student: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl">Loading students...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-6">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-6xl w-full p-8">
                <Navbar />

                <h1 className="text-3xl font-extrabold mb-6 text-slate-800 text-center">Registered Students</h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-indigo-600 text-white text-left rounded-t-lg">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email ID</th>
                                <th className="px-6 py-3">Course Name</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {students.map((student, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-medium">{student.id}</td>
                                    <td className="px-6 py-3 font-medium">{student.name}</td>
                                    <td className="px-6 py-3">{student.emailId}</td>
                                    <td className="px-6 py-3">{student.courseName}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateStudent(student)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDeleteStudent(student.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;