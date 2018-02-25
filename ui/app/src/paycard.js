import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ReactDOM from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';
const style1 = {
  
  width: "100%",
  marginLeft: 20,
  marginTop:10,
  display: 'inline-block',
 fontFamily: 'Noticia Text'
};

class Paycard  extends React.Component{
	
	constructor()
	{
		super();
		this.state={
			name:"",
			number:"",
			expm:0,
			expy:0,
			cvc:'',
			amount:0,
			email:"",
			itemId:""
		}
	}
	update()
	{
		
		
		    var details = {
    'card[name]':this.state.name,
    'card[number]':this.state.number,
    'card[exp_month]':this.state.expm,
    'card[exp_year]':this.state.expy,
    'card[cvc]': this.state.cvc
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch('https://api.stripe.com/v1/tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer pk_test_OgtpYLyOzrBnlokVVbc4rlhG'
    },
    body: formBody
  })
      .then((response) => response.json())
      .then((responseJson) => {
       if(responseJson.id){
	   this.setState({itemId:responseJson.id});
	   ReactDOM.render(
	<MuiThemeProvider>
       <div>
       <Paper style={{width: "100%",
  margin: 20,
  display: 'inline-block',
 fontFamily: 'Noticia Text',
 textAlign:'center'}} zDepth={1}>
	   <br/>
	   <h3 style={{marginLeft:30,color:'#00838f'}}>Proceed to pay {this.state.amount} USD  .....</h3>
	   <br/>
	   <br/>
	   <FlatButton label="Pay Now"  backgroundColor="#00838f"  style={{borderRadius:40,margin:30,color:'#fff'}} onClick={this.update1.bind(this)} />
	   <br/>
	   </Paper>
       </div>
	   </MuiThemeProvider>,
  document.getElementById('root')
);	
	   
	   }
	   else{
		   ReactDOM.render(<b>Enter Correct Information</b>,document.getElementById("pro"))
	   }
	   
	   })
      .catch((error) => {
        console.error(error);
      });
	
	}
	
	update1(){
		 ReactDOM.render(<MuiThemeProvider>
		 <Paper style={{width: "100%",
  margin: 20,
  display: 'inline-block',
 fontFamily: 'Noticia Text',
 textAlign:'center'}} zDepth={1}>
	   <br/><CircularProgress size={80} thickness={5} />
	   </Paper></MuiThemeProvider>,document.getElementById('root'));	
	   
	   console.log( this.state.amount);
		 let formData = new FormData();
    formData.append('stripeToken', this.state.itemId);
    formData.append('stripeEmail', this.state.email);
    formData.append('stripeAmount', this.state.amount+"00");
	
	
	
	fetch('https://app.backpedal70.hasura-app.io/charge', { 
    method: 'POST',
	
    body: formData
    }) 

      .then((response) => {
        console.log(response)
        if(response.status!=200)
        {
             
	   ReactDOM.render(
	<MuiThemeProvider>
       <div>
       <Paper style={{width: "100%",
  margin: 20,
  display: 'inline-block',
 fontFamily: 'Noticia Text',
 textAlign:'center'}} zDepth={1}>
	   <br/>
	   <h3 style={{marginLeft:30,color:'#00838f'}}>Transaction Failed </h3>
	   <br/>
	   <br/>
	  <FlatButton label="Click here to Continue"  backgroundColor="#00838f"  style={{borderRadius:40,margin:30,color:'#fff'}} href="https://ui.backpedal70.hasura-app.io/" />
	   <br/>
	   </Paper>
       </div>
	   </MuiThemeProvider>,
  document.getElementById('root')
);	
        }
        else
        {
             ReactDOM.render(
	<MuiThemeProvider>
       <div>
       <Paper style={{width: "100%",
  margin: 20,
  display: 'inline-block',
 fontFamily: 'Noticia Text',
 textAlign:'center'}} zDepth={1}>
	   <br/>
	   <h3 style={{marginLeft:30,color:'#00838f'}}>Transaction Successfull </h3>
	   <br/>
	   <br/>
	  <FlatButton label="Click here to Continue"  backgroundColor="#00838f"  style={{borderRadius:40,margin:30,color:'#fff'}} href="https://ui.backpedal70.hasura-app.io/" />
	   <br/>
	  
	   </Paper>
       </div>
	   </MuiThemeProvider>,
  document.getElementById('root')
);	
        }
        
      })
      .catch((error) => {
        console.error(error);
      });  
	  
	  
	  
	  
	  
	}
	render(){
		return (
  <div>
    <MuiThemeProvider>
       <div>
       <Paper style={style1} zDepth={1}>
	   <div style={{backgroundColor:'#00838f',textAlign:'center' ,color:'#fff',padding:5}}>
	   <h2 style={{padding:10}}>Payment Details Here</h2>
	   </div>
	   <span style={{marginLeft:10}}>Email  </span>
	<TextField
	 refs="a"
	 onChange={e => this.setState({ email: e.target.value })}
      hintText="Email"
	  type="email"
      floatingLabelText="Enter your  Email"
	  style={{width:'80%',marginLeft:10}}
     /><br />
	 
	 
	 
	<span style={{marginLeft:10}}>Name  </span>
	<TextField
	 refs="a"
	 onChange={e => this.setState({ name: e.target.value })}
      hintText="Name"
	  
      floatingLabelText="Enter your  Name"
	  style={{width:'80%',marginLeft:10}}
     /><br />
	 <form className="form-inline ">
	 <span style={{marginLeft:10}}>Card N0  </span>
	<TextField
	 refs="a"
	 onChange={e => this.setState({ number: e.target.value })}
      hintText="card no"
	  floatingLabelText=" Card Number"
	   maxLength = {16}
	  style={{marginLeft:10,width:'30%'}}
     />
	 
	 <span style={{marginLeft:10}}>Amount </span>
	<TextField
	 refs="a"
	
	 onChange={e => this.setState({ amount: e.target.value })}
      hintText="Amount"
	  
      floatingLabelText="Amount "
	  style={{marginLeft:10,width:'30%'}}
     /></form><br />
	  <form className="form-inline ">
    
	 <TextField
	 refs="b"
	onChange={e => this.setState({ cvc: e.target.value })}
      hintText="cvv/cvc"
      floatingLabelText="CVV/CVC"
	  maxLength = {3}
	  style={{width:'30%',marginLeft:10}}
    />
	 
	 <TextField
	 refs="b"
	 maxLength = {2}
      hintText="MM"
      floatingLabelText="Expire Month"
	  onChange={e => this.setState({ expm: e.target.value })}
	  style={{width:'30%',marginLeft:10}}
    />	
	 <TextField
	 refs="b"
	 maxLength = {4}
      hintText="YYYY"
      floatingLabelText="Expire Year"
	  onChange={e => this.setState({ expy: e.target.value })}
	  style={{width:'30%',marginLeft:10}}
    />
	
	</form>
	
	
	
	<br /><br/>
	   <div style={{textAlign:'center'}}><FlatButton label="Pay Now"  backgroundColor="#00838f"  style={{borderRadius:40,margin:5,color:'#fff'}} onClick={this.update.bind(this)} /></div>
	   <br/>
	   
	   <div id="pro" style={{padding:20,backgroundColor:'#00838f',color:'#fff',textAlign:'center'}}>
	</div>
	</Paper>
       </div>
	   </MuiThemeProvider>
  </div>
);
}



}
export default Paycard;