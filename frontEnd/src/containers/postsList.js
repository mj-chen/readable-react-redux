import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { votePost, likePost, dislikePost, fetchPosts, removePost, editPost } from '../actions'
import {RECEIVE_ALL_POSTS} from '../constants/ActionTypes'
import PropTypes from 'prop-types'
import Thumbs from '../components/thumb'
import {connect} from 'react-redux'
import EditPost from "../components/editPost"
import Pen from "react-icons/lib/md/create"
import Bin from "react-icons/lib/md/delete"


class PostsList extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts(RECEIVE_ALL_POSTS))
  }

  state = {
    editingPost: null,
    open: false
  }

  toggleEdit = (id) => {
    this.setState({
      editingPost:id
    })
  }

  toggleDelete = id => {
    const { dispatch } = this.props
    dispatch(removePost(id))
  }

  updatePost = (id, updatedPost) => {
    this.props.dispatch(editPost(id, updatedPost))
    this.setState(state => {
      return { editingPost: !state.editingPost }
    })
  }

  vote = (id, option) => {
    const { dispatch } = this.props
    dispatch(votePost(id, option))
    if (option === "upVote") {
      dispatch(likePost(id))
    } else {
      dispatch(dislikePost(id))
    }
  }

  render() {
    const { posts, likedPosts, dislikedPosts, lable} = this.props
    const selectedposts = lable? posts.filter(post => post.category === lable): posts;
    return(
       <ul className="posts">
        {selectedposts.map(post => 
          <li key={post.id}>
            <header className="edit">
              <Pen size={35} color="#35aa81" onClick={() => this.toggleEdit(post.id)} />
              <Bin size={35} color="#d73838" onClick={() => this.toggleDelete(post.id)} />
            </header>
            {this.state.editingPost === post.id ? <EditPost post={post} updatePost={this.updatePost} /> : <section>
                <Link to={`/${post.category}/${post.id}`} key={post.id} >
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </Link>
              </section>}
            <footer className="list_footer">
              <Thumbs vote={(id, option) => this.vote(post.id, option)} liked={likedPosts.indexOf(post.id) === -1 ? false : true} disliked={dislikedPosts.indexOf(post.id) === -1 ? false : true} />
              <div className="detail">
                <span>
                  <strong>
                    {post.commentCount}
                  </strong> {post.commentCount === 1 ? " comment" : " comments"}
                </span>
                <span>
                  {" "}
                  <strong>
                    {post.voteScore}
                  </strong> {post.voteScore === 1 || post.voteScore === -1 ? " vote" : " votes"}
                </span>
                <span>
                  {" "}
                  Submitted at <strong>
                    {new Date(post.timestamp).toLocaleDateString()}
                  </strong>
                </span>
                <span>
                  By <strong>{post.author}</strong>
                </span>
              </div>
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
  dispatch:PropTypes.func.isRequired,
  likedPosts:PropTypes.arrayOf(PropTypes.string),
  dislikedPosts:PropTypes.arrayOf(PropTypes.string),
}

const mapStateToProps = state => ({
  posts: state.posts,
  likedPosts: state.likedPosts,
  dislikedPosts: state.dislikedPosts,
})


export default connect(mapStateToProps, null, null, { pure: false })(PostsList)