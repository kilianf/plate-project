import React, { Component } from 'react';
import Login from './Login'
import Program from './Program'
import Currentstats from './Currentstats'
import Selectprogram from './Selectprogram'
import Typekit from 'react-typekit';


import logo from './logo.svg';
import './App.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.fire = this.props.fire;
    this.state = {
      hasProgram: false,
      loggedin: false,
      uid: '',
      currentstats: {}
    }
    this.programs = [
      "5x3x1",
      "Texas",
      "Madcow",
      "PHUL"
    ]
  }
  componentWillMount(){
    this.fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ 
          menuOpen: false,
          loggedin: true, 
          uid: user.uid
        })
        
      } else {
        this.setState({ loggedin: false })
      }
    })
    this.props.fire.database().ref().once("value")
      .then((snapshot) => {
        {/*  */}
        const checkProgram = snapshot.child(this.state.uid + "/currentprogram").exists();
        this.setState({ hasProgram: checkProgram })
      });
  }

  setProgramStatus = (value) => {
    {/* Tell state user has selected program // Passed as prop to  Selectprogram component */}
    this.setState({ hasProgram: value })
  }
  
  setCurrentNumbers = (value) => {
    {/* Tell state user has selected program // Passed as prop to  Selectprogram component */}
    this.setState({ currentstats: value })
  }


  _logOut(){
    {/* Log out of app */}
    this.fire.auth().signOut();
    this.toggleMenu();
  }

  hamburgerButton(){
    return (
      <button onClick={()=>{ this.toggleMenu() }} id="campaign-expand">
        <div id="ham">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    )
  }

  toggleMenu(){
    {/* Toggle sidebar */}
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render() {
    const isActive = this.state.menuOpen ? 'active' : '';

    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        <div className={`${isActive} sidebarMenu`}>
            
            {/* Toggle sidebar */}

            { this.state.loggedin && this.hamburgerButton() }


            {/* Check if logged in // if so, Load select progrom component */}
            { this.state.loggedin && <Selectprogram fire={this.props.fire} user={this.state.uid} setProgramStatus={this.setProgramStatus} /> }

            {/* Check if logged in // if so, enter stats if not entered */}
            { this.state.loggedin && <Currentstats fire={this.props.fire} user={this.state.uid} setCurrentNumbers={this.setCurrentNumbers}/> }
            
            {/* Log out of app */}
            <div className="signOut" onClick={()=>{ this._logOut() }}><p>Sign out</p></div>

        </div>

        {/*Check if logged in */}
        { !this.state.loggedin && <Login fire={this.props.fire} />   }
        
        {/* Select program if not selected */}
        { this.state.loggedin && <Program fire={this.props.fire} user={this.state.uid} currentstats={this.state.currentstats} /> }
    
        <Typekit kitId="xkn7avv" />

      </div>
    );
  }
}

export default Home;