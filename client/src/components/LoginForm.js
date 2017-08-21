import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import superagent from 'superagent';

export default class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsernameChange(event){
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  submitForm(event){
    event.preventDefault();
    superagent
      .post('/auth/v1')
      .send({username: this.state.username, password: this.state.password})
      .end((err, res) => {
        if(err) { this.setState({errorMessage: "Authentication Failed"}); }
        localStorage.setItem('token', res.body.token);
        this.props.onSuccessfulLogin();
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <TextField
            floatingLabelText="UserName"
            onChange={this.handleUsernameChange.bind(this)} 
            value={this.state.username} />
          <br />
          <TextField
            floatingLabelText="Password"
            type="password" 
            onChange={this.handlePasswordChange.bind(this)}
            value={this.state.password} />
          <br />
          <RaisedButton 
            type="submit"
            label="Submit"
          />
        </form>
      </div>
    );
  }
}
