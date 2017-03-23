import React, { Component } from 'react';

{/* Material comps */}
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

{/* Custom comps */}
import Row5x3x1 from './Row5x3x1';
import Selectcycle from './Selectcycle';



class Program5x3x1 extends Component {
  constructor(props){
    super(props);
    this.max = {};
    this.increments = {
      squat: 10,
      bench: 5,
      deadlift: 10,
      press: 5
    }
    this.state = {
      hasProgram: false,
      program: '',
      cycle: 1
    }
  }

  calculateMax(weight,reps,exercise){
    if(this.state.cycle > 1) {
      return Math.round( weight / (1.0278-(0.0278*reps ))) + ((this.increments[exercise] * (this.state.cycle - 1))  / 0.9 )
    }
    return Math.round( weight / (1.0278-(0.0278*reps )))
  }

  setParentCycleState = (value) => {
    this.setState({cycle: value});
  }

  render() {
    const indexer = Object.keys(this.props.currentstats)

    for(var i in this.props.currentstats) {
       if ( indexer.indexOf(i) % 2 === 0 ) {
          let nextIndex = indexer.indexOf(i) + 1;
          let theExercise = Object.keys(this.props.currentstats)[indexer.indexOf(i)];
          let theNumberofReps = this.props.currentstats[indexer[nextIndex]];
          let theWeight = this.props.currentstats[i]
          this.max[i] = this.calculateMax(theWeight,theNumberofReps, theExercise)
       }
    }


    return (
      <div className="A">


        <Selectcycle fire={this.props.fire} user={this.props.user} setParentCycleState={this.setParentCycleState} />
  

        <div className="B">

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <div>
              <Table>
                 <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  >
                   <TableRow>
                     <TableHeaderColumn>Exercises</TableHeaderColumn>
                     <TableHeaderColumn>Week 1</TableHeaderColumn>
                     <TableHeaderColumn>Week 2</TableHeaderColumn>
                     <TableHeaderColumn>Week 3</TableHeaderColumn>
                     <TableHeaderColumn>Week 4</TableHeaderColumn>
                   </TableRow>
                 </TableHeader>
                 
               </Table>
               <Table>
                 <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  >
                   <TableRow>
                     <TableHeaderColumn>Squat</TableHeaderColumn>
                     <TableHeaderColumn>Tuesday</TableHeaderColumn>
                     <TableHeaderColumn></TableHeaderColumn>
                     <TableHeaderColumn></TableHeaderColumn>
                     <TableHeaderColumn></TableHeaderColumn>
                   </TableRow>
                 </TableHeader>
                 <TableBody
                  displayRowCheckbox={false}
                 >
                  
                 <Row5x3x1 max={this.max} exercise={'squat'} set={0}/>
                 <Row5x3x1 max={this.max} exercise={'squat'} set={1}/>
                 <Row5x3x1 max={this.max} exercise={'squat'} set={2}/>



                </TableBody>
               </Table>

               <Table>
                  <TableHeader
                   displaySelectAll={false}
                   adjustForCheckbox={false}
                   >
                    <TableRow>
                      <TableHeaderColumn>Bench</TableHeaderColumn>
                      <TableHeaderColumn>Wednesday</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                   displayRowCheckbox={false}
                  >
                    <Row5x3x1 max={this.max} exercise={'bench'} set={0}/>
                    <Row5x3x1 max={this.max} exercise={'bench'} set={1}/>
                    <Row5x3x1 max={this.max} exercise={'bench'} set={2}/>

                 </TableBody>
                </Table>

               <Table>
                  <TableHeader
                   displaySelectAll={false}
                   adjustForCheckbox={false}
                   >
                    <TableRow>
                      <TableHeaderColumn>Deadlift</TableHeaderColumn>
                      <TableHeaderColumn>Thursday</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                   displayRowCheckbox={false}
                  >

                    <Row5x3x1 max={this.max} exercise={'deadlift'} set={0}/>
                    <Row5x3x1 max={this.max} exercise={'deadlift'} set={1}/>
                    <Row5x3x1 max={this.max} exercise={'deadlift'} set={2}/>

                 </TableBody>
                </Table>

                <Table>
                  <TableHeader
                   displaySelectAll={false}
                   adjustForCheckbox={false}
                   >
                    <TableRow>
                      <TableHeaderColumn>Overhead press</TableHeaderColumn>
                      <TableHeaderColumn>Friday</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                   displayRowCheckbox={false}
                  >

                    <Row5x3x1 max={this.max} exercise={'press'} set={0}/>
                    <Row5x3x1 max={this.max} exercise={'press'} set={1}/>
                    <Row5x3x1 max={this.max} exercise={'press'} set={2}/>


                 </TableBody>
                </Table>
              </div>

            </MuiThemeProvider>  


     



        </div>
      </div>
    );
  }
}

export default Program5x3x1;
