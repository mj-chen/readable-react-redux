import React, {Component} from 'react'
import PropTypes from 'prop-types'

class EditPost extends Component {

  state = {
    title: this.props.post.title,
    body: this.props.post.body,
  }

  editTitle = title => {
    this.setState({ title})
  }

  editBody = body => {
    this.setState({ body})
  }

  onSubmit = e => {
    e.preventDefault()
    const { title, body } = this.state,
          { author, id, voteScore, commentCount, deleted, category } = this.props.post
    let timestamp = Date.now()
    const newpost = {
      author,
      title,
      body,
      category,
      timestamp,
      id,
      voteScore,
      commentCount,
      deleted
    }   
    this.props.updatePost(id,newpost)
  }

  render() {
    const { title, body } = this.state
    return (
      <form className="edit_post" onSubmit={(e)=>this.onSubmit(e)}>
        <div>
          <p>Title</p>
          <textarea
            rows="2"
            value={title}
            required
            onChange={e => this.editTitle(e.target.value)}
          />
        </div>
        <div>
          <p>Content</p>
          <textarea
            rows="5"
            value={body}
            required
            onChange={e => this.editBody(e.target.value)}
          />
        </div>
        <div className="footer">
          <button type="submit" className="addpost">
            Submit
          </button>
        </div>
      </form>
    )
  }
}

EditPost.propTypes={
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    commentCount: PropTypes.number.isRequired
  }).isRequired,
  updatePost: PropTypes.func.isRequired
}

export default EditPost