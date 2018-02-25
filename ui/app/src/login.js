import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ReactDOM from 'react-dom';
import Paycard from './paycard.js';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
  
  width: "70%",
  marginLeft:20,
  marginTop:20,
  marginBottom:2,
  display: 'inline-block',
 fontFamily: 'Noticia Text',
 borderRadius:20
};
const style1 = {
  height: 400,
  width: "100%",
  textAlign:'center',
  display: 'inline-block',
 fontFamily: 'Noticia Text'
};

class Login extends React.Component{
	
	constructor()
	{
		super();
		this.state={
			username:"",
			password:"",
			output:"",
			log:false
		}
	}
	
sign()
{
	var url = "https://auth.backpedal70.hasura-app.io/v1/signup";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": this.state.username,
        "password": this.state.password
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	
	 var authToken = result.auth_token
	 if(authToken)
	 {
	 window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
	 ReactDOM.render(<b>User Registered Successfully</b>,document.getElementById('pro'));
	 }
	 else{
		ReactDOM.render(<b>{result.message}</b>,document.getElementById('pro')); 
	 }
	 })
.catch(function(error) {
	console.log('Request Failed:' + error);
});
}
	check()
	{
	
var authToken;
	
	

var url = "https://auth.backpedal70.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {"username": this.state.username,
        "password": this.state.password
    }
};

requestOptions.body = JSON.stringify(body);

fetch(url, requestOptions)
.then(function(response) {
	return response.json();
})
.then(function(result) {
	console.log(result);
  authToken = result.auth_token
	     window.localStorage.setItem('HASURA_AUTH_TOKEN', authToken);
	  if(authToken)
	  {
		  ReactDOM.render(
		  <Paycard/>
  ,
  document.getElementById('root')
);
	  }
	  else{
		   ReactDOM.render(<b>Credentials not correct</b>
  ,
  document.getElementById('pro')
);
	  }
})
.catch(function(error) {
	console.log('Request Failed:' + error);
});



}
render(){
	
	if(!this.state.log)
	{
return	(
    <MuiThemeProvider>
    <div>
    <Paper style={style} zDepth={1} >
	<div style={{backgroundColor:'#00808e',padding:18,textAlign:'center',borderRadiusTop:20}}>
	<h2 style={{marginLeft:10 ,color:'#fff'}}>Login & Signup</h2>
	</div>
	<span style={{marginLeft:10}}>User Name  </span>
	<TextField
	 refs="a"
	 onChange={e => this.setState({ username: e.target.value })}
      hintText="User Name"
	  
      floatingLabelText="Enter your User Name"
	  style={{width:'70%',marginLeft:10}}
     /><br />
     <span style={{marginLeft:10}}>Password  </span>	
	 <TextField
	 refs="b"
	 onChange={e => this.setState({ password: e.target.value })}
      hintText="Password"
      floatingLabelText="Enter your Password"
	  type="password"
	  style={{width:'70%',marginLeft:10}}
    /><br />
	
	<br/>
	<div style={{textAlign:'center'}}> 
	<FlatButton label="Login" backgroundColor="#00838f"  style={{borderRadius:40,color:'#fff'}} onClick={this.check.bind(this)}/> 
	<FlatButton label="Register"  backgroundColor="#00838f"  style={{marginLeft:40,borderRadius:40,color:'#fff'}} onClick={this.sign.bind(this)}/></div>
	<br/>
	
	<br/>
	
	<div id="pro" style={{padding:20,backgroundColor:'#00838f',color:'#fff',textAlign:'center'}}>
	</div>
	</Paper>
	</div>
	  </MuiThemeProvider>
);
	}
}}
export default Login;