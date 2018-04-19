
const url = "http://localhost:3001";
const myHeader = new Headers({ Authorization: "udacity" })

export const  fetchPosts= ()=>{
    return fetch(`${url}/posts`, {
      method: "GET",
      headers: myHeader
    })
    .then(response => response.json())
}   

export const fetchCats=()=>{
    return fetch(`${url}/categories`, {
      method: "GET",
      headers:myHeader,
    })
    .then(response=>response.json())
   
}

export const addNewPost=(post)=>{
  return fetch(`${url}/posts`, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Authorization": "udacity",
    },
    body: JSON.stringify(post)
  })
  .then(post => post.json())
}

export const fetchFilteredPosts=(cat)=>{
  return fetch(`${url}/${cat}/posts`, {
    method: "GET",
    headers: myHeader
  })
  .then(res=>res.json())
}

export const fetchPost=(id)=>{
  return fetch(`${url}/posts/${id}`,{
    method:"GET",
    headers:myHeader
  })
  .then(res=>res.json())
}

export const fetchComments=(id)=>{
  return fetch(`${url}/posts/${id}/comments`,{
    method: "GET",
    headers: myHeader
  })
  .then(res=>res.json())
}

export const votePost=(id,upordown)=>{
  let payload = {option:`${upordown}`}
  return fetch(`${url}/posts/${id}`, {
    method: "POST",
    headers: {
      Authorization: "udacity",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
}

export const editPost=(id,post)=>{
  return fetch(`${url}/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "udacity",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(res=>res.json())
}

export const removePost=(id)=>{
  return fetch(`${url}/posts/${id}`,{
    method:"DELETE",
    headers:myHeader
  })
    .then(res=>res.json())
}

export const addComment=(comment)=>{
  return fetch(`${url}/comments`, {
    method: "POST",
    headers: {
      Authorization: "udacity",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
  .then(res=>res.json())
}

export const updateComment=(id, comment)=>{
  return fetch(`${url}/comments/${id}`,{
    method:"PUT",
    headers:{
      Authorization:"udacity",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(comment)
  })
  .then(res=>res.json())
}

export const deleteComment=(id)=>{
  return fetch(`${url}/comments/${id}`,{
    method:"DELETE",
    headers:myHeader
  })
  .then(res=>res.json())
}

export const voteComment=(id, upordown)=>{
  let payload = { option: `${upordown}` };
  return fetch(`${url}/comments/${id}`, {
    method: "POST",
    headers: {
      Authorization: "udacity",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(res => res.json())
}