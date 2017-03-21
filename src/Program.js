import React, { Component } from 'react';
import Program5x3x1 from './Program5x3x1'
import ProgramTexas from './ProgramTexas'
import ProgramMadCow from './ProgramMadCow'
import ProgramPHUL from './ProgramPHUL'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

{/*

  Component selects and runs the current program based on current program in Firebase

*/}



class Program extends Component {
  constructor(props){
    super(props);
    this.fire = this.props.fire;
    this.currentDB = this.props.fire.database().ref(this.props.user)
    this.state = {
      hasProgram: false,
      program: ''
    }
  }

  componentWillMount(){
      this.currentDB.on("value",
        (snapshot) => {
          const stats = snapshot.child("program");
          this.setState({ program: stats.val() })
      });
  }

  setProg(){
    switch(this.state.program) {
      case '5x3x1' :
        return <Program5x3x1 currentstats={this.props.currentstats} fire={this.props.fire} user={this.props.user} />;
      case 'Texas' :
        return <ProgramTexas currentstats={this.props.currentstats} />;
      case 'Mad Cow' :
        return <ProgramMadCow currentstats={this.props.currentstats} />;
      case 'PHUL' :
        return <ProgramPHUL currentstats={this.props.currentstats} />;  
    } 
  }


  render() {
    return (
      <div className="A">
        <div className="B">
          <h2>{this.state.program}</h2>

            { this.setProg() }

        </div>
      </div>
    );
  }
}

export default Program;
