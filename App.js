/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView
} from 'react-native';

import Logo from './components/Logo';
import * as firebase from 'firebase'
//import {StackNavigator} from 'react-navigation'

const firebaseConfig={
  apiKey: "AIzaSyBLfAyBGQ0cwEFxoR3UQKSyGexRGqRzATs",
  authDomain: "authenticationtasktojavalife.firebaseapp.com",
  databaseURL: "https://authenticationtasktojavalife.firebaseio.com",
  projectId: "authenticationtasktojavalife",
  storageBucket: "authenticationtasktojavalife.appspot.com",
  messagingSenderId: "324041606920"
}

if (!firebase.apps.length) {

  firebase.initializeApp(firebaseConfig);

}



export default class App extends Component<{}> {

  constructor (props) {
    super(props);
    this.state = {
     
        username: '',
        password: ''
      

    };
}

userSignup () {
       
  // firbase action started from  here
try {

if(this.state.password.length<6)
{
alert('Please enter atleast six characters');
}
else {
firebase.auth().createUserWithEmailAndPassword(this.state.username,this.state.password)
.then(() => { 
  
    alert('your account successfull created ');

})
.catch(() => {
 
  alert('account already created, Please try again !');

});

}

}catch(error){

//console.log(error.toString)

}
}

  render() {
    return (

              
         
      <ScrollView style={{padding: 20}}>  

       <View >
            <Logo/>
            </View>

        <Text style={{fontSize: 27,padding: 10}}>
                    New  User  Registration 
                </Text>

              
              <Text style={{fontSize:18,color:'#000'}}> Email </Text>
                <TextInput 
                    placeholder='Username' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    autoFocus={true} 
                    keyboardType='email-address' 
                    value={this.state.username} 
                    onChangeText={(text) => this.setState({ username: text })} 
                    onSubmitEditing={()=> this.password.focus()}
                    />
                <Text style={{fontSize:18,color:'#000'}}> Password </Text>
                <TextInput 
                    placeholder='Password' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    secureTextEntry={true} 
                    value={this.state.password} 
                    onChangeText={(text) => this.setState({ password: text })} 
                    ref={(input) => this.password = input }
                    />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userSignup(e)} title="Signup"/>
               
                <View style={{margin: 20}}/>
                	<Text style={styles.signupText}>If You create  an account ?</Text>
					<TouchableOpacity   onPress={() =>navigate('registerPage')}><Text style={styles.signinButton}> Signin</Text></TouchableOpacity>
	
                </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#3e2723',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
      flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
      color:'#181a1c',
      fontSize:16
  },
  signinButton: {
      color:'#0a55ce',
      fontSize:16,
      fontWeight:'500'
  }
});

