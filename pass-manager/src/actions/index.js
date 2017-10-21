import axios from 'axios'

export const actionUsers = (payload) => {
  return {
    type: 'GET_USER',
    payload
  }
}

export const actionDelUser = (payload) => {
  return {
    type: 'DEL_USER',
    payload
  }
}

export const actionInsUser = (payload) => {
  return {
    type: 'INS_USER',
    payload
  }
}

export const actionEditUser = (payload) => {
  return {
    type: 'EDIT_USER',
    payload
  }
}
export const actionFetch = (payload) => {
  return {
    type: 'FATCH_USER',
    payload
  }
}

export const getUsers = () => {
  return (dispatch, getState) => {
    const url = "http://localhost:3001/posts"
    axios.get(url)
    .then(resp => {
      dispatch(actionUsers(resp.data))
    })
  }
}



export const delUsers = (id, idx) => {
  return (dispatch, getState) => {
    const url = `http://localhost:3001/posts/${id}`
    axios.delete(url)
      .then(resp => {
        console.log('ini idx di action', idx);
        var payload = {
          id: id,
          idx: idx
        }
        dispatch(actionDelUser(payload))
      })
  }
}
