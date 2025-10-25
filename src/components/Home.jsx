import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="rounded-3xl shadow-2xl bg-white/95 backdrop-blur-lg p-0 sm:p-0 max-w-3xl w-full">
                <Navbar />
                <main className="px-10 pb-10 pt-2 flex flex-col items-center">
                    <h1 className="text-4xl font-extrabold mb-5 text-slate-800">🚀 Jumpstart Your Learning</h1>
                    <p className="text-xl text-slate-600 mb-8 text-center">
                        Join a thriving tech community. Browse our live courses or register as a new student to start your journey.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            to="/courses"
                            className="rounded-xl px-8 py-4 font-bold text-lg bg-indigo-600 text-white shadow-md hover:-translate-y-1 hover:scale-105 transition"
                        >
                            Browse Courses
                        </Link>
                        <Link
                            to="/register"
                            className="rounded-xl px-8 py-4 font-bold text-lg bg-slate-900 text-white shadow-md hover:bg-indigo-700 hover:scale-105 transition"
                        >
                            Join Now
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;