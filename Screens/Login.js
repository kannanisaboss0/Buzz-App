import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,TextInput,Linking,Image } from 'react-native';
import {Input,Badge,Card,Icon,Avatar} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import DropDownPicker from 'react-native-dropdown-picker'
import *as ImagePicker from 'expo-image-picker'
import { TabRouter } from 'react-navigation';




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
           showPassword:true,
           image:''

    
           
       }

   }

verfiyUserforSignUp=async(email,password)=>{
      if(email&&password.trim().length>=7&&this.state.address&&this.state.fullname&&this.state.name&&this.state.address&&this.state.number&&this.state.occupation){
          if(this.state.password2===this.state.password){

          
   try{
    const SignUp=  await firebase.auth().createUserWithEmailAndPassword(email,password)
    if(SignUp){
        this.props.navigation.navigate('AppSynthesisRoute') 
    }
    db.collection("Users").add({
        "Account":this.state.name,
        "Fullname":this.state.fullname,
        "Email":this.state.email2,
        "Password":this.state.password2,
        "Address":this.state.address,
        "Number":this.state.number,
        "Occupation":this.state.occupation

    })
   }
   catch(error){
   window.alert(error)
    
   }

}
else{
window.alert("Passwords do not match")
}
      }

   else{
    window.alert("Invalid data in a field")
}
}
verfiyUserforSignUp2=async(email,password)=>{
    if(email&&password.trim().length>=7&&this.state.address&&this.state.fullname&&this.state.name&&this.state.address&&this.state.number&&this.state.occupation){
        if(this.state.password2===this.state.password){

        
 try{
  const SignUp=  await firebase.auth().createUserWithEmailAndPassword(email,password)
  if(SignUp){
      this.props.navigation.navigate('BackgroundMusicRoute2') 
  }
  db.collection("Users").add({
      "Account":this.state.name,
      "Fullname":this.state.fullname,
      "Email":this.state.email2,
      "Password":this.state.password2,
      "Address":this.state.address,
      "Number":this.state.number,
      "Occupation":this.state.occupation

  })
 }
 catch(error){
 window.alert(error)
  
 }

}
else{
window.alert("Passwords do not match")
}
    }

 else{
  window.alert("Invalid data in a field")
}
}

