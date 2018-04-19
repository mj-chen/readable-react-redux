import {
    RECEIVE_ALL_POSTS,
    RECEIVE_REACT_POSTS,
    RECEIVE_REDUX_POSTS,
    RECEIVE_UDACITY_POSTS,
    SORT_POSTS,
} from '../constants/ActionTypes'


const initialState = {
  home: [],
  react: [],
  redux: [],
  udacity: []
}

const posts = (state = initialState, action) => {
  const { posts, lable, callback } = action
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return { ...state, home: posts }
    case RECEIVE_REACT_POSTS:
      return { ...state, react: posts }
    case RECEIVE_REDUX_POSTS:
      return { ...state, redux: posts }
    case RECEIVE_UDACITY_POSTS:
      return { ...state, udacity: posts }
    case SORT_POSTS:
      const sortedList = [...state[`${lable}`]].sort(callback)
      return {
        ...state,
        [`${lable}`]: sortedList
      };
    default:
      return state
  }
}

export default posts
