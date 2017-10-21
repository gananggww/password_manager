const defaultState = {
  allUsers: [],

  fatch: ''
}

const UserReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {...state, allUsers: action.payload}
    case 'DEL_USER':
      // const del = {...state}
      // console.log('sebelum delete', del.allUsers);
      // del.allUsers.splice(action.payload.idx, 1)
      // console.log('deleted', del.allUsers);
      // return {...state, allUsers: del.allUsers}
      return {...state, allUsers: [...state.allUsers.filter(d => d.id !== action.payload.id)]}
    case 'INS_USER':
      return {...state, allUsers: state.allUsers.concat(action.payload)}
    case 'EDIT_USER':
      return {...state, allUsers: [...state.allUsers.map(user => user.id === action.payload.id ? action.payload : user)]}
    case 'FATCH_USER':
      return {...state, fatch: action.payload}
    default:
    return state
  }
}

export default UserReducer
