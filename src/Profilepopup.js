import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Isvg from 'react-inlinesvg';

import back from './back.svg';

const styles = {
  button: {
    margin: '0 12px 20px 0',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


{/*

  Component lets user select program and add it to their prefs in Firebase

*/}


class Profilepopup extends Component {
  constructor(props){
    super(props);
    this.auth = this.props.fire.auth();
    this.storage = this.props.fire.storage();
    this.storageRef = this.storage.ref();
    this.currentDB = this.props.fire.database();
    this.state = {
      value: '',
      file: '',
      image: '',
      inputValue: '',
      imagePreviewUrl: '',
      userID: '',
      imagePath: '',
    };
  }

  componentWillMount(){
    this.currentDB.ref().once("value")
      .then((snapshot) => {
        const stats = snapshot.child(this.props.user + "/profile/before");
        this.setState({ 
          imagePath: stats.child('image').val()
        })
      });
  }

  _handleSubmit = (e, whichPic) => {
    
    e.preventDefault();
    let file = this.state.file;
    let fileName = this.state.file.name;
    let fullPath = this.props.user + '/' + fileName;
    this.storageRef.child(fullPath).put(file).then((snapshot)=>{
      this.storageRef.child(fullPath).getDownloadURL().then((url)=>{
        this.currentDB.ref(this.props.user + '/profile/' + whichPic).update({image: url})
        this.setState({imagePath: url})
      });

    })
  }

  renderImage = (e) => {
    console.log(e)
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        image: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (      

          <div className="pure-g">

              <div className="pure-u-1-1">
                <h2>Your profile</h2>
              </div>
              <a onClick={this.props.profileAdder}><img src={back} alt=""/></a>
              <div className="pure-u-1-1">
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                         <TextField             
                        hintText={`${this.state.bench}`}
                        floatingLabelText="Height"
                        floatingLabelFixed={true}
                        fullWidth={false}
                        style = {{width: '100%'}}
                        onChange={ (input)=>{ this.handleChange(input, 'bench') } }
                       />
                </MuiThemeProvider>   
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                         <TextField             
                        hintText={`${this.state.bench}`}
                        floatingLabelText="Weight"
                        floatingLabelFixed={true}
                        fullWidth={false}
                        style = {{width: '100%'}}
                        onChange={ (input)=>{ this.handleChange(input, 'bench') } }
                       />
                </MuiThemeProvider>   

                <h2>Progress pics</h2>

                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <RaisedButton
                    containerElement='label' 
                    backgroundColor={'#a18552'}
                    label="Choose an Image"
                    style={styles.button}
                  >
                    <input type="file"label="Choose file" onChange={ this.renderImage } style={styles.exampleImageInput} />
                  </RaisedButton>

                </MuiThemeProvider> 
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                   <RaisedButton 
                     containerElement='label' 
                     backgroundColor={'#a18552'}
                     label="Upload" onClick={ (e)=> this._handleSubmit(e, 'before') }
                   />
                </MuiThemeProvider> 


            <div><img src={this.state.image} /></div>
            <div><img src={this.state.imagePath} /></div>


              </div>
              
            </div>

    );
  }
}

export default Profilepopup;
