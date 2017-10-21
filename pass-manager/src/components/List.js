import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUsers, delUsers, actionEditUser, actionFetch, actionahmad } from '../actions/'
import axios from 'axios'
import { searchPassword } from '../helper/filter.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      validatedit: false,
      username: '',
      password: '',
      url: '',
      id: '',
      createdAt: ''
    };
  }
  componentDidMount () {
    debugger
    this.props.getUser()
  }

  // shouldComponentUpdate (nextProps, nextState){
  //     return true;
  // }
  deleteA (id, idx) {
    // this.props.relyUser.splice(idx, 1)
    this.props.delUser(id, idx)
    // this.forceUpdate()
  }
  updatedUsername (event) {
    this.setState({
      username: event.target.value
    })
  }
  updatedPassword (event) {
    this.setState({
      password: event.target.value
    })
  }
  updatedUrl (event) {
    this.setState({
      url: event.target.value
    })
  }

  goUpdate () {
    axios.put(`http://localhost:3001/posts/${this.state.id}`, {
      username: this.state.username,
      password: this.state.password,
      url: this.state.url,
      createdAt: this.state.createdAt,
      updatedAt: this.convert(new Date ())
    })
    .then(response => {
      this.props.editUser(response.data)
      console.log('ini response berhasil di edit',response.data);
    })
    .catch(err => {
      console.log('ini response berhasil di edit', err);
    })
  }
  convert(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
  }
  cancelEdit () {
    this.setState({
      validatedit: false
    })
  }

  edit () {
    if (this.state.validatedit === true) {
      return (
        <div className="ui basic segment">
        <table className="ui fixed table">
          <thead>
            <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Url</th>
            <th>Submit</th>
          </tr></thead>
          <tbody>
            <tr>
              <td>
                <div className="ui input">
                  <input type="text" value={this.state.username} onChange={(e) => this.updatedUsername(e)}/>
                </div>
              </td>
              <td>
                <div className="ui input">
                  <input type="text" value={this.state.password} onChange={(e) => this.updatedPassword(e)}/>
                </div>
              </td>
              <td >
                <div className="ui input">
                  <input type="text" value={this.state.url} onChange={(e) => this.updatedUrl(e)}/>
                </div>
              </td>
              <td>
                <button className="ui basic green button" onClick={() => this.goUpdate()}>Submit</button>
                <button className="ui basic yellow button" onClick={() => this.cancelEdit()}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      )
    }
  }
  update(data) {
    this.setState({
      validatedit: true,
      username: data.username,
      password: data.password,
      url: data.url,
      createdAt: data.createdAt,
      id: data.id
    })
  }
  fetching (event) {
    this.props.fatchUser(event.target.value)
  }

  render() {
    return (
      <div>
        {this.edit()}
        <div className="ui basic segment">
          <div className="ui fluid icon input">
            <input type="text" onChange={(e)=> this.fetching(e)}/>
            <i className="search icon"></i>
          </div>
        <table className="ui inverted teal selectable fixed table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Url</th>
              <th>Created at</th>
              <th>Updated At</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
          {
            this.props.pass.map((data, idx) => {
              return (
                <tr key={idx}>
                  <td>{data.username}</td>
                  <td>{data.password}</td>
                  <td>{data.url}</td>
                  <td>{data.createdAt}</td>
                  <td>{data.updatedAt}</td>
                  <td>
                    <div className="ui stackable two column grid">
                      <div className="column">
                        <button className="ui icon fluid basic button" onClick={() => {this.deleteA(data.id, idx)}}>
                        <i className="trash icon"></i>
                        </button>
                      </div>
                      <div className="column">
                        <button className="ui icon fluid basic button" onClick={() => this.update(data)}>
                        <i className="edit icon"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        </div>

      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    pass: searchPassword(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUsers()),
    delUser: (id, idx) => dispatch(delUsers(id, idx)),
    editUser: (payload) => dispatch(actionEditUser(payload)),
    fatchUser: (payload) => dispatch(actionFetch(payload))
  }
}

const Conn = connect(mapStateToProps, mapDispatchToProps)(App)
export default Conn;
