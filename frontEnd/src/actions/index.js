import * as api from '../utils/api'
import * as types from '../constants/ActionTypes'


export const receivePosts = posts=> ({
  type:types.RECEIVE_ALL_POSTS,
  posts
})

export const receiveFilteredPosts =posts=>({
    type:types.RECEIVE_FILTERED_POSTS,
    posts
})

export const addPost = post=>({
  type:types.ADD_POST,
  post
})

export const receiveCats = cats => ({
    type: types.RECEIVE_CATS,
    cats
})

export const receivePost = post => ({
    type:types.RECEIVE_POST,
    post
})

export const receiveComments = (comments)=>({
    type:types.RECEIVE_COMMENTS,
    comments
})

export const updateComment=(comment)=>({
    type:types.UPDATE_COMMENT,
    comment
})

export const addComment=(comment)=>({
    type:types.ADD_COMMENT,
    comment
})

export const deleteComment=(comment)=>({
    type:types.DELETE_COMMENT,
    comment
})

export const updatePost=post=>({
    type:types.UPDATE_POST,
    post
})

export const deletPost=post=>({
    type:types.DELETE_POST,
    post
})

export const likePost=(id)=>({
    type:types.LIKE_POST,
    id
})

export const dislikePost=(id)=>({
    type:types.DISLIKE_POST,
    id
})

export const likeComment=(id)=>({
    type:types.LIKE_COMMENT,
    id
})

export const dislikeComment=(id)=>({
    type:types.DISLIKE_COMMENT,
    id
})

export const sortPosts = (lable,callback)=>({
    type:types.SORT_POSTS,
    lable,
    callback
})

export const fetchPosts = (type) => dispatch => {
    api.fetchPosts()
    .then(posts => dispatch(receivePosts(posts)));
}

export const fetchCats = () => dispatch =>{
    api.fetchCats()
    .then(cats=>dispatch(receiveCats(cats)))
}

export const addNewPost = (post)=>(dispatch)=>{
    api.addNewPost(post)
    .then(post => dispatch(addPost(post)))
}
   
export const fetchFilteredPosts=(cat)=>(dispatch)=>{
    api.fetchFilteredPosts(cat)
    .then(posts=>dispatch(receiveFilteredPosts(posts)))
}

export const fetchPost = (id)=>(dispatch)=>{
    api.fetchPost(id)
    .then(post=>dispatch(receivePost(post)))
}

export const fetchComments = (id) =>(dispatch)=>{
    api.fetchComments(id)
    .then(comments=>dispatch(receiveComments(comments)))
}

export const votePost = (id,option)=>(dispatch)=>{
    api.votePost(id,option)
    .then(post=>dispatch(updatePost(post)))
}

export const editPost = (id,post)=>(dispatch)=>{
    api.editPost(id, post)
    .then(post => dispatch(updatePost(post)))
}

export const removePost=(id)=>(dispatch)=>{
    api.removePost(id)
    .then(post=>dispatch(deletPost(post)))
}

export const addNewComment=(comment)=>(dispatch)=>{
    api.addComment(comment)
    .then(comment => dispatch(addComment(comment)))
}

export const editComment=(id,comment)=>(dispatch)=>{
    api.updateComment(id,comment)
    .then(comment=>dispatch(updateComment(comment)))
}

export const removeComment=(id)=>(dispatch)=>{
    api.deleteComment(id)
    .then(comment=>dispatch(deleteComment(comment)))
}

export const voteComment=(id,option)=>(dispatch)=>{
    api.voteComment(id,option)
    .then(comment=>dispatch(updateComment(comment)))
}