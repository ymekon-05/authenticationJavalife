import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={styles.container}>
				<Image  style={{width:70, height: 70}}
          			source={require('../images/bitnetlogo.png')}/>
          		<Text style={styles.logoText}>Welcome to JavaLife.</Text>	
							<Text style={styles.logoTextBelow}>Task # 2. Authentication</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
	},
	logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'#000'
  },
  logoTextBelow : {
   	fontSize:12,
  	color:'#000'
  }
});