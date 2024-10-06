import axios from "axios";

const token = localStorage.getItem('token')

const createPostHandler = async (text, userId) => {
    try {
        const response = await axios.post('/posts', { text, author: userId }, {
            headers: { Authorization: token }
        })
        return response;
    } catch (error) {
        console.log(error);
    }
}

const fetchPostHandler = async () => {
    try {
        const response = await axios.get('/posts');
        return response
    } catch (error) {
        return error.response;
    }
}

const postLikeHandler = async (id) => {
    try {
        const response = await axios.put(`/posts/${id}/like`, {}, {
            headers: { Authorization: token }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const userFollowHandler = async (id) => {
    try {
        const response = await axios.put(`users/${id}/follow`, {}, {
            headers: { Authorization: token }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

const postCommentHandler = async (id, comment) => {
    try {
        const response = await axios.post(`posts/${id}/comment`, { comment }, {
            headers: { Authorization: token }
        })
        return response.data;
    } catch (error) {
        return error.response;
    }
}

export { createPostHandler, fetchPostHandler, postLikeHandler, userFollowHandler, postCommentHandler }