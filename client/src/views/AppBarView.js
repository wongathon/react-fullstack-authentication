import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import { Redirect } from 'react-router-dom';

export default class AppBarView extends React.Component {
  handleLogout() {
    localStorage.removeItem('token');
    this.setState();
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token.length > 10;
  }

  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();
    
    return (
      <div>
        {!isAlreadyAuthenticated ? <Redirect to={{pathname: '/'}} /> : (
          <AppBar
            title="Cartoons Directory"
            iconElementRight={<FlatButton label="Logout" />}
            onTouchTap={this.handleLogout.bind(this)}
            />
        )}
      </div>
    );
  }
}
