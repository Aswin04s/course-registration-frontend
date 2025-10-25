import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Courses from './components/Courses';
import Students from './components/Students';
import RegistrationForm from './components/RegistrationForm';
import AddCourse from './components/AddCourse';
import UpdateCourse from './components/UpdateCourse';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/students" element={<Students />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/update-course/:courseId" element={<UpdateCourse />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;