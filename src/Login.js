import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Isvg from 'react-inlinesvg';
import logo from './logo.svg';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: 'Email',
      password: 'Password Field',
      loggedIn: false,
      errorEmail: '',
      errorPassword: ''
    }
    this.auth=this.props.fire.auth();
    this.userID=this.uid
  }

  loadForm(){
    return (
      <div className="modal">
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
             <TextField
            hintText={this.state.email}
            style = {{width: '100%'}}
            errorText={this.state.errorEmail}
            onChange={ (input)=>{ this.handleChange(input, 'email') } }
           />
        </MuiThemeProvider>          
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <TextField
              hintText={this.state.password}
              floatingLabelText="Password"
              type="password"
              style = {{width: '100%'}}
              errorText={this.state.errorPassword}
              onChange={ (input)=>{ this.handleChange(input, 'password') } }
            />
        </MuiThemeProvider>  
        
        <a onClick={(e)=>{ this._clicker() }}>Sign in</a>    

      </div> 
    )
  }

  _clicker(){
    const email = this.state.email;
    const password = this.state.password;
    this.auth.signInWithEmailAndPassword(email,password).catch((error) => {
      if(error.code === 'auth/invalid-email') {
        this.setState({errorEmail: error.message})
      } else {
        this.setState({errorPassword: error.message})
      }
    });
  }

  _logOut(){
    alert('logged out')
    this.auth.signOut();
  }

  toggleModal(){
    {/* Toggle sidebar */}
    this.setState({modalActive: !this.state.modalActive})
    this.props.openModal();
  }

  handleChange(event,typeOfField){
    let ev = event.target.value;
    if(typeOfField === 'email') {
      this.setState({
        email: ev
      })
    } else {
      this.setState({
        password: ev
      })
    }
  }



  render() {
    const activeModal = this.state.modalActive ? 'active' : '';

    return (
      <div className="login">
        
        <Isvg src={logo} />  
        
        <a onClick={()=>{ this.toggleModal()}}  onMouseEnter={ this.props.border } onMouseLeave={ this.props.border } >Login</a>

        <div className={`${activeModal} loginModal`}>
          { !this.state.loggedIn && this.loadForm() }
        </div>
        
        
    
      </div>
    );
  }
}

export default Login;