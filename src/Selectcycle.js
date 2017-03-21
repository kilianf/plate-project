import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';



{/*

  Component lets user select program and add it to their prefs in Firebase

*/}


class Selectcycle extends Component {
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
          const stats = snapshot.child(this.props.user + "/cycle");
          this.setState({ value: stats.val() })
        });
  }


  handleChange = (event, index, value) => {
    this.setState({value}, this.updateDB);
    this.props.setParentCycleState(this.state.value)
  }


  updateDB(){
    this.currentDB.child(this.props.user + "/cycle").set(this.state.value);
  }



  render() {
    return (
      <div className="cycleSelect">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <SelectField
              floatingLabelText="Select cycle"
              value={this.state.value}
              onChange={ this.handleChange }

            >
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={3} primaryText="3" />
              <MenuItem value={4} primaryText="4" />
            </SelectField>
          </MuiThemeProvider>          
      </div>
    );
  }
}

export default Selectcycle;
