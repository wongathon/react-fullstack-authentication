import React from 'react';
import Paper from 'material-ui/Paper';
import LoginForm from '../components/LoginForm';

import { Redirect } from 'react-router-dom';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px'
  }
};

export default class Login extends React.Component {

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }

  handleSuccessfulLogin() {
    this.setState();
  }

  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();

    return (
      <div>
        {isAlreadyAuthenticated ? <Redirect to={{pathname: '/app/directory'}} /> : (
          <Paper style={styles.paper}>
            <h2>Login</h2>
            <LoginForm onSuccessfulLogin={this.handleSuccessfulLogin.bind(this)}/>
          </Paper>
        )}
      </div>
    );
  }
}
