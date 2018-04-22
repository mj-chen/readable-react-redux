import React, {Component} from "react"
import Modal from "react-responsive-modal"
import UUID from "uuid"
import PropTypes from "prop-types"

class CommentModal extends Component {

  state = {
    author: "",
    body: ""
  }

  addName = author => {
    this.setState({ author })
  }

  editComment = body => {
    this.setState({ body })
  }

  makeId = () => {
    let id = UUID.v4()
    return id
  }

  onSubmit=(e)=>{
      e.preventDefault()
      const {author,body} = this.state
      const id = this.makeId();
      const timestamp = Date.now()
      this.props.submit({author,body,id,timestamp})
      this.props.onClose()
      this.setState({ author: "", body: "" })
  }

  render() {
    const { author, body } = this.state
    const { open, onClose } = this.props
    return (
      <Modal
        open={open}
        onClose={onClose}
        little
        classNames={{ overlay: "overlay", modal: "editing-modal" }}
      >
        <h4> New post</h4>
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            className="author"
            type="text"
            value={author}
            placeholder="Your Name"
            onChange={e => this.addName(e.target.value)}
            required
          />
          <textarea
            rows="5"
            value={body}
            placeholder="Create your new comment..."
            onChange={e => this.editComment(e.target.value)}
            required
          />
          <div className="footer">
            <button type="submit" className="addpost">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

CommentModal.propTypes={
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
    submit:PropTypes.func.isRequired
}

export default CommentModal