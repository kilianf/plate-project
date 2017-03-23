import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



class Currentstats extends Component {
  constructor(props) {
    super(props);
    this.auth = this.props.fire.auth();
    this.userID = this.props.user;
    this.currentDB = this.props.fire.database().ref()
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      bench: 'Bench',
      benchReps: 0,
      deadlift: 'Deadlift',
      deadliftReps: 0,
      press: 'Press',
      pressReps: 0,
      squat: 'Squat',
      squatReps: 0,
    }
  }

  updateNumbers(value){
    {/* Update the top level state with the current numbers // Goes up to <Home>'s state.currentstats */}
    this.props.setCurrentNumbers(value)
  }

  componentDidMount(){
      this.currentDB.once("value")
        .then((snapshot) => {
          const stats = snapshot.child(this.userID + "/currentstats");
          this.setState({ 
            bench: stats.child('bench').val(),
            deadlift: stats.child('deadlift').val(),
            press: stats.child('press').val(),
            squat: stats.child('squat').val(),
            benchReps: stats.child('benchReps').val(),
            deadliftReps: stats.child('deadliftReps').val(),
            pressReps: stats.child('pressReps').val(),
            squatReps: stats.child('squatReps').val()
          })
          this.updateNumbers(this.state)
        });
  }

  _clicker(){
    this.currentDB.child(this.userID + "/currentstats").update(this.state)
    this.updateNumbers(this.state)
  }



  handleChange(event,typeOfField){
    let ev = event.target.value;
    this.setState({ [typeOfField]: ev });
  }

  handleKeyPress(event){
    if(event.key == 'Enter'){
      this._clicker()
    }
  }


  render() {
    return (
      <div className="numbers" onKeyPress={this.handleKeyPress} >
        <h2>Current numbers:</h2>

        <div className="pure-g">
          <div className="pure-u-2-3 xMark">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                     <TextField             
                    hintText={`${this.state.bench} lbs`}
                    floatingLabelText="Benchpress weight"
                    floatingLabelFixed={true}
                    fullWidth={false}
                    style = {{width: '85%'}}
                    onChange={ (input)=>{ this.handleChange(input, 'bench') } }
                   />
            </MuiThemeProvider>   
          </div>
          <div className="pure-u-1-3">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <TextField
                hintText={`${this.state.benchReps} reps`}
                floatingLabelText="Reps"
                floatingLabelFixed={true}
                fullWidth={false}
                style = {{width: 'auto'}}
                onChange={ (input)=>{ this.handleChange(input, 'benchReps') } }
               />
            </MuiThemeProvider>          
          </div>
        </div>

        <div className="pure-g">
          <div className="pure-u-2-3 xMark">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                     <TextField             
                    hintText={`${this.state.deadlift} lbs`}
                    floatingLabelText="Deadlift weight"
                    floatingLabelFixed={true}
                    fullWidth={false}
                    style = {{width: '85%'}}
                    onChange={ (input)=>{ this.handleChange(input, 'deadlift') } }
                   />
            </MuiThemeProvider>   
          </div>
          <div className="pure-u-1-3">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <TextField
                hintText={`${this.state.deadliftReps} reps`}
                floatingLabelText="Reps"
                floatingLabelFixed={true}
                fullWidth={false}
                style = {{width: 'auto'}}
                onChange={ (input)=>{ this.handleChange(input, 'deadliftReps') } }
               />
            </MuiThemeProvider>          
          </div>
        </div>

        <div className="pure-g">
          <div className="pure-u-2-3 xMark">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                     <TextField             
                    hintText={`${this.state.press} lbs`}
                    floatingLabelText="Press weight"
                    floatingLabelFixed={true}
                    fullWidth={false}
                    style = {{width: '85%'}}
                    onChange={ (input)=>{ this.handleChange(input, 'press') } }
                   />
            </MuiThemeProvider>   
          </div>
          <div className="pure-u-1-3">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <TextField
                hintText={`${this.state.pressReps} reps`}
                floatingLabelText="Reps"
                floatingLabelFixed={true}
                fullWidth={false}
                style = {{width: 'auto'}}
                onChange={ (input)=>{ this.handleChange(input, 'pressReps') } }
               />
            </MuiThemeProvider>          
          </div>
        </div>

        <div className="pure-g">
          <div className="pure-u-2-3 xMark">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                     <TextField             
                    hintText={`${this.state.squat} lbs`}
                    floatingLabelText="Squat weight"
                    floatingLabelFixed={true}
                    fullWidth={false}
                    style = {{width: '85%'}}
                    onChange={ (input)=>{ this.handleChange(input, 'squat') } }
                   />
            </MuiThemeProvider>   
          </div>
          <div className="pure-u-1-3">
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <TextField
                hintText={`${this.state.squatReps} reps`}
                floatingLabelText="Reps"
                floatingLabelFixed={true}
                fullWidth={false}
                style = {{width: 'auto'}}
                onChange={ (input)=>{ this.handleChange(input, 'squatReps') } }
               />
            </MuiThemeProvider>          
          </div>
        </div>
        
        <div className="pure-g">
          <div className="pure-u-2-3">
               <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <RaisedButton 
                    backgroundColor={'#a18552'}
                    label="Save" onClick={()=>{ this._clicker() }}
                  />
               </MuiThemeProvider> 
          </div>
        </div>

      </div>
    );
  }
}

export default Currentstats;