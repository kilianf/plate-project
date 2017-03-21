import React, { Component } from 'react';


class ProgramTexas extends Component {
  constructor(props){
    super(props);
    this.max = {};
    this.state = {
      hasProgram: false,
      program: '',
    }
  }

  componentDidMount(){
  }

  calculateMax(exercise,reps){
      return Math.round( exercise / (1.0278-(0.0278*reps )))
  }


  render() {

    this.max.bench =  this.calculateMax(this.props.currentstats.bench,this.props.currentstats.benchReps)
    this.max.deadlift = this.calculateMax(this.props.currentstats.deadlift,this.props.currentstats.deadliftReps)
    this.max.press =  this.calculateMax(this.props.currentstats.press,this.props.currentstats.pressReps)
    this.max.squat =  this.calculateMax(this.props.currentstats.squat,this.props.currentstats.squatReps)


    {/* Cleaner method for setting 1RM
      
      for(var i in this.props.currentstats) {
         if ( Object.keys(this.props.currentstats).indexOf(i) % 2 === 0 ) {
            console.log(this.props.currentstats[i],this.props.currentstats[i + 1]);
            this.max[i] = this.calculateMax(this.props.currentstats[i],this.props.currentstats[i + 1])
         }
      }

    */}

    return (
      <div className="A">
        <div className="B">

            <p>The is the Texas program</p>
            <p>{`${this.props.currentstats.bench} x ${this.props.currentstats.benchReps }` }</p>
            <p>{`${this.props.currentstats.deadlift} x ${this.props.currentstats.deadliftReps }` }</p>
            <p>{`${this.props.currentstats.press} x ${this.props.currentstats.pressReps }` }</p>
            <p>{`${this.props.currentstats.squat} x ${this.props.currentstats.squatReps }` }</p>

        </div>
      </div>
    );
  }
}

export default ProgramTexas;
