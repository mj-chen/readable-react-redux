import {
  RECEIVE_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_POST,
  DELETE_POST
} from "../constants/ActionTypes"

const post = (state = {}, action) => {
  const { post } = action
  switch (action.type) {
    case RECEIVE_POST:
      return post
    case ADD_COMMENT:
      return { ...state, commentCount: state.commentCount + 1 }
    case DELETE_COMMENT:
      return { ...state, commentCount: state.commentCount-1 }
    case UPDATE_POST:
      return post
    case DELETE_POST:
      return {}
    default:
      return state
  }
}

export default post