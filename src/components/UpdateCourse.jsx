import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

const UpdateCourse = () => {
    const { courseId } = useParams();
    const [formData, setFormData] = useState({
        courseName: '',
        trainer: '',
        durationInWeeks: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourse();
    }, [courseId]);

    const fetchCourse = async () => {
        try {
            const response = await fetch(API_ENDPOINTS.COURSES);
            const courses = await response.json();
            const course = courses.find(c => c.courseId === courseId);

            if (course) {
                setFormData({
                    courseName: course.courseName,
                    trainer: course.trainer,
                    durationInWeeks: course.durationInWeeks.toString()
                });
            } else {
                setMessage('Course not found');
            }
        } catch (error) {
            setMessage('Error fetching course data');
        } finally {
            setLoading(false);
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
            const response = await fetch(API_ENDPOINTS.UPDATE_COURSE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    courseId: courseId,
                    ...formData,
                    durationInWeeks: parseInt(formData.durationInWeeks)
                })
            });

            const result = await response.text();

            if (response.ok) {
                setMessage('✅ Course updated successfully!');

                setTimeout(() => {
                    navigate('/courses');
                }, 2000);
            } else {
                setMessage('❌ Error: ' + result);
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl">Loading course data...</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="rounded-3xl shadow-2xl bg-white/95 backdrop-blur-lg max-w-3xl w-full p-8 sm:p-12">
                <Navbar />

                <h1 className="text-4xl font-extrabold text-slate-800 mb-7 text-center">
                    Update Course: {courseId}
                </h1>

                {message && (
                    <div className={`mb-4 p-4 rounded-md text-center font-semibold ${message.includes('✅')
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 px-4 max-w-xl mx-auto">
                    <div className="flex flex-col">
                        <label className="mb-2 font-semibold text-indigo-700">Course ID</label>
                        <div className="rounded-md bg-gray-100 px-4 py-3 font-medium">
                            {courseId}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="courseName" className="mb-2 font-semibold text-indigo-700">Course Name</label>
                        <input
                            id="courseName"
                            name="courseName"
                            type="text"
                            required
                            value={formData.courseName}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="trainer" className="mb-2 font-semibold text-indigo-700">Trainer</label>
                        <input
                            id="trainer"
                            name="trainer"
                            type="text"
                            required
                            value={formData.trainer}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="durationInWeeks" className="mb-2 font-semibold text-indigo-700">Duration (Weeks)</label>
                        <input
                            id="durationInWeeks"
                            name="durationInWeeks"
                            type="number"
                            required
                            min="1"
                            value={formData.durationInWeeks}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`rounded-xl px-10 py-4 text-white font-bold shadow-md transition transform hover:scale-105 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCourse;