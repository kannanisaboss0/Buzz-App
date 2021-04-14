import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,Dimensions} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'

export default class AskAndProposeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            occupation:'',
            idea:'',
            question:'',
            fullname:'',
            name:''

        }
    }

getUserData=()=>{
    db.collection("Users").where("Email","==",this.state.email).onSnapshot((document)=>{
        document.forEach((doc)=>{
            this.setState({
                occupation:doc.data().Occupation,
                fullname:doc.data().Fullname,
                name:doc.data().Account
            })
        })
    })
}


addQuestion=()=>{
    if(this.state.question!==''||this.state.question.length>3){
      db.collection("Questions").add({
        "Email":this.state.email,
        "Question":this.state.question,
        "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21),
        "Account":this.state.name,
        "Fullname":this.state.fullname
      })
    }
    else{
      window.alert("Please type in a valid question")
    }
     
  }
addIdea=()=>{
    if(this.state.idea!==''||this.state.idea.length>3){
        db.collection("Ideas").add({
            "Email":this.state.email,
            "Idea":this.state.idea,
            "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21),
            "Account":this.state.name,
            "Fullname":this.state.fullname
          })
        }
        else{
          window.alert("Please type in a valid idea")
        }
    }


componentDidMount(){
    this.getUserData()
}
    render(){
        return(
            <View style={{backgroundColor:"#F8FAFB"}}>
                {this.state.occupation==="Student"?
                <View>
                   
      <View style={{borderWidth:1,borderColor:"darkgreen"}}>
        <Card.Title  style={{fontWeight:"bold",fontSize:33,color:"darkgreen"}}>Questions</Card.Title>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",}}>Question:</Text>
            <TextInput
   value={this.state.answer}
   onChangeText={(question)=>{
       this.setState({
           question:question
        })
   }}
   style={{borderWidth:1,borderColor:"darkgreen",width:800,height:200,fontSize:20}}
   multiline
   placeholder="Type your question here"
   placeholderTextColor="darkgreen"
   maxLength={1000}
   />
   <Text style={{color:"darkgreen",}}> Characters written:{this.state.question.trim().length}/1000</Text>
                
    
                
                <TouchableOpacity  style={{alignSelf:"center", width:150,borderColor:"darkgreen",borderWidth:2,marginTop:25,borderRadius:50,}} onPress={()=>{this.addQuestion()}}>
                  <Text style={{alignSelf:"center",color:"darkgreen",fontSize:32}}>Post</Text>
                </TouchableOpacity>
          
            </View>
            </View>
           
  

    
      <View style={{borderWidth:1,borderColor:"darkgreen"}}>
            <Card.Title  style={{fontWeight:"bold",fontSize:33,color:"darkgreen",fontFamily:"monospace",shadowColor:"green",shadowOffset:{width:4,height:4}}}>Ideas</Card.Title>
      <View>
      <Text style={{fontSize:20,fontWeight:"bold",fontFamily:"monospace"}}>Idea:</Text>
      <TextInput
   value={this.state.idea}
   onChangeText={(idea)=>{
       this.setState({
           idea:idea
        })
   }}
   style={{borderWidth:1,borderColor:"darkgreen",width:800,height:200,fontSize:20,}}
   multiline
   placeholder="Type your idea here"
   placeholderTextColor="darkgreen"
   maxLength={1000}
   />
   <Text style={{color:"darkgreen",}}> Characters written:{this.state.idea.trim().length}/1000</Text>
      </View>
      <TouchableOpacity  style={{alignSelf:"center", width:150,borderColor:"green",borderWidth:2,marginTop:25,borderRadius:50,}} onPress={()=>{this.addIdea()}}>
        <Text style={{alignSelf:"center",color:"darkgreen",fontSize:32}}>Post</Text>
      </TouchableOpacity>
    
                </View>
                </View>
              :
              <View style={{height:(Dimensions.get("window").height)*3,backgroundColor:"#F8FAFB"}}>
                  <Image source={require('../assets/Prohibited.PNG')} style={{alignSelf:"center",width:500,height:500,marginTop:"5%",}}/>
                 <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>Only Students can ask Questions and propose Ideas!</Text>
                  {this.state.occupation==="Expert"?
                <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>And it is your duty to correct their Errors!</Text>  
                :
                <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>And it is your duty to assess their Ideas!{this.state.occupation}</Text>
                }
              </View>  
            }

            </View>
        )
    }
}