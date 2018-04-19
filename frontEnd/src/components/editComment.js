import React, {Component} from "react"
import PropTypes from "prop-types"

class EditComments extends Component {

  state = {
    body: this.props.comment.body,
  }

  editBody = body => {
    this.setState({ body})
  }

  onSubmit = e => {
    e.preventDefault()
    const {  body } = this.state
    const {id}=this.props.comment
    const {comment}=this.props
    const timestamp = Date.now()
    const updatedComment = {...comment, ...{body, timestamp}}
    this.props.updateComment(id, updatedComment)
  }

  render() {
    const {body} = this.state
    return (
      <form className="edit_post" onSubmit={(e) => this.onSubmit(e)}>
        <div>
          <textarea
            rows="5"
            value={body}
            required
            onChange={e => this.editBody(e.target.value)}
          />
        </div>
        <div className="footer">
          <button
            type="submit"
            className="addpost"
          >
            Submit
          </button>
        </div>
      </form>
    )
  }
}

EditComments.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  }).isRequired,
  updateComment:PropTypes.func.isRequired
}

export default EditComments