import React, { Component } from 'react';

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
    this.props.setParentCycleState(value)
  }

  updateDB(){
    this.currentDB.child(this.props.user + "/cycle").set(this.state.value);
  }

  render() {
    return (
      <div className="cycleSelect pure-g">
        <div className="pure-u-1 pure-u-md-1-4">
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <SelectField
              floatingLabelText="Select cycle"
              value={this.state.value}
              onChange={ this.handleChange }
              style = {{width: '100%'}}
            >
              <MenuItem value={1} primaryText="Month 1" />
              <MenuItem value={2} primaryText="Month 2" />
              <MenuItem value={3} primaryText="Month 3" />
              <MenuItem value={4} primaryText="Month 4" />
            </SelectField>
          </MuiThemeProvider>
        </div>          
      </div>
    );
  }
}

export default Selectcycle;
