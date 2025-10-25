import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

const AddCourse = () => {
    const [formData, setFormData] = useState({
        courseId: '',
        courseName: '',
        trainer: '',
        durationInWeeks: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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
            const response = await fetch(API_ENDPOINTS.ADD_COURSE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    ...formData,
                    durationInWeeks: parseInt(formData.durationInWeeks)
                })
            });

            const result = await response.text();

            if (response.ok) {
                setMessage('✅ Course added successfully!');
                setFormData({ courseId: '', courseName: '', trainer: '', durationInWeeks: '' });

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


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="rounded-3xl shadow-2xl bg-white/95 backdrop-blur-lg max-w-3xl w-full p-8 sm:p-12">
                <Navbar />

                <h1 className="text-4xl font-extrabold text-slate-800 mb-7 text-center">Add New Course</h1>

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
                        <label htmlFor="courseId" className="mb-2 font-semibold text-indigo-700">Course ID</label>
                        <input
                            id="courseId"
                            name="courseId"
                            type="text"
                            required
                            value={formData.courseId}
                            onChange={handleChange}
                            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-white/80"
                            placeholder="Enter course ID"
                        />
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
                            placeholder="Enter course name"
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
                            placeholder="Enter trainer name"
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
                            placeholder="Enter duration in weeks"
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`rounded-xl px-10 py-4 text-white font-bold shadow-md transition transform hover:scale-105 ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            {isSubmitting ? 'Adding Course...' : 'Add Course'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourse;