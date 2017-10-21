export const searchPassword = ({ allUsers, fatch }) => {
  let fatchState = fatch.trim()
  if (fatchState === '')
    return allUsers
  else
    return allUsers.filter(item => item.url.includes(fatchState) || item.username.includes(fatchState) || item.password.includes(fatchState) )
}
