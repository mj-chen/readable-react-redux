import React, { Component } from "react"
import Modal from "react-responsive-modal"
import { connect } from "react-redux"
import { addNewPost } from "../actions"
import UUID from "node-uuid"
import PropTypes from "prop-types"

class PostModal extends Component {
  state = {
    author: "",
    title: "",
    body: "",
    category: "choose a category..."
  }

  addName = author=> {
    this.setState({ author})
  }

  addTitle = title => {
    this.setState({title})
  }

  editPost = body => {
    this.setState({body})
  }

  addCategory = category => {
    this.setState({category})
  }

  makeId = () => {
    let id = UUID.v4()
    return id
  }

  formPost = ({author, title, body, category, id, timestamp})=>({
    author,
    title,
    body,
    category,
    commentCount:0,
    deleted:false,
    id,
    timestamp,
    voteScore:1,
  })

  onSubmit = e => {
    e.preventDefault()
    const { author, title, body, category } = this.state,
      { onClose, dispatch } = this.props,
      id = this.makeId(),
      timestamp = Date.now()
    const newpost = this.formPost({ author, title, body, category, id, timestamp })
    dispatch(addNewPost(category, newpost))
    this.setState({
      author: "",
      title: "",
      body: "",
      category: "choose a category..."
    })
    onClose()
  }

  render() {
    const { author, title, body, category } = this.state
    return (
      <Modal
        open={this.props.editing}
        onClose={this.props.onClose}
        little
        classNames={{ overlay: "overlay", modal: "editing-modal" }}
      >
        <h4> New post</h4>
        <form onSubmit={(e)=>this.onSubmit(e)}>
          <input
            className='author'
            type="text"
            value={author}
            placeholder="Your Name"
            onChange={(e)=>this.addName(e.target.value)}
            required
          />
          <textarea
            rows="2"
            value={title}
            placeholder="Tile of post..."
            onChange={(e)=>this.addTitle(e.target.value)}
            required
          />
          <textarea
            rows="5"
            value={body}
            placeholder="Create your new post..."
            onChange={(e)=>this.editPost(e.target.value)}
            required
          />
          <div className="footer">
            <span>Submit under: </span>
            <select onChange={(e)=>this.addCategory(e.target.value)} required value={category} className='select_cat'>
              <option disabled>choose a category...</option>
              {this.props.cats.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {" "}
                  {cat.name}{" "}
                </option>
              ))}
            </select>
            <button type="submit" className="addpost">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    )
  }
}

PostModal.propTypes={
  editing:PropTypes.bool.isRequired,
  onClose:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  cats: state.cats
})
  
export default connect(mapStateToProps)(PostModal)