import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet,TouchableOpacity ,Text, TextInput, View, Button, AppRegistry}
from 'react-native';
import { login } from '../redux/actions/auth';
import * as firebase from 'firebase'
import Logo from '../components/Logo';
//import {NavigationActions} from 'react-navigation';
import NavigatorService from '../components/navigator';

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


//firebase.initializeApp(firebaseConfig);

class Login extends Component {

      

    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            curTime:''
        };
    }
    
    
    componentDidMount() {
        setInterval( () => {
          this.setState({
            curTime : new Date().toLocaleString()
          })
        },1000)
      }

    userLogin () {
        //if (this.state.username === 'admin' && this.state.password === 'x') {

            firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password)
            .then(() => { 
               

                  // push data to firebase loggedin Users List table  

               // var today = new Date();
                var loggedinId=this.state.username;
                var loggedinId_ = loggedinId.replace(".", "_"); // remove '.' from email address and replace by '_' in order to use it as an id since firebase can not accept '.' 
               // alert(today);
                firebase.database().ref('loggedinUsers/'+ loggedinId_ ).set({
                    
                    loggedinTime:this.state.curTime,
                    LoggedinStatus:'Active',
                   // LoggedoutTime:'00:00'

                }).then(()=>{
                //alert('Successful login') and push data to redux 
                this.props.onLogin(this.state.username, this.state.password);
                           
                    console.log('inserted !')
                }
            
            ).catch((error)=>
        {
            console.log(error)

        })
          ////////////////////////////////////////////////   end of push data to table logged in users
            }
            ).catch((error) => {
                //Login was not successful, let's create a new account
                                
                        alert("Login was not successful, Please try again !!!");
                
               
                });
                
        
      
      
    }
    signup() {

		 // call signup form for user registration 
          //  <newuserForm/>
         // this.props.navigation.navigate('NewUser');
        // this.props.dispatch()
       // alert('hi yemane ');
        //NavigatorService.navigate('NewUser');
	}

    render() {

       

        return (
           
            <ScrollView style={{padding: 20}}>               
                             
            <View >
            <Logo/>
            </View>
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
                <Text style={{fontSize:18,color:'#000'}}> Password  </Text>
                <TextInput 
                    placeholder='Password' 
                    autoCapitalize='none' 
                    autoCorrect={false} 
                    secureTextEntry={true} 
                    value={this.state.password} 
                    onChangeText={(text) => this.setState({ password: text })} 
                    
                    ref={(input) => this.password = input}
                    />
                <View style={{margin: 7}}/>
                <Button onPress={() => this.userLogin()} title="Login" />
               
                <View style={{margin: 20}}/>
                	<Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => this.signup()}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
            </ScrollView>
        );
    }
}
//<TouchableOpacity onPress={this.signup()}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
	
//onPress={() =>navigate('registerPage')}

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
    signupButton: {
        color:'#0a55ce',
        fontSize:16,
        fontWeight:'500'
    }
  });


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (username, password) => { dispatch(login(username, password)); },
        onSignup: (username, password) => { dispatch(signup()); }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

