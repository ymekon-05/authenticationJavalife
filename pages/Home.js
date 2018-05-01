import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet,ScrollView, Text, View, Button ,Image ,PixelRatio } from 'react-native';
import { logout } from '../redux/actions/auth';

import Logo from '../components/Logo';
import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'

const firebaseConfig={
    apiKey: "AIzaSyBLfAyBGQ0cwEFxoR3UQKSyGexRGqRzATs",
    authDomain: "authenticationtasktojavalife.firebaseapp.com",
    databaseURL: "https://authenticationtasktojavalife.firebaseio.com",
    projectId: "authenticationtasktojavalife",
    storageBucket: "authenticationtasktojavalife.appspot.com",
    messagingSenderId: "324041606920"
}


import  ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: 'Select Photo ',
  takePhotoButtonTitle:'Take Photo',
  chooseFromLibraryButtonTitle:'Choose from gallery',
  quality:1,
  storageOptions: {
    skipBackup: true,
    path: 'images'
}
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}


class Home extends Component {

    constructor (props) {
        super(props);
        this.state = {
            curTime:'',
            image_uri:null
        };

        
    }

    componentDidMount() {
        setInterval( () => {
          this.setState({
            curTime : new Date().toLocaleString()
          })
        },1000)
      }
   
    userLogout(username ) {

        firebase.auth().signOut();

       /////////////// push data to firebase loggedout Users List table               
               var loggedinId=username;
               var loggedinId_ = loggedinId.replace(".", "_"); // remove '.' from email address and replace by '_' in order to use it as an id since firebase can not accept '.' 
              
               firebase.database().ref('loggedinUsers/'+ loggedinId_ ).set({
                   
                  // loggedinTime:'00:00',
                   LoggedinStatus:'Inactive',
                   LoggedoutTime:this.state.curTime

               }).then(()=>{
               //alert('Successful loggedout') and push data to redux 
               this.props.onLogout(); 
                          
                  // console.log('inserted !')
               }
           
           ).catch((error)=>
       {
           console.log(error)

       })
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    uploadImage(uri, mime = 'application/octet-stream') {

        alert('url2 ==>' + uri);
        return new Promise((resolve, reject) => {
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
          let uploadBlob = null;
    
          var loggedinId=username;
          var loggedinId_ = loggedinId.replace(".", "_"); // remove '.' from email address and replace by '_' in order to use it as an id since firebase can not accept '.' 
      
          const imageRef = firebase.storage().ref('images/'+ loggedinId_).child('image_001');
    
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
              resolve(url)
            })
            .catch((error) => {
              reject(error)
          })
        })
    }  
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
  
 pushImageToFirebaseStorage(uri,username){

  var  mime = 'application/octet-stream';

    //  alert('hi yemane...');

      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null;
  
        var loggedinId=username;
        var imageID_ = loggedinId.replace(".", "_"); // remove '.' from email address and replace by '_' in order to use it as an id since firebase can not accept '.' 
    
        const imageRef = firebase.storage().ref('images/'+ imageID_).child('image_001');
  
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
          })
          .then((url) => {
            resolve(url)
          })
          .catch((error) => {
            reject(error)
        })
      })



}
////////////////////////////////////////////////////////////////////////////////////////////////////////
    selectPhoto(username: string){

        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
        //  else if (response.customButton) {
        //    console.log('User tapped custom button: ', response.customButton);
         // }
          else {
                 
           /*  let srcImg = { uri: response.uri };                
             this.setState({
                 image_uri: srcImg // response.uri                
                })*/
    
            // You can also display the image using data:
            // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };
          // alert('url ==>' + response.uri + "\n username:" + username);
           this.pushImageToFirebaseStorage(response.uri,username).then(url => { 

              
               this.setState({image_uri: response.uri})
               alert('uploaded'); 
             })
           .catch(
               error => { console.log(error);
                alert('error:' + error); 
            
            }
        )
    
          }
        });
    
    }
  render() {
        return (

           

            <ScrollView style={{padding: 20}}>


            <View >
            <Logo/>
            </View>


                <Text style={{fontSize: 27}}>
                    {`Welcome ${this.props.username}`}
                </Text>
                <View style={{margin: 20}}/>
            <Image 
            style={styles.ImageContainer}
            source={this.state.image_uri != null ? this.state.image_uri: require('../images/not_avaliable.jpg')}
          />
        <Button
          onPress={() => this.selectPhoto(this.props.username)}
          title="Change My Picture"
          color="#841584"/>
                <View style={{margin: 20}}/>
                <Button onPress={() => this.userLogout(this.props.username)} title="Logout"/>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        onLogout: () => { dispatch(logout()); }
    }
}

const styles = StyleSheet.create({
 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF8E1'
    },
 
    ImageContainer: {
      borderRadius: 10,
      width: 250,
      height: 250,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',
      
    },
 
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(Home);