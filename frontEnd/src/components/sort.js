import React, { Component } from "react"
import TiArrowDown from "react-icons/lib/ti/arrow-down"
import FaAngleDoubleDown from "react-icons/lib/fa/angle-double-down"
import classnames from "classnames"
import PropTypes from "prop-types"

class Sort extends Component {

    state={
        sort:false,
    }

    toggleSort=()=>{
        this.setState((state)=>({
            sort:!state.sort
        }))
    }

    render(){
        const { lable, sortpostsbyvote, sortpostsbytime } = this.props
        const {sort} = this.state
        return(
         <div id='toggle'>
            <label className='toggleSort' onClick={this.toggleSort}>
              Sort By <FaAngleDoubleDown />
            </label>
            <div className={classnames({ 
                                        sort: sort,
                                        unsort:!sort
                            })}
            >
              <ul>
                <li onClick={()=>sortpostsbytime(lable)}>TimeStamp </li>
                <li onClick={()=>sortpostsbyvote(lable)}>VoteScore <TiArrowDown size={30} /></li>
              </ul>
            </div>   
         </div>
        )
    }
}

Sort.propTypes = {
    lable:PropTypes.string.isRequired,
    sortpostsbyvote:PropTypes.func.isRequired,
    sortpostsbytime:PropTypes.func.isRequired
}

export default Sort