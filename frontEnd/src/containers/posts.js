import React, {Component} from "react"
import {connect} from "react-redux"
import PostsLists from './postsList'
import { sortPosts } from "../actions"
import Sort from "../components/sort"
import PropTypes from "prop-types"

class Posts extends Component {

  sortpostsbyvote = lable => {
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
    dispatch(sortPosts(lable, callback))
  }

  sortpostsbytime = lable => {
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
    dispatch(sortPosts(lable, callback))
  }

  render() {
    return (
      <div>
        <Sort
          lable={this.props.location.pathname.slice(1)}
          sortpostsbyvote={this.sortpostsbyvote}
          sortpostsbytime={this.sortpostsbytime}
        />
        <PostsLists lable={this.props.match.params.category} />
      </div>
    )
  }
}

Posts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({})

export default connect(mapStateToProps, null, null, { pure: false })(Posts)


