import {
    RECEIVE_ALL_POSTS,
    RECEIVE_FILTERED_POSTS,
    SORT_POSTS,
    UPDATE_POST,
    ADD_POST,
    DELETE_POST
} from '../constants/ActionTypes'

const posts = (state = [], action) => {
  const { posts, lable, callback, post } = action
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return posts
    case RECEIVE_FILTERED_POSTS:
      let rest = []
      posts.forEach(newpost=>{
        rest = state.filter(post=> post.category !== newpost.category)
      })
      return [...rest, ...posts]
    case SORT_POSTS:
      if(lable === ''){
        console.log(lable)
        return [...state].sort(callback)
      }else{
        const targetList = state.filter(post=>post.category===lable)
        const sortedList = targetList.sort(callback)
        return sortedList
      }
    case UPDATE_POST:
      const oldPost = state.filter(p => p.id === post.id)
      const index = state.indexOf(oldPost[0])
      const updatedState = [...state]
      updatedState[index] = post
      return updatedState
    case ADD_POST:
      return [...state, post]
    case DELETE_POST:
      return state.filter(p=>p.id !== post.id)
    default:
      return state
  }
}

export default posts
