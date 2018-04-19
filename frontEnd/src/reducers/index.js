
import posts from './posts'
import cats from './category'
import post from './post'
import comments from './comments'
import {likedPosts, likedComments, dislikedPosts, dislikedComments} from './vote'
import { combineReducers } from "redux"


export default combineReducers({
  posts,
  cats,
  post,
  comments,
  likedPosts,
  likedComments,
  dislikedPosts,
  dislikedComments
})
