import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { fetchPost, fetchComments } from '../actions'
import PropTypes from 'prop-types'

class PostsList extends Component {
    
    getPost=(id)=>{
      const {dispatch} = this.props
      dispatch(fetchPost(id))
      dispatch(fetchComments(id))
    }

    render(){
      const {posts} = this.props
      return (
          <ul className="posts">
            {posts.map(post =>
              <li key={post.id}>
                <Link 
                  to={`/${post.category}/posts/${post.id}`} 
                  key={post.id}
                  onClick={()=>this.getPost(post.id)}
                >
                  <p className="post">{post.title}</p>
                </Link>
                <footer className="post_footer">
                  <span>
                    {" "}
                    <strong>
                      {post.voteScore}
                    </strong> {post.voteScore === 1 ? " vote" : " votes"}
                  </span>
                  <span>
                    {" "}
                    Submitted at <strong>
                      {new Date(post.timestamp).toLocaleDateString()}
                    </strong>
                  </span>
                </footer>
              </li>)}
          </ul>
      )
    }
}

PostsList.propTypes={
  posts:PropTypes.arrayOf(PropTypes.shape({
    id:PropTypes.string.isRequired,
    timestamp:PropTypes.number.isRequired,
    title:PropTypes.string.isRequired,
    body:PropTypes.string.isRequired,
    author:PropTypes.string.isRequired,
    category:PropTypes.string.isRequired,
    voteScore:PropTypes.number.isRequired,
    deleted:PropTypes.bool.isRequired,
    commentCount:PropTypes.number.isRequired
  })).isRequired,
  dispatch:PropTypes.func.isRequired
}

export default PostsList