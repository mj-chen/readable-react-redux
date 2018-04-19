import React,{Component}from 'react'
import ThumbUp from "react-icons/lib/md/thumb-up"
import ThumbDown from "react-icons/lib/md/thumb-down"
import PropTypes from "prop-types"


class Thumbs extends Component{
    
    vote=(id,option)=>{
        this.props.vote(id,option)
    }

    render(){
        const {liked, disliked} = this.props
        return <div className="thumb">
            <ThumbUp onClick={(id,option) => this.vote(id,"upVote")} size={ liked ? 30 : 25} color={liked ? "#ee1734" : "#777973"} />
            <ThumbDown onClick={(id,option) => this.vote(id,"downVote")} size={disliked ? 30 : 25} color={disliked ? "#ee1734" : "#777973"} />
          </div>
    }
}

Thumbs.propTypes={
    liked:PropTypes.bool.isRequired,
    disliked:PropTypes.bool.isRequired,
    vote:PropTypes.func.isRequired
}

export default Thumbs