
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'

export default class SettingScreen extends React.Component {

  constructor(){
    super();
    this.state={
      email:firebase.auth().currentUser.email,
      account:'',
      fullname:'',
      number:'',
      address:'',
      occupation:'',
      password:'',
      ide:'',
      cardVisible:false,
      verifiedPassword:'',
      hidePassword:true
      
    }
  }
  getUserDetails=()=>{
    db.collection("Users").where("Email","==",this.state.email).get().then((document)=>{
      document.forEach((doc)=>{
        this.setState({
          account:doc.data().Account,
          fullname:doc.data().Fullname,
          number:doc.data().Number,
          address:doc.data().Address,
          occupation:doc.data().Occupation,
          password:doc.data().Password,
          ide:doc.id
        })
      }
      )
    })
  }
  componentDidMount(){
    this.getUserDetails()
  }
  render(){
  return (
    <View style={{height:"300%",backgroundColor:"#F8FAFB"}}>
      <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen",alignSelf:"center"}}>Settings</Text>
                        <Avatar
                            avatarStyle={{borderRadius:25,width:200,height:200}}
                            containerStyle={{borderRadus:25,width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/Settings.PNG")}
                        />
                        <TouchableOpacity onPress={()=>{this.getUserDetails()}} style={{width:250,borderWidth:4,borderColor:"black",borderRadius:25,alignSelf:"center"}}>
                          <Text style={{alignSelf:"center",fontSize:22}}>Restore Initial Values</Text>
                        </TouchableOpacity>
      <TextInput
      
      value={this.state.account}
      onChangeText={(account)=>{
        this.setState({
          account:account
        })  
      }
    }
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      placeholder="Account"
      placeholderTextColor="darkgreen"
    
      />
      <TextInput
      
      value={this.state.fullname}
      onChangeText={(fullname)=>{
        this.setState({
          fullname:fullname
        })  
      }
    }
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      placeholder="Fullname"
      placeholderTextColor="darkgreen"
    
      />
    
       <TextInput
      keyboardType={"number-pad"}
      value={this.state.number}
      onChangeText={(number)=>{
        this.setState({
          number:number
        })  
      }
    }
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      placeholder="Number"
      placeholderTextColor="darkgreen"
    
      />  
       <TextInput
      
      value={this.state.address}
      onChangeText={(address)=>{
        this.setState({
          address:address
        })  
      }
    }
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      placeholder="Address"
      placeholderTextColor="darkgreen"
    
      />
      <Text style={{borderWidth:1,borderColor:"darkgreen",alignSelf:"center",fontSize:25,marginTop:30}}>Occupation: {this.state.occupation}</Text>
      <TextInput
      value={this.state.email}
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      placeholder="Email Address"
      placeholderTextColor="darkgreen"
      />
      <TextInput
      value={this.state.password}
      style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
      secureTextEntry={this.state.hidePassword}
      editable={false}
      placeholder="Password"
      placeholderTextColor="darkgreen"
      />
      <TouchableOpacity onPress={()=>{
        this.setState({
          cardVisible:true
        })
      }}>

        <Image  source={require("../assets/Eye.PNG")}
              style={{width:40,height:40,position:"absolute",marginTop:-44,alignSelf:"center",marginLeft:-445}}
            
        />
      </TouchableOpacity>
      <Text style={{borderWidth:1,borderColor:"darkgreen",alignSelf:"center",fontSize:12,marginTop:15}}>User ID: {this.state.ide}</Text>
      <TouchableOpacity onPress={()=>{
          db.collection("Users").doc(this.state.ide).update({
            "Account":this.state.account,
        "Fullname":this.state.fullname,
        "Email":this.state.email,
        "Password":this.state.password,
        "Address":this.state.address,
        "Number":this.state.number,
        "Occupation":this.state.occupation,
        "ID":this.state.ide
          })
            
          }
         } style={{width:200,borderWidth:1,borderColor:"darkgreen",alignSelf:"center",marginTop:30}}>
        <Text style={{alignSelf:"center",fontSize:25}}>Save Changes</Text>
      </TouchableOpacity>

      {this.state.cardVisible===true&&this.state.hidePassword===true?
       <Card
       containerStyle={{alignSelf:"flex-start",width:500,height:500,position:"absolute"}}
       >
         <Text onPress={()=>{this.setState({cardVisible:false})}} style={{alignSelf:"flex-start",color:"grey",fontSize:17}}>Close</Text>
 <Card.Title style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>
 Password Verification
 </Card.Title>
 <Text>Type your current password in the input below:</Text>
 <TextInput
       
       value={this.state.verifiedPassword}
       onChangeText={(verifiedPassword)=>{
         this.setState({
           verifiedPassword:verifiedPassword
         })  
       }
     }
       style={{width:400,borderWidth:1,borderColor:"darkgreen",height:50,alignSelf:"center",marginTop:30}}
       placeholder="Type Your Password"
       placeholderTextColor="darkgreen"
     
       />
      <TouchableOpacity onPress={()=>{
          if(this.state.verifiedPassword===this.state.password){
            this.setState({
              hidePassword:false,
              cardVisible:false
            })
          }
          else{
            window.alert("Passowrd invalid. Please try again.")
            
          }
      }} style={{width:150,borderWidth:1,borderColor:"darkgreen",alignSelf:"center",marginTop:30}}>
        <Text style={{alignSelf:"center",fontSize:25}}>Submit</Text>
      </TouchableOpacity>
       </Card>
       :
       null
      }
     

        
     
    </View>
  );
}
}