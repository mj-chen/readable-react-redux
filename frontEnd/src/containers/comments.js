import React, {Component} from "react"
import {connect} from "react-redux"
import Pen from "react-icons/lib/md/create"
import Bin from "react-icons/lib/md/delete"
import Thumbs from "../components/thumb"
import {editComment, removeComment, voteComment, likeComment, dislikeComment}from "../actions"
import EditComments from "../components/editComment"
import PropTypes from "prop-types"

class Comments extends Component {
  
    state={
        editingComment:null,
    }

    toggleEditing=(id)=>{
        this.setState((state)=>{
            return {editingComment:id}
        })
    }

    toggleDelete=(id)=>{
        this.props.dispatch(removeComment(id))
    }

    updateComment=(id,updatedComment)=>{
        this.props.dispatch(editComment(id, updatedComment))
        this.setState({
            editingComment:null
        })
    }

    vote=(id,option)=>{
        const {dispatch}=this.props
        dispatch(voteComment(id,option))
         if (option === "upVote") {
           dispatch(likeComment(id))
         } else {
           dispatch(dislikeComment(id))
         }
    }
   
    render(){
        const { comments, likedComments, dislikedComments } = this.props 
        const {editingComment}=this.state
        return (
          <div className="comments">
            <hr />
            <ul className="comments_list">
              {comments.map(comment => <li key={comment.id}>
                  <header className="edit">
                    <Pen size={25} color="#35aa81" onClick={()=>this.toggleEditing(comment.id)} />
                    <Bin size={25} color="#d73838" onClick={()=>this.toggleDelete(comment.id)} />
                  </header>
                  <section>
                    {editingComment !== comment.id && <p>{comment.body}</p>}
                    {editingComment === comment.id && <EditComments comment={comment} updateComment={this.updateComment}/>}
                  </section>
                  <footer className="list_footer">
                    <Thumbs vote={(id,option)=>this.vote(comment.id,option)} 
                            liked={likedComments.indexOf(comment.id)===-1?false:true}
                            disliked={dislikedComments.indexOf(comment.id) ===-1?false:true}
                    />
                    <span>
                      {" "}
                      <strong>
                        {comment.voteScore}
                      </strong> {comment.voteScore === 1 || comment.voteScore === 0 ? " vote" : " votes"}
                    </span>
                    <span>
                      {" "}
                      Submitted at <strong>
                        {new Date(
                          comment.timestamp
                        ).toLocaleDateString()}
                      </strong>
                    </span>
                    <span>
                      By <strong>{comment.author}</strong>
                    </span>
                  </footer>
                  <hr />
                </li>)}
            </ul>
          </div>)
    }
}

Comments.propTypes = {
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
  likeComments:PropTypes.arrayOf(PropTypes.string),
  dislikeComment:PropTypes.arrayOf(PropTypes.string)
}

const mapStateToProp=(state)=>({
    comments:state.comments,
    likedComments:state.likedComments,
    dislikedComments:state.dislikedComments
})

export default connect(mapStateToProp)(Comments)