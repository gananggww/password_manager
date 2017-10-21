import React, { Component } from 'react';
import { Provider } from 'react-redux'
import './App.css';
import Form from './components/Form.js'
import List from './components/List.js'
import store from './store'

class App extends Component {
  constructor () {
    super()
    this.state = {
      validatecreate: false,
      buttonText: 'Save Your Account',
      color: 'blue'
    }
  }
  formIns () {
    if (this.state.validatecreate === true) {
      return (
        <div className="ui segment">
          <div className="ui basic segment">
            <h1 style={{textAlign:"center"}}>Save Your Account</h1>
          </div>
          <Form />
        </div>
      )
    }
  }
  showoff () {
    if (this.state.validatecreate === true) {
      this.setState({
        validatecreate: false,
        buttonText: 'Show for create',
        color: 'blue'
      })
    } else{
      this.setState({
        validatecreate: true,
        buttonText: 'HIDE',
        color: 'red'
      })
    }
  }
  render() {
    return (
      <Provider store={store}>
      <div className="App ui basic segment">
        <div className="ui container segment">
          <div className="ui segmant">
            <button className={`ui fluid basic ${this.state.color} button`} onClick={()=> this.showoff()}>{this.state.buttonText}</button>
            {this.formIns()}
          </div>
          <div className="ui segment">
            <List />
          </div>
        </div>
      </div>
      </Provider>
    );
  }
}

export default App;
