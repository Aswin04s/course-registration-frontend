import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        emailId: '',
        courseName: ''
    });
    const [courses, setCourses] = useState([]);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const navigate = useNavigate();

    // Fetch courses from backend
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.COURSES);
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const coursesData = await response.json();
            setCourses(coursesData);
            setLoadingCourses(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setMessage('❌ Failed to load courses. Please refresh the page.');
            setLoadingCourses(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            });

            const result = await response.text();

            if (response.ok) {
                setMessage('🎉 Registration successful! Redirecting...');
                setFormData({ name: '', emailId: '', courseName: '' });

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage('❌ Registration failed: ' + result);
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="rounded-3xl shadow-2xl bg-white/95 backdrop-blur-lg max-w-3xl w-full p-8 sm:p-12">
                <Navbar />

                <h1 className="text-4xl font-extrabold text-slate-800 mb-7 text-center">Registration Form</h1>

                {message && (
                    <div className={`mb-4 p-4 rounded-md text-center font-semibold ${message.includes('successful')
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 px-4 max-w-xl mx-auto">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-semibold text-indigo-700">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 font-semibold text-indigo-700">Email</label>
                        <input
                            id="email"
                            name="emailId"
                            type="email"
                            required
                            value={formData.emailId}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="course" className="mb-2 font-semibold text-indigo-700">Select Course</label>
                        <select
                            id="course"
                            name="courseName"
                            required
                            value={formData.courseName}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                            disabled={loadingCourses}
                        >
                            <option value="">{loadingCourses ? 'Loading courses...' : 'Select a course'}</option>
                            {courses.map((course) => (
                                <option key={course.courseId} value={course.courseName}>
                                    {course.courseName} - {course.trainer} ({course.durationInWeeks} weeks)
                                </option>
                            ))}
                        </select>
                        {loadingCourses && (
                            <p className="text-sm text-gray-500 mt-1">Loading available courses...</p>
                        )}
                        {!loadingCourses && courses.length === 0 && (
                            <p className="text-sm text-orange-500 mt-1">No courses available. Please add courses first.</p>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting || loadingCourses || courses.length === 0}
                            className={`rounded-xl px-10 py-4 text-white font-bold shadow-md transition transform hover:scale-105 ${isSubmitting || loadingCourses || courses.length === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-800'
                                }`}
                        >
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>

                {/* Show available courses count */}
                {!loadingCourses && courses.length > 0 && (
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            📚 {courses.length} course{courses.length !== 1 ? 's' : ''} available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationForm;