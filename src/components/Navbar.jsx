import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="flex justify-between px-10 pt-7 pb-5 border-b border-slate-200 mb-5">
            <Link to="/" className="text-2xl font-black text-indigo-800 tracking-wide">WinTech</Link>
            <div className="flex gap-4">
                <Link
                    to="/courses"
                    className={`px-5 py-2 rounded-lg font-semibold transition ${isActive('/courses')
                            ? 'bg-indigo-600 text-white'
                            : 'text-indigo-700 hover:bg-indigo-100'
                        }`}
                >
                    Courses
                </Link>
                <Link
                    to="/students"
                    className={`px-5 py-2 rounded-lg font-semibold transition ${isActive('/students')
                            ? 'bg-indigo-600 text-white'
                            : 'text-indigo-700 hover:bg-indigo-100'
                        }`}
                >
                    Students
                </Link>
                <Link
                    to="/register"
                    className={`px-5 py-2 rounded-lg font-semibold transition ${isActive('/register')
                            ? 'bg-indigo-600 text-white'
                            : 'text-indigo-700 hover:bg-indigo-100'
                        }`}
                >
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;