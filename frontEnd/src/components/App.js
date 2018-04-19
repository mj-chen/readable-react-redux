import React, { Component } from "react"
import "../App.css"
import Navigation from '../containers/navigation'
import AddPost from './addPost'
import PostModal from '../containers/postModal'
import Posts from '../containers/posts'
import Post from '../containers/post'

class App extends Component {

  state = {
    editing: false
  }

  onOpen = () => {
    this.setState({ editing: true })
  }

  onClose = () => {
    this.setState({ editing: false })
  }

  render() {
    return (
      <div>
        <Navigation/>
        <AddPost onOpen={this.onOpen} />
        <Posts />
        <Post />
        <PostModal editing={this.state.editing} onClose={this.onClose} />
      </div>
    )
  }
}

export default App
