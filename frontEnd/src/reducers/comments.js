import {
  RECEIVE_COMMENTS,
  UPDATE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../constants/ActionTypes"

const comments = (state = [], action) => {
  const sortCallback = (a, b) => {
    if (a.timestamp - b.timestamp > 0) {
      return -1
    } else {
      return 1
    }
  }
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments.sort(sortCallback)
    case UPDATE_COMMENT:
      const oldComment = state.filter(
        comment => comment.id === action.comment.id
      )
      const index = state.indexOf(oldComment[0])
      const updatedState = [...state]
      updatedState[index] = action.comment
      return updatedState
    case ADD_COMMENT:
      return [...state, action.comment].sort(sortCallback)
    case DELETE_COMMENT:
      return state.filter(comment => comment.id !== action.comment.id)
    default:
      return state
  }
}

export default comments
