import {
  LIKE_POST,
  DISLIKE_POST,
  LIKE_COMMENT,
  DISLIKE_COMMENT
} from "../constants/ActionTypes"

export const likedPosts = (state = [], action) => {
  switch (action.type) {
    case LIKE_POST:
      return [...state, action.id]
    case DISLIKE_POST:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

export const dislikedPosts = (state = [], action) => {
  switch (action.type) {
    case DISLIKE_POST:
      return [...state, action.id]
    case LIKE_POST:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

export const likedComments = (state = [], action) => {
  switch (action.type) {
    case LIKE_COMMENT:
      return [...state, action.id]
    case DISLIKE_COMMENT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

export const dislikedComments = (state = [], action) => {
  switch (action.type) {
    case DISLIKE_COMMENT:
      return [...state, action.id]
    case LIKE_COMMENT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

//export default combineReducers({likedPosts, likedComments, dislikedPosts, dislikedComments})
