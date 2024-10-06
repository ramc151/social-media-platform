import React, { useState } from 'react'
import { createPostHandler } from '../api/post';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../redux/postSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create_Post = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [text, setText] = useState('');

    const handleCreatePost = async () => {
        const response = await createPostHandler(text, user._id);
        console.log(response.data);
        if (response && response.status !== 200) {
            toast.error(response.data.error)
        } else {
            dispatch(addPost(response.data));
            navigate('/');
        }
    }

    return (
        <div className="container">
            <div className="alert alert-info">
                <h3>Create Post</h3>
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button className='btn btn-success' onClick={handleCreatePost}>Post</button>
        </div>
    )
}

export default Create_Post