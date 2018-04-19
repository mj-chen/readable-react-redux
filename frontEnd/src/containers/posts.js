import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from 'react-router-dom'
import { sortPosts } from "../actions"
import Sort from "../components/sort"
import PostsList from './postsList'
import PropTypes from "prop-types"

class Posts extends Component {

  sortpostsbyvote = (lable) => {
    const { dispatch } = this.props
    const callback = (a, b) => {
      let diff = a.voteScore - b.voteScore
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
    const { dispatch } = this.props
    const callback = (a, b) => {
      let diff = a.timestamp - b.timestamp
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
    const { cats } = this.props
    return <div>
        <Route render={({ location }) => <Sort lable={location.pathname.slice(1)} sortpostsbyvote={this.sortpostsbyvote} sortpostsbytime={this.sortpostsbytime}/>} />
        <Route path="/" exact  render={({location}) => <PostsList lable={location.pathname.slice(1)} />} />
        {cats.map(cat => (
          <Route
            path={`/${cat.path}`}
            exact
            render={({location}) => <PostsList lable={location.pathname.slice(1)} />}
            key={cat.name}
          />
        ))}
      </div>
  }
}

Posts.propTypes = {
  cats:PropTypes.arrayOf(
    PropTypes.shape({
      name:PropTypes.string,
      path:PropTypes.string
    })).isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({
    cats:state.cats
})

export default connect(mapStateToProps, null, null, { pure: false })(Posts)
