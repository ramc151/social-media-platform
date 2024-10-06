import React, { useEffect, useState } from 'react'
import '../App.css'
import { fetchPostHandler, postCommentHandler, postLikeHandler, userFollowHandler } from '../api/post'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts, updatePostComment, updatePostLikes } from '../redux/postSlice';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import { FaRegComment } from "react-icons/fa";
import { loginSuccess, updateUserFollow } from '../redux/authSlice';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Feed = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const { user, token } = useSelector(state => state.auth);
    const [comment, setComment] = useState({});
    const [commentShowHide, setCommentShowHide] = useState([]);
    const [viewComment, setViewComment] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchPosts = async () => {
            const response = await fetchPostHandler();
            dispatch(setPosts(response.data));
            setLoading(false);
        };
        fetchPosts();
    }, [dispatch, token]);

    const likePost = async (postId) => {
        if (user) {
            dispatch(updatePostLikes({ postId, userId: user._id }));
            await postLikeHandler(postId);
        } else {
            toast.warn(<div>
                Like this post ? <Link to='/login' className="toast-login-link">Login</Link>
            </div>);
        }
    }

    const followPost = async (authorId, username) => {
        if (user) {
            dispatch(updateUserFollow({ authorId }));
            const response = await userFollowHandler(authorId);

            dispatch(loginSuccess({ user: response.user, token: localStorage.getItem('token') }));
            localStorage.setItem('user', JSON.stringify(response.user));
        } else {
            toast.warn(<div>
                Follow to {username} ? <Link to='/login' className="toast-login-link">Login</Link>
            </div>);
        }
    }

    const handleCommentChange = (postId, value) => {
        setComment(prevComment => ({
            ...prevComment,
            [postId]: value
        }))
    }

    const postComment = async (postId) => {
        const response = await postCommentHandler(postId, comment[postId]);
        if (response && response.status !== 400) {
            dispatch(updatePostComment({ postId, comment: response.comments }));
        } else {
            toast.warn(response.data.error)
        }

        setComment(prevComment => ({
            ...prevComment,
            [postId]: ''
        }))
    }

    const handleCommentShowHide = (postId) => {
        if (user) {
            setCommentShowHide(prevState => {
                if (prevState.includes(postId)) {
                    return prevState.filter(id => id !== postId);
                } else {
                    return [...prevState, postId];
                }
            })
        } else {
            toast.warn(<div>
                Comment this post ? <Link to='/login' className="toast-login-link">Login</Link>
            </div>);
        }
    }

    const handleViewComment = (postId) => {
        setViewComment(prevComment => {
            if (prevComment.includes(postId)) {
                return prevComment.filter(id => id !== postId);
            } else {
                return [...prevComment, postId];
            }
        })
    }

    const capitalize = (val) => {
        return val && val[0].toUpperCase() + val.slice(1);
    }

    return (
        <div className="container">
            <div className="alert alert-info"><h3>Latest Posts</h3></div>
            <div className="row">
                {loading && <Spinner />}
                {posts && posts.map(post => (
                    <div className="col-sm-3 my-2" key={post._id}>
                        <div className="card card_post">
                            <img src="./images/profile_pic.webp" className="card-img-top profile_pic" alt="Loading..." />
                            <div className="card-body">
                                <h5 className="card-title">{capitalize(post.author.username)}</h5>
                                <p className="card-text mb-0">{post.text}</p>

                                <div className='both_icons'>
                                    {/* like button */}
                                    <a className='like_comment_icon' onClick={() => likePost(post._id)}> {user && post.likes.includes(user._id) ? <AiFillLike className='like_btn' /> : <AiOutlineLike />}</a>

                                    {/* comment button */}
                                    <a className='like_comment_icon comment_icon' onClick={() => handleCommentShowHide(post._id)}><FaRegComment /></a>

                                </div>

                                {/* follow button */}
                                <button className='btn btn-light btn-sm follow_btn' onClick={() => followPost(post.author._id, post.author.username)}>{user && user.following.includes(post.author._id) ? '✓Following' : '+Follow'}</button>

                                {/* comment input */}
                                {commentShowHide.includes(post._id) && (
                                    <>
                                        <input type="text" placeholder='comment...' className='comment_input' onChange={(e) => handleCommentChange(post._id, e.target.value)} value={comment[post._id] || ''} />
                                        <a className='comment_send_btn' onClick={() => postComment(post._id)}><VscSend /></a>
                                    </>
                                )}

                                {/* display comment */}
                                <div className='comments-section'>
                                    {post.comments.slice(0, 1).map(comment => (
                                        <div key={comment._id} className='comment'>
                                            <strong>{comment.user.username}:</strong> {comment.comment}
                                        </div>
                                    ))}

                                    {viewComment.includes(post._id) && post.comments.slice(1).map(comment => (
                                        <div key={comment._id}>
                                            <strong>{comment.user.username}:</strong> {comment.comment}
                                        </div>
                                    ))}
                                </div>
                                {post.comments.length > 1 && (
                                    <small className='allcomments' onClick={() => handleViewComment(post._id)}>
                                        {viewComment.includes(post._id) ? 'Hide comments' : `View all ${post.comments.length} comments`}
                                    </small>
                                )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Feed