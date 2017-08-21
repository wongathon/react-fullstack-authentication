import React from 'react';
import Paper from 'material-ui/Paper';
import superagent from 'superagent';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table';

const styles = {
  paper: {
    minHeight: '100px',
    padding: '40px'
  }
};

export default class CartoonsDirectory extends React.Component {
  constructor() {
    super();

    this.state = {
      cartoons: []
    }
  }

  getAuthenticationToken() {
    return localStorage.getItem('token');
  }

  componentDidMount(){
    superagent
      .get('/api/v1/cartoons')
      .set('Authorization', `Bearer ${this.getAuthenticationToken()}`)
      .end((err, res) => {
        if(err) {this.setState({errorMessage: 'Cannot retrieve Cartoons from server'}); return;}
        this.setState({ cartoons: res.body });
      })
  }

  render() {
    const tableRows = this.state.cartoons.map((cartoon) => {
      return(
        <TableRow key={cartoon.id}>
          <TableRowColumn>{cartoon.id}</TableRowColumn>
          <TableRowColumn>{cartoon.name}</TableRowColumn>
          <TableRowColumn>{cartoon.creator}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <Paper style={styles.paper}>
        <h2>Cartoons Directory</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Cartoon</TableHeaderColumn>
              <TableHeaderColumn>Creator</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableRows}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
