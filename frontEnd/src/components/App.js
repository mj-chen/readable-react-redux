import React, { Component } from "react"
import "../App.css"
import Navigation from '../containers/navigation'
import AddPost from './addPost'
import PostModal from '../containers/postModal'
import PostDetail from '../containers/postDetail'
import {Route, Switch} from 'react-router-dom'
import Posts from "../containers/posts"

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
        <PostModal editing={this.state.editing} onClose={this.onClose} />
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/:category" component={Posts}/>
          <Route path="/:category/:post_id" component={PostDetail}/>
        </Switch>
      </div>
    )
  }
}

export default App
