import React, { Component } from "react"
import { connect } from "react-redux"
import {Route} from 'react-router-dom'
import {RECEIVE_ALL_POSTS} from '../constants/ActionTypes'
import { sortPosts, fetchPosts } from "../actions"
import Sort from "../components/sort"
import PostsList from '../components/postsList'
import PropTypes from "prop-types"

class Posts extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts(RECEIVE_ALL_POSTS))
  }

  sortpostsbyvote = (lable) => {
    const { dispatch } = this.props;
    if(lable===''){
      lable='home'
    }
    const callback = (a, b) => {
      let diff = a.voteScore - b.voteScore;
      if (diff < 0) {
        return 1
      }
      if (diff > 0) {
        return -1
      } else {
        return diff
      }
    }
    dispatch(sortPosts(lable,callback))
  }

  sortpostsbytime = (lable) => {
    const { dispatch } = this.props;
    if(lable===''){
      lable='home'
    }
    const callback = (a, b) => {
      let diff = a.timestamp - b.timestamp;
      if (diff > 0) {
        return -1
      }
      if (diff < 0) {
        return 1
      } else {
        return diff
      }
    }
    dispatch(sortPosts(lable,callback))
  }

  render() {
    const { posts, cats, dispatch } = this.props
    return <div>
        <Route  render={({ location }) => <Sort lable={location.pathname.slice(1)} sortpostsbyvote={this.sortpostsbyvote} sortpostsbytime={this.sortpostsbytime} posts={posts} />} />
        <Route path='/' exact render={() => <PostsList posts={posts["home"]} dispatch={dispatch} />} />
        {cats.map(cat => (
          <Route
            path={`/${cat.path}`}
            exact
            render={() => (
              <PostsList
                posts={posts[`${cat.path}`]}
                dispatch={dispatch}
              />
            )}
            key={cat.name}
          />
        ))}
      </div>
  }
}

Posts.propTypes = {
  posts: PropTypes.shape({
    home: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        commentCount: PropTypes.number.isRequired
      })
    ),
    react: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        commentCount: PropTypes.number.isRequired
      })
    ),
    redux: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        commentCount: PropTypes.number.isRequired
      })
    ),
    udacity: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired,
        deleted: PropTypes.bool.isRequired,
        commentCount: PropTypes.number.isRequired
      })
    )
  }),
  cats:PropTypes.arrayOf(
    PropTypes.shape({
      name:PropTypes.string,
      path:PropTypes.string
    })).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    posts:state.posts,
    cats:state.cats
})

export default connect(mapStateToProps, null, null, { pure: false })(Posts)
