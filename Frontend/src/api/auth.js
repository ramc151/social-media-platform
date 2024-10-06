import axios from 'axios';

const loginHandler = async ({ email, password }) => {
    try {
        const response = await axios.post('/auth/login', { email, password });
        return response;
    } catch (error) {
        return error.response
    }
}

const registerHandler = async (userData) => {
    try {
        const response = await axios.post('/auth/register', userData);
        return response;
    } catch (error) {
        return error.response
    }
}

export { loginHandler, registerHandler }