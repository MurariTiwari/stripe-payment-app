import React from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Pay from './pay.svg'
const style = {
  height: 70,
  width: "100%",
  textAlign: 'left',
  display: 'inline-block',
};

const PaperExampleSimple = () => (
<MuiThemeProvider>
  <div>
    <Paper style={style} zDepth={1} >
	<span style={{fontFamily: "Berkshire Swash",marginLeft:60 ,color:'#00838f',fontSize:50}}><img src={Pay} height="70px"/>
	<b >Stripe Payment</b>
	</span></Paper>
    </div>
	</MuiThemeProvider>
);

export default PaperExampleSimple;