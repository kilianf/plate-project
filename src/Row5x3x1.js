import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


{/*

  Component selects and runs the current program based on current program in Firebase

*/}


class Row5x3x1 extends Component {
  constructor(props){
    super(props);  
    this.percentages = [
      [0.65, 0.70, 0.75, 0.40],
      [0.75, 0.80, 0.85, 0.50],
      [0.85, 0.90, 0.95, 0.60]
    ]
  }

  calculateLift(lift, week){
    return Math.round((((this.props.max[lift] * 0.9) * this.percentages[this.props.set][week]) / 5)) * 5
  }


  render() {
    var tableRows = []

    for(var i = 0; i <=3; i++) {
      tableRows.push( <TableRowColumn key={i}>{this.calculateLift(this.props.exercise, i)}</TableRowColumn> )
    }

    return (
        <TableRow>
          <TableRowColumn>Set {this.props.set + 1}</TableRowColumn>
          { tableRows }
        </TableRow>
    );
  }
}

export default Row5x3x1;
