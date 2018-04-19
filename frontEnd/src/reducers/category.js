import { RECEIVE_CATS } from "../constants/ActionTypes"


const cats = (state = [], action) => {
  const { cats } = action
  switch (action.type) {
    case RECEIVE_CATS:
      return [...state, ...cats.categories]
    default:
      return state
  }
}

export default cats
