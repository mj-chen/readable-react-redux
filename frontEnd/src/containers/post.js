import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import Comments from './comments'
import Thumbs from '../components/thumb'
import {
  votePost,
  updatePost,
  deletePost,
  addNewComment,
  likePost,
  dislikePost,
} from "../actions"
import Pen from 'react-icons/lib/md/create'
import Bin from 'react-icons/lib/md/delete'
import AddComment from "react-icons/lib/md/add-box"
import Comment from "react-icons/lib/md/comment"
import EditPost from '../components/editPost'
import CommentModal from '../components/commentModal'
import PropTypes from 'prop-types'


class Post extends Component {

  state = {
    editingPost: false,
    showing: true,
    open: false
  }

  toggleEdit = () => {
    this.setState(prestate => {
      return { editingPost: !prestate.editingPost }
    })
  }

  toggleDelete = id => {
    const { dispatch } = this.props
    dispatch(deletePost(id))
  }

  openModal = () => {
    this.setState({
      open: true
    })
  }

  closeModal = () => {
    this.setState({
      open: false
    })
  }

  updatePost = (id, updatedPost) => {
    this.props.dispatch(updatePost(id, updatedPost))
    this.setState(state => {
      return { editingPost: !state.editingPost }
    })
  }

  vote = (id, option )=> {
    const {dispatch,post}=this.props
    dispatch(votePost(post.id, option))
    if(option === 'upVote'){
        dispatch(likePost(post.id))
    }else{
        dispatch(dislikePost(post.id))
    }    
  }

  toggleComments = ()=> {
    this.setState(state => {
      return {
        showing: !state.showing
      }
    })
  }
  
  postComment = info1 => {
    const parentId = this.props.post.id
    let info2 = { parentId, voteScore:0, deleted:false, parentDeleted:false }
    let comment = {...info1, ...info2}
    this.props.dispatch(addNewComment(comment))
  }

  render() {
    const { post, comments, likedPosts, dislikedPosts } = this.props
    const { editingPost, showing, open } = this.state
    const {
      id,
      title,
      body,
      commentCount,
      category,
      voteScore,
      timestamp,
      author
    } = post
    let element
    if (post) {
      let section
      if (editingPost) {
        section = (
          <EditPost post={post} updatePost={this.updatePost} />
        )
      } else {
        section = (
          <section>
            <h3>{title}</h3>
            <p>{body}</p>
          </section>
        )
      }

      element = (
        <Route
          exact
          path={`/${category}/posts/${id}`}
          render={() => (
            <article className="post_detail">
              <header className="edit">
                <Pen
                  size={35}
                  color="#35aa81"
                  onClick={() => this.toggleEdit()}
                />
                <Bin
                  size={35}
                  color="#d73838"
                  onClick={() => this.toggleDelete(id)}
                />
              </header>
              {section}
              <footer className="list_footer">
                <Thumbs vote={this.vote} liked={likedPosts.indexOf(id)===-1?false:true} disliked={dislikedPosts.indexOf(id)===-1?false:true}/>
                <div className="detail">
                  <span>
                    {" "}
                    <strong>{voteScore}</strong>{" "}
                    {voteScore === 1 || voteScore === 0? " vote" : " votes"}
                  </span>
                  <span>
                    {" "}
                    Submitted at{" "}
                    <strong>{new Date(timestamp).toLocaleDateString()}</strong>
                  </span>
                  <span>
                    By <strong>{author}</strong>
                  </span>
                </div>
              </footer>
              <hr />
              <div className="comment_header">
                <aside className="show_comment">
                  <Comment size={40} color="#777973" onClick={()=>{this.toggleComments()}}/>
                  <span>{commentCount===0?0:comments.length}</span>
                </aside>
                <button
                  className="add_comment"
                  onClick={() => this.openModal()}
                >
                  <span>Add a comment</span>
                  <AddComment size={30} color="white"/>
                </button>
              </div>
              <CommentModal
                onClose={this.closeModal}
                open={open}
                submit={this.postComment}
              />
              {commentCount > 0 && showing && <Comments/>}
            </article>
          )}
        />
      )
    } else {
      element = ""
    }
    return element
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    timestamp: PropTypes.number,
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    voteScore: PropTypes.number,
    deleted: PropTypes.bool,
    commentCount: PropTypes.number
  }),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      parentId: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
      deleted: PropTypes.bool.isRequired,
      parentDeleted: PropTypes.bool.isRequired
    })
  ),
  likedPosts: PropTypes.arrayOf(PropTypes.string),
  dislikedPosts: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    post:state.post,
    comments:state.comments,
    likedPosts:state.likedPosts,
    dislikedPosts:state.dislikedPosts
})

export default connect(mapStateToProps, null, null, {pure:false})(Post)
