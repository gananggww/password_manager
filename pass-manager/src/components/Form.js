import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import { actionInsUser } from '../actions/'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      password: '',
      username: '',
      uppercase: {
        status : false,
        msg: 'harus ada huruf besar'
      },
      lowercase: {
        status: false,
        msg: 'harus ada huruf kecil'
      },
      exchar: {
        status: false,
        msg: 'harus ada character spesial'
      },
      number: {
        status: false,
        msg: 'harus ada number'
      },
      lengths: {
        status: false,
        msg: 'harus lebih dari lima'
      },
      logmsg: 'Berhasil ditambahkan',
      wrongmsg: ''
    };
  }
  updateUrl (event) {
    // var value = event.target.value
    // var reg = value..match(/^(?=.*[A-Z]).+$/) !== null
    this.setState({
      url: event.target.value
    })
  }
  updateUsername (event) {
    this.setState({
      username: event.target.value
    })
  }
  updatePassword (e) {
    this.setState({
      password: e.target.value
    });
    (/^(?=.*[A-Z]).+$/).test(e.target.value) ? this.setState({uppercase: {status:true}}) : this.setState({uppercase: {status:false}});
    (/^(?=.*[a-z]).+$/).test(e.target.value) ? this.setState({lowercase: {status:true}}) : this.setState({lowercase: {status:false}});
    (/^(?=.*[_\W]).+$/).test(e.target.value) ? this.setState({exchar: {status:true}}) : this.setState({exchar: {status:false}});
    (/^(?=.*\d).+$/).test(e.target.value) ? this.setState({number: {status:true}}) : this.setState({number: {status:false}});
    e.target.value.length >= 5 ? this.setState({lengths:{status:true}}) : this.setState({lengths:{status: false}})
  }
  submitForm () {
    var that = this
    axios.post('http://localhost:3001/posts/', {
      username: that.state.username,
      url: that.state.url,
      password: that.state.password,
      createdAt: this.convert(new Date()),
      updatedAt: null
    })
    .then(resp => {
      this.props.insert(resp.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  convert(date) {
    return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
  }

  typeLength () {
    if(this.state.lengths.status) {
      return (<div className="ui green message"><i className="checkmark box icon"></i>atleast any five character (ex: QW3rT1)</div>)
    } else {
      return (<div className="ui red message">atleast any five character (ex: QW3rT1)</div>)
    }
  }

  typeUpper () {
    if(this.state.uppercase.status) {
      return (<div className="ui green message"><i className="checkmark box icon"></i>atleast any one uppercase (ex: QWERTY)</div>)
    } else {
      return (<div className="ui red message">atleast any one uppercase (ex: QWERTY)</div>)
    }
  }

  typeLower () {
    if(this.state.lowercase.status) {
      return (<div className="ui green message"><i className="checkmark box icon"></i>atleast any one lowercase (ex: qwerty)</div>)
    } else {
      return (<div className="ui red message">atleast any one lowercase (ex: qwerty)</div>)
    }
  }
  typeChar () {
    if(this.state.exchar.status) {
      return (<div className="ui green message"><i className="checkmark box icon"></i>atleast any one special character (ex: !@#$%^&*)</div>)
    } else {
      return (<div className="ui red message">atleast any one special character (ex: !@#$%^&*)</div>)
    }
  }
  typeNumber () {
    if(this.state.number.status) {
      return (<div className="ui green message"><i className="checkmark box icon"></i>atleast any one number (ex: 1234567890)</div>)
    } else {
      return (<div className="ui red message">atleast any one number (ex: 1234567890)</div>)
    }
  }

  guardian () {
    if (this.state.password !== '' && (this.state.number.status && this.state.number.status && this.state.number.status && this.state.number.status && this.state.lengths.status) === true) {
      if (this.state.username !== '' ) {
        if (this.state.url !== '') {
          this.submitForm()
          this.forceUpdate()
        } else {
          this.setState({
            wrongmsg: 'url'
          })
        }
      } else {
        this.setState({
          wrongmsg: 'username'
        })
      }
    } else {
      this.setState({
        wrongmsg: 'password'
      })
    }
  }
  stylePassField() {
    if (this.state.password !== '' && (this.state.lengths.status && this.state.number.status && this.state.number.status && this.state.number.status && this.state.number.status) === false) {
        return 'error'
    } else {
      return ''
    }
  }

  errmsg() {
    if (this.state.wrongmsg === 'username') {
      return (
        <div className="ui segment basic">
          <div class="ui error message">
            <div class="header">Peringatan!</div>
            <p>Username tidak boleh kosong broo..!</p>
          </div>
        </div>

      )
    }
    if (this.state.wrongmsg === 'password') {
      return (
        <div className="ui segment basic">
          <div class="ui error message">
            <div class="header">Peringatan!</div>
            <p>Password tidak boleh kosong bro..!</p>
          </div>
        </div>
      )
    }
    if (this.state.wrongmsg === 'url') {
      return (
        <div className="ui segment basic">
          <div class="ui error message">
            <div class="header">Peringatan!</div>
            <p>Format URL salah bro</p>
          </div>
        </div>

      )
    }
  }

  render() {
    console.log(this.typeNumber());
    return (
      <div>
          {this.errmsg()}
        <form className="ui basic segment form">
          <div className="field">
            <label>Url</label>
            <input type="text" placeholder="Url" onChange={(e) => this.updateUrl(e)} required/>
          </div>
          <div className="field">
            <label>Username</label>
            <input type="text" placeholder="Username" onChange={(e) => this.updateUsername(e)} required/>
          </div>
          <div className={`field ${this.stylePassField()}`}>
            <label>Password</label>
            <input type="password" placeholder="Password" onChange={(e) => this.updatePassword(e)} required/>
          </div>
          <button className="ui fluid basic green button" type="button" onClick={()=> this.guardian()} >Submit</button>
        </form>
        <div className="ui stackable two column basic segment grid">
          <div className="column">
            {this.typeNumber()}
          </div>
          <div className="column">
            {this.typeChar()}
          </div>
          <div className="column">
            {this.typeLower()}
          </div>
          <div className="column">
            {this.typeUpper()}
          </div>
          <div className="column">
            {this.typeLength()}
          </div>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    insert: (payload) => dispatch(actionInsUser(payload)),
  }
}

const Conn = connect(null, mapDispatchToProps)(App)
export default Conn;
