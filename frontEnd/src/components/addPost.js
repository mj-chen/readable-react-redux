import React from "react"
import FaEdit from "react-icons/lib/fa/edit"
import PropTypes from "prop-types"

const AddPost=({onOpen})=> (
        <FaEdit
            size={40}
            onClick={onOpen}
            color="white"
            style={{
            backgroundColor: "#70c78d",
            padding: "1px",
            borderRadius: "5px",
            display:'inline',
            float:'right',
            }}
        />
)  

AddPost.propTypes={
    onOpen:PropTypes.func.isRequired
}

export default AddPost