import React from 'react';
import '../style/Login.css';
import Footer from './general/Footer'
import Header from './general/Header'
import Login from './login/Login'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={  
        userData : {
            id:'',
            email: '',
            isLogin : false,
            name: '',
            password:''
        }
    }
    this.handleUserDataChange = this.handleUserDataChange.bind(this);
  }
  handleUserDataChange (userData){
    this.setState({userData: userData});
  }
  render(){
      let bodyRender;
      if(!this.state.userData.isLogin){
        bodyRender = <Login userData = {this.state.userData} handleUserDataChange={this.handleUserDataChange}  />; 
      }
    return(
      <div>
        <Header isLogin = {this.state.userData.isLogin}   />  
        {bodyRender}
        <Footer isLogin = {this.state.userData.isLogin}  />
      </div>
    )
  } 
}

export default App;
