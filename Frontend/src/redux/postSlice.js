import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        updatePostLikes: (state, action) => {
            const { postId, userId } = action.payload;
            const post = state.posts.find(post => post._id === postId);

            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter(id => id !== userId)
            } else {
                post.likes.push(userId)
            }
        },
        updatePostComment: (state, action) => {
            const { postId, comment } = action.payload;
            const post = state.posts.find(post => post._id === postId);

            if (post) {
                post.comments = comment;
            }
        }
    }
})

export const { addPost, setPosts, updatePostLikes, updatePostComment } = postSlice.actions;
export default postSlice.reducer;