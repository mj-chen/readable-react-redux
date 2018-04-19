import React, { Component } from "react"
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchCats, fetchFilteredPosts, fetchPosts} from '../actions'
import {RECEIVE_ALL_POSTS} from '../constants/ActionTypes'
import PropTypes from 'prop-types'


class Navigation extends Component{
   
    componentDidMount(){
        this.props.dispatch(fetchCats())
    }
    
    filterPosts=(catName)=>{
        const {dispatch} = this.props
        if (catName === RECEIVE_ALL_POSTS){
          dispatch(fetchPosts)
        }else{
          dispatch(fetchFilteredPosts(catName))
        }
    }

    render(){
        const {cats, dispatch} = this.props
        return <div className="nav">
            <ul className="cat">
              <NavLink 
                to="/" 
                exact
                activeClassName="selected" 
                className="category" 
                onClick={()=>dispatch(fetchPosts(RECEIVE_ALL_POSTS))}
              >
                <li key="all">All</li>
              </NavLink>
              {cats.map(cat => (
                <NavLink
                  key={cat.name}
                  to={`/${cat.path}`}
                  exact
                  activeClassName="selected"
                  className="category"
                  onClick={() => this.filterPosts(cat.name)}
                >
                  <li key={cat.name}>{cat.name}</li>
                </NavLink>
              ))}
            </ul>
            <hr />
          </div>
    }
}

Navigation.propTypes = {
  cats:PropTypes.arrayOf(PropTypes.shape({
    name:PropTypes.string,
    path:PropTypes.string
  })).isRequired,
  dispatch:PropTypes.func.isRequired
}

const mapStateToProps=(state)=>({cats: state.cats})
  
export default connect(mapStateToProps, null, null, {pure:false})(Navigation)
