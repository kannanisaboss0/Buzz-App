import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,TextInput, } from 'react-native';
import {Input,Badge,Card} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class Login extends React.Component{
   constructor(){
       super();
       this.state={
           email:'',
           password:'',
           showBadge:false,
           email2:'',
           password2:'',
           cardShowSignUp:false,
           address:'',
           name:'',
           fullname:'',
           number:'',
           occupation:'',

           
           
       }

   }
   verfiyUserforSignUp=(email,password)=>{
   try{
    const SignUp=firebase.auth().createUserWithEmailAndPassword(email,password)
    if(SignUp){
        this.props.navigation.navigate('MainRoute') 
    }
   }
   catch(error){
        window.alert(error)
   }
   }
   verifyUserforLogin=(email,password)=>{
       try{
    const Login=firebase.auth().signInWithEmailAndPassword(email,password)
    if(Login){
        this.props.navigation.navigate('MainRoute')
    }
}
catch(error){
    window.alert(error)
}

       
   }

   render(){
       return(
           <View>
               {this.state.cardShowSignUp===true?
               <View>
                   <Card title="Sign Up">
                    
               <Input
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen"}}
              containerStyle={{width:500,alignSelf:"center",marginTop:500}}

              rightIcon={<TouchableOpacity onPress={()=>{
                   this.setState({
                       password2:''
                   })
               }}>
                   <Text>Clear</Text>
               </TouchableOpacity>}
               leftIcon={this.state.password2.trim().length<=7?
                <Badge onPress={()=>{
                    this.setState({
                        password2:Math.random(5).toString(36)
                    })
                }} textStyle={{fontSize:10}} value="Password should be at least 7 characters long" status="error"/>
                :
                <Badge onPress={()=>{
                    this.setState({
                        password2:Math.random(5).toString(36)
                    })
                }} textStyle={{fontSize:10}} value="Password valid" status="success"/>
            }
               value={this.state.password2}
               onChangeText={(password)=>{
                this.setState({
                    password2:password
                })
               }}
               />
               <Input
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen"}}
               value={this.state.email2}
               onChangeText={(email)=>{
                this.setSate({
                    email2:email
                })
               }}
               />
               <TouchableOpacity onPress={()=>{this.verfiyUserforSignUp(this.state.email2,this.state.password2)}}>
                   <Text>Sign Up</Text>
               </TouchableOpacity>
                   </Card>

               </View>
               :   

               <View>
               <TextInput
               placeholder="Email Address"
               placeholderTextColor="darkgreen"
              style={{width:300,alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen"}}
               value={this.state.email2}
               onChangeText={(text)=>{
                   this.setState({
                     email2:text
                   })
                 
               }}
               />
               <TextInput
               placeholder="Password"
               placeholderTextColor="darkgreen"
               style={{width:300,alignSelf:"center",marginTop:10,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",textDecorationColor:"darkgreen"}}
               value={this.state.password2}
               onChangeText={(text)=>{
                   this.setState({
                     password2:text
                   })
                 
               }}
               />
               <TouchableOpacity onPress={()=>this.verifyUserforLogin(this.state.email2,this.state.password2)} style={{borderWidth:2,borderColor:"darkgreen",width:100,alignSelf:"center",marginTop:10}}>
                   <Text style={{fontSize:32,color:"darkgreen",alignSelf:"center"}}>Login</Text>
               </TouchableOpacity>
 
              
               <Text onPress={()=>{this.setState({cardShowSignUp:true})}} style={{color:"grey",fontSize:12}}>Do not have an account? Sign up here!</Text>
              </View>
               }
             
             
           </View>
       )

   }
}

             
