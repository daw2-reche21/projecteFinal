import React from 'react';
import '../../style/Login.css';
import imageBike from './b.jpg';
import '@fontsource/roboto';
import {FormControl, Typography, InputLabel, FormHelperText, OutlinedInput, Button}
 from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import {userService} from '../../helpers/urls';

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      exist : true
    }
    this.emailHelper = React.createRef();
    this.compareEmail = this.compareEmail.bind(this);
  }

  compareEmail(evt){
    var newUser = this.props.userData;
    newUser.email = evt.target.value;
    this.props.handleUserDataChange(newUser);
    fetch(userService+'/userexist',{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:this.props.userData.email})
    }).then(response =>{
      if(response.status < 200 || response.status >=300){
        console.log('Error fetching');
      }else{
        return response.json();
      }
    }).then(result =>{
      if(result.msg === 'EXIST' ){
        alert('holaa');
        this.setState({exist : false});
        this.emailHelper.text('inexisting email');
      }else{
        alert('holaa');
        this.setState({exist:true});
        this.emailHelper.text('This email already exists');
      }
    })
  }

  render(){
    return (
      <div>
          <Typography variant="h2" component="h2" align="center">
            Keep the life of your Bike
          </Typography>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div style={{flex:1}}>
            <img style={{maxWidth:"500px"}} alt="bicicleta"
                src={imageBike}
            />
        </div>
        <form noValidate autoComplete="off" style={{display:"flex", flexDirection:"column", flex:1}}>
          <Typography variant="h2" component="h2" dense>
                New? Register here!
          </Typography>
          <FormControl variant="outlined">
              <InputLabel htmlFor="email" required>Mail</InputLabel>
              <OutlinedInput id="email" value={this.props.userData.email} onChange={this.compareEmail} label="Mail"  type ="mail" />
              <FormHelperText id="helperEmail" ref = {this.emailHelper}>introduce a correct email</FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
              <InputLabel htmlFor="password" required>Password</InputLabel>
              <OutlinedInput id="password" value={this.props.userData.password} label="Password"/>
              <FormHelperText id="helperPassword">introduce a password</FormHelperText>
          </FormControl>
          <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PersonIcon />}
          >
            Register
          </Button>
        </form>
        
      </div>  
    </div>
  );
    
  } 
}

export default Login;
