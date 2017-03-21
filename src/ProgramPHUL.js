import React, { Component } from 'react';


class Program extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasProgram: false,
      program: ''
    }
  }

  componentWillMount(){

  }

  render() {
    return (
      <div className="A">
        <div className="B">

            <p>The is the PHUL program</p>

        </div>
      </div>
    );
  }
}

export default Program;
