const API_BASE_URL = 'https://course-registration-backend-2.onrender.com' || 'http://localhost:8080';

export const API_ENDPOINTS = {
    COURSES: `${API_BASE_URL}/courses`,
    REGISTER: `${API_BASE_URL}/courses/register`,
    ENROLLED: `${API_BASE_URL}/courses/enrolled`,
    ADD_COURSE: `${API_BASE_URL}/courses/add`,
    UPDATE_COURSE: `${API_BASE_URL}/courses/update`,
    DELETE_COURSE: `${API_BASE_URL}/courses/delete`,
    UPDATE_STUDENT: `${API_BASE_URL}/students/update`,
    DELETE_STUDENT: `${API_BASE_URL}/students/delete`
};