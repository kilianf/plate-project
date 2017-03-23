import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

let goldTheme = Object.create(darkBaseTheme);

goldTheme.palette.accent1Color = "#a18552"

{/*
  Component lets user select program and add it to their prefs in Firebase
*/}


class Selectprogram extends Component {
  constructor(props){
    super(props);
    this.auth = this.props.fire.auth();
    this.currentDB = this.props.fire.database().ref()
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
    };
  }

  componentWillMount(){
      this.currentDB.once("value")
        .then((snapshot) => {
          const stats = snapshot.child(this.props.user + "/program");
          this.setState({ value: stats.val() })
        });
  }

  updateDB(){
    this.currentDB.child(this.props.user + "/program").set(this.state.value)
    this.props.setProgramStatus(true)
  }

  handleChange(event, index, value) {
    this.setState({value}, this.updateDB);
  }

  render() {
    return (
      <div className="program">
        <div className="App-header">
          <h2>Your program</h2>

          <MuiThemeProvider muiTheme={getMuiTheme(goldTheme)}>
            <SelectField
              floatingLabelText="Select your program"
              value={this.state.value}
              onChange={ this.handleChange }
            >
              <MenuItem value={"5x3x1"} primaryText="5x3x1" />
              <MenuItem value={"Mad Cow"} primaryText="Mad Cow" />
              <MenuItem disabled={true} value={"Texas"} primaryText="Texas" />
              <MenuItem disabled={true} value={"PHUL"} primaryText="PHUL" />
            </SelectField>
          </MuiThemeProvider>          
        </div>
      </div>
    );
  }
}

export default Selectprogram;
