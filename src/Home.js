import React, { Component } from 'react';
import Login from './Login'
import Program from './Program'
import Currentstats from './Currentstats'
import Profilepopup from './Profilepopup'
import Selectprogram from './Selectprogram'
import Typekit from 'react-typekit';
import Isvg from 'react-inlinesvg';


import profileIcon from './profile.svg';
import './App.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.fire = this.props.fire;
    this.state = {
      hasProgram: false,
      loggedin: false,
      uid: '',
      currentstats: {
        bench: 0,
        benchReps: 0,
        deadlift: 0,
        deadliftReps: 0,
        press: 0,
        pressReps: 0,
        squat: 0,
      },
      flash: false,
      isLoaded: false,
      grow: false,
      modal: false,
      profileOpen: false,
    }
    this.programs = [
      "5x3x1",
      "Texas",
      "Madcow",
      "PHUL"
    ]
  }

  componentDidMount(){
    setTimeout(()=>{
      this.setState({ isLoaded: true})
    }, 2000);
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

  largerBorder = () => {
    this.setState({grow: !this.state.grow})
  }
  
  openModal = () => {
    console.log('fired')
    this.setState({modal: !this.state.modal})
  }
  
  setCurrentNumbers = (value) => {
    {/* Tell state user has selected program // Passed as prop to  Selectprogram component */}

    this.setState({ currentstats: value, flash: true }, () => {
      setTimeout(() => this.setState({ flash: false  }), 500)
    })
  }



  profile(){
    {/* Log out of app */}
    
  }


  _logOut(){
    {/* Log out of app */}
    this.fire.auth().signOut();
    this.openModal();
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

  profileAdder = () => {
    this.setState({profileOpen: !this.state.profileOpen})
  }

  render() {
    const isActive = this.state.menuOpen ? 'activeMenu' : '';
    const grow = this.state.grow ? 'grow' : '';
    const modal = this.state.modal ? 'modalFade' : '';
    const profile = this.state.profileOpen ? 'profileOpen' : '';

    {/* Flashes a brief text update */}
    const flashText = this.state.flash ? 'activeColor' : '';

    return (

      <div className={`App ${flashText} ${isActive} ${grow} ${modal} ${profile}`}>
        

        <div className="loader"></div>

        <div className="App-header">
        </div>

        {/* Toggle sidebar */}
        { this.state.loggedin && this.hamburgerButton() }      

        <div className="sidebarMenu">

            {/* Check if logged in // if so, Load select progrom component */}
            { this.state.loggedin && <Selectprogram fire={this.props.fire} user={this.state.uid} setProgramStatus={this.setProgramStatus} /> }

            {/* Check if logged in // if so, enter stats if not entered */}
            { this.state.loggedin && <Currentstats fire={this.props.fire} user={this.state.uid} setCurrentNumbers={this.setCurrentNumbers}/> }

            {/* Edit profile */}
            <div className="actionButton" onClick={()=>{ this.profileAdder() }}><p><span>Edit profile</span><Isvg src={profileIcon} /></p></div>

            {/* Log out of app */}
            <div className="actionButton" onClick={()=>{ this._logOut() }}><p>Sign out</p></div>
            
            <div className="profile pure-g">
              { this.state.profileOpen && <Profilepopup fire={this.props.fire} user={this.state.uid}  profileAdder={ this.profileAdder } /> }
            </div>

        </div>

        {/*Check if logged in */}
        { !this.state.loggedin && <Login fire={this.props.fire} border={ this.largerBorder }  openModal={ this.openModal } />   }
        
        {/* Select program if not selected */}
        { this.state.loggedin && <Program fire={this.props.fire} user={this.state.uid} currentstats={this.state.currentstats} /> }
    
        <Typekit kitId="xkn7avv" />

      </div>
    );
  }
}

export default Home;
