import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        availCourses();
    }, []);

    const availCourses = () => {
        fetch(API_ENDPOINTS.COURSES)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                return response.json();
            })
            .then((coursesData) => {
                setCourses(coursesData);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching courses: ' + error.message);
                setLoading(false);
            });
    };

    const handleDeleteCourse = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                const response = await fetch(`${API_ENDPOINTS.DELETE_COURSE}/${courseId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Course deleted successfully!');
                    availCourses();
                } else {
                    alert('Failed to delete course');
                }
            } catch (error) {
                alert('Error deleting course: ' + error.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl font-extrabold">Loading courses...</div>
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

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-extrabold text-slate-800">Available Courses</h1>
                    <button
                        onClick={() => window.location.href = '/add-course'}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                        + Add New Course
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                    <table className="min-w-full">
                        <thead className="bg-indigo-600 text-white text-left rounded-t-lg">
                            <tr>
                                <th className="px-6 py-3">Course ID</th>
                                <th className="px-6 py-3">Course Name</th>
                                <th className="px-6 py-3">Trainer Name</th>
                                <th className="px-6 py-3">Duration (Weeks)</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {courses.map((course, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-medium">{course.courseId}</td>
                                    <td className="px-6 py-3">{course.courseName}</td>
                                    <td className="px-6 py-3">{course.trainer}</td>
                                    <td className="px-6 py-3">{course.durationInWeeks}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => window.location.href = `/update-course/${course.courseId}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCourse(course.courseId)}
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

export default Courses;