verifyUserforLogin=async(email,password)=>{
       if(email&&password){
       try{
    const Login= await firebase.auth().signInWithEmailAndPassword(email,password)
    if(Login){
        this.props.navigation.navigate('HomeRoute')
    }

}
catch(error){
    window.alert(error)
}
       }

   }
   verifyUserforLogin2=async(email,password)=>{
    if(email&&password){
    try{
 const Login= await firebase.auth().signInWithEmailAndPassword(email,password)
 if(Login){
     this.props.navigation.navigate('BackgroundMusicRoute')
 }

}
catch(error){
 window.alert(error)
}
    }

}   
   


   
   render(){
       return(
           <View>
               
               
               
               {this.state.cardShowSignUp===true?
               <View style={{width:750,alignSelf:"center",height:1500}}>
                   <Card title="Sign Up" containerStyle={{borderWidth:2,borderColor:"darkgreen",height:1500}}>
                    <Text onPress={()=>{this.setState({cardShowSignUp:false})}} style={{color:"grey",fontSize:15}}>Close</Text>
              <Text style={{fontSize:32,color:"darkgreen",fontWeight:"bold",alignSelf:"center"}}>Sign Up</Text>
              <Text style={{color:"darkgreen",fontWeight:"bold",alignSelf:"center",marginTop:25}}>Main Details</Text>
                <Input
               placeholder="Account Name"
               placeholderTextColor="darkgreen"
               leftIcon={<Badge textStyle={{fontSize:10}}  status="success" />}
               containerStyle={{width:300,alignSelf:"center"}}
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.name}
               onChangeText={(name)=>{
                this.setState({
                    name:name 
                })
               }}
               />
               <Input
                
               placeholder="Full Name"
               placeholderTextColor="darkgreen"
               leftIcon={<Badge textStyle={{fontSize:10}}  status="success" />}
               containerStyle={{width:300,alignSelf:"center"}}
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.fullname}
               onChangeText={(fullname)=>{
                this.setState({
                    fullname:fullname
                })
               }}
               />
               
              
               <Input
               placeholder="Address"
               placeholderTextColor="darkgreen"
               leftIcon={<Badge textStyle={{fontSize:10}}  status="success" />}
               
               containerStyle={{width:300,alignSelf:"center"}}
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.address}
               onChangeText={(address)=>{
                this.setState({
                    address:address
                })
               }}
               />
               <Input
               keyboardType={"number-pad"}
               placeholder="Phone Number"
               placeholderTextColor="darkgreen"
               leftIcon={<Badge textStyle={{fontSize:10}}  status="success" />}
               
               containerStyle={{width:300,alignSelf:"center"}}
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.number}
               onChangeText={(number)=>{
                this.setState({
                    number:number
                })
               }}
               />
               <Input
               keyboardType={"email-address"}
               placeholder="Email Address"
               placeholderTextColor="darkgreen"
               leftIcon={<Badge textStyle={{fontSize:10}}  status="success" />}
               
               containerStyle={{width:300,alignSelf:"center"}}
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.email2}
               onChangeText={(email)=>{
                this.setState({
                    email2:email
                })
               }}
               />
                <Input
                secureTextEntry={this.state.showPassword}
                placeholder="Password"
                placeholderTextColor="darkgreen"
               style={{alignSelf:"center",borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100,}}
              containerStyle={{width:300,alignSelf:"center",}}
              

            rightIcon={<TouchableOpacity onPressIn={()=>{this.setState({showPassword:false})}} onPressOut={()=>{this.setState({showPassword:true})}}><Image  source={require("../assets/Eye.PNG")} style={{width:40,height:40}}/></TouchableOpacity>}
               leftIcon={this.state.password2.trim().length<=7?
                <Badge onPress={()=>{
                    this.setState({
                        password2:Math.random(5).toString(36)
                    })
                }} textStyle={{fontSize:10}} value={this.state.password2.length+"/8 characters"} status="error"/>
                :
                <Badge onPress={()=>{
                
                    this.setState({
                        password2:Math.random(5).toString(36)
                    })
                }} 
                
                textStyle={{fontSize:10}}  status="success"/>
            }
               value={this.state.password2}
               onChangeText={(password)=>{
                this.setState({
                    password2:password
                })
               }}
               />
               <Input
               secureTextEntry={true}
               containerStyle={{width:300,alignSelf:"center",}}
               placeholder="Verify Password"
               placeholderTextColor="darkgreen"
               leftIcon={this.state.password!==this.state.password2?
            <Badge value="Password verification invalid" status="error" textStyle={{fontSize:10}}/>
            :
            <Badge  status="success" textStyle={{fontSize:10}}/>
            }
               style={{alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",width:100}}
               value={this.state.password}
               onChangeText={(password)=>{
                this.setState({
                    password:password
                })
               }}
               />
               <Text style={{color:"darkgreen",fontWeight:"bold",alignSelf:"center",marginTop:25}}>Subsidary Details</Text>
               <DropDownPicker placeholder="Occupation" items={
                   [
                       {value:'Student', label:'Student'},
                       {value:'Expert',label:'Expert'},
                       {value:'Representative',label:'Representative'}
                   ]
               }
               onChangeItem={(item)=>{
                this.setState({
                    occupation:item.value
                })
               } }
               activeItemStyle={{backgroundColor:"darkgreen"}}
               containerStyle={{width:300,borderWidth:1,borderColor:"darkgreen",alignSelf:"center",marginTop:10}}
               placeholderStyle={{color:"darkgreen"}}
               

               >

               </DropDownPicker>
               <Text>{this.state.image}</Text>
               
             
               <TouchableOpacity style={{alignSelf:"center", width:150,borderColor:"darkgreen",borderWidth:2,marginTop:25}} onPress={()=>{this.verfiyUserforSignUp(this.state.email2,this.state.password2)}}>
                   <Text style={{alignSelf:"center",color:"darkgreen",fontSize:32}}>Sign Up</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{this.verfiyUserforSignUp2(this.state.email2,this.state.password2)}} >
                  <Text style={{color:"darkgreen",alignSelf:"center"}}>With Background Music</Text>
               </TouchableOpacity>
                   </Card>

               </View>
               :   

               <View style={{marginTop:300}}>
                   <Image
               source={require("../assets/Logo.PNG")}
               style={{width:500,height:300,alignSelf:"center",marginTop:-300,borderWidth:1,borderColor:"black"}}
               />
               <Input
                keyboardType={"email-address"}
               placeholder="Email Address"
               placeholderTextColor="darkgreen"
               containerStyle={{width:300,alignSelf:"center"}}
              style={{width:300,alignSelf:"center",marginTop:25,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen"}}
               value={this.state.email2}
               onChangeText={(text)=>{
                   this.setState({
                     email2:text
                   })
                 
               }}
               />
               <Input
               secureTextEntry={this.state.showPassword}
               leftIcon={<TouchableOpacity onPressIn={()=>{this.setState({showPassword:false})}} onPressOut={()=>{this.setState({showPassword:true})}}><Image  source={require("../assets/Eye.PNG")} style={{width:40,height:40}}/></TouchableOpacity>}
               placeholder="Password"
               placeholderTextColor="darkgreen"
               containerStyle={{width:300,alignSelf:"center"}}
               style={{width:300,alignSelf:"center",marginTop:10,borderBottomWidth:1,height:35,borderBottomColor:"darkgreen",textDecorationColor:"darkgreen"}}
               value={this.state.password2}
               onChangeText={(text)=>{
                   this.setState({
                     password2:text
                   })
                 
               }}
               />
               <TouchableOpacity onPress={()=>this.verifyUserforLogin(this.state.email2,this.state.password2)} style={{borderWidth:2,borderColor:"darkgreen",width:125,alignSelf:"center",marginTop:50}}>
                   <Text style={{fontSize:35,color:"darkgreen",alignSelf:"center"}}>Login</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.verifyUserforLogin2(this.state.email2,this.state.password2)} >
                  <Text style={{color:"darkgreen",alignSelf:"center"}}>With Background Music</Text>
               </TouchableOpacity>
 
              
               
               <Text onPress={()=>{this.setState({cardShowSignUp:true})}} style={{color:"grey",fontSize:15,alignSelf:"center",marginTop:25}}>Do not have an account? Sign up here!</Text>
              </View>
               }
             
             
           </View>
       )

   }
}

             
