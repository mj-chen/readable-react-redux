import {
  RECEIVE_POST,
  ADD_COMMENT,
  DELETE_COMMENT
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
    default:
      return state
  }
}

export default post