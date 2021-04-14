import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,SafeAreaView, } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar,Header,} from 'react-native-elements'

export default class Description extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            email2:'',
            question:'',
            date:'',
            account:'',
            fullname:'',
            answer:'',
            image:'',
            referencetext:'No Link',
            referencelink:'No Link',
            type:'',
            idea:'',
            assessment:''
        }
    }
   

    getInformation= async()=>{
      var email=  this.props.navigation.getParam('Item')["Email"]
      
      var date=  this.props.navigation.getParam('Item')["Date"]
      var account=  this.props.navigation.getParam('Item')["Account"]
      var fullname=  this.props.navigation.getParam('Item')["Fullname"]
      var type= this.props.navigation.getParam('Type') 
      var image=this.props.navigation.getParam('Image')
      if(type==="Idea"){
        var idea=  this.props.navigation.getParam('Item')["Idea"]
        this.setState({
            email2:email,
            idea:idea,
            date:date,
            account:account,
            fullname:fullname,
            type:type
        })
      }
      else{
          var question=this.props.navigation.getParam('Item')["Question"]
          this.setState({
            email2:email,
            question:question,
            date:date,
            account:account,
            fullname:fullname,
            type:type
        })
      }
      
     await firebase.storage().ref().child("Profiles/"+email).getDownloadURL().then((URL)=>{
        this.setState({
          image:URL
        })
        })
}  

addAssessment=()=>{
    if(this.state.assessment!==''||this.state.assessment.length>3){
        this.props.navigation.navigate('HomeRoute')
      db.collection("AnswersIdeas").add({
        "Assessment":this.state.assessment,
        "QuestionEmail":this.state.email2,
        "AnswerEmail":this.state.email,
        "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21),
        "Idea":this.state.idea,
        "Fullname":this.state.fullname,
        "Account":this.state.account,
        "ReferenceText":this.state.referencetext,
        "ReferenceLink":this.state.referencelink
        })
      }
    else{
      window.alert('Please type in a valid answer')
      }
  }
addAnswer=()=>{
    if(this.state.answer!==''||this.state.answer.length>3){
        this.props.navigation.navigate('HomeRoute')
      db.collection("AnswersQuestions").add({
        "Answer":this.state.answer,
        "QuestionEmail":this.state.email2,
        "AnswerEmail":this.state.email,
        "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,21),
        "Question":this.state.question,
        "Fullname":this.state.fullname,
        "Account":this.state.account,
        "ReferenceText":this.state.referencetext,
        "ReferenceLink":this.state.referencelink
        })
      }
    else{
      window.alert('Please type in a valid answer')
      }
  }
componentDidMount(){
    this.getInformation()
    
     
}  
    render(){
        return(
            <View>
              {this.state.type==="Question"?
                <View>
                  <Card.Title style={{color:"darkgreen",fontWeight:"bold",fontSize:33,fontFamily:"monospace"}}><Text>{this.state.account}'s Question</Text></Card.Title>            
                  <TouchableOpacity style={{width:150,alignSelf:"flex-start",borderWidth:4,borderRadius:25}} onPress={()=>{this.props.navigation.navigate('HomeRoute')}}>
                      <Text style={{fontSize:30,alignSelf:"center"}}>Back</Text>
                  </TouchableOpacity> 
                  <Avatar
                      placeholderStyle={{backgroundColor:"grey"}}
                      source={this.state.image}
                      containerStyle={{borderColor:"black",borderRadius:25,alignSelf:"center",width:200,height:200,backgroundColor:"grey",marginTop:25,borderWidth:5,alignSelf:"center"}}
                      rounded={true}
                      iconStyle={{borderRadius:100,width:200,height:200}}
                      size="medium"
                      >
                  </Avatar>        
                  <Image style={{width:400,height:400,position:"absolute",marginLeft:1400,}} source={require("../assets/Answer.PNG")}/>
                  <Text style={{position:"absolute",marginLeft:1300,marginTop:415,color:"darkgreen",fontWeight:"bold"}}>Remember to check the authenticity of your answer! A reference to any well-established source is recommended!</Text>    
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Name:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.fullname}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Date:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.date}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Email:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.email2}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Question:</Text>
                  <Text style={{color:"darkgreen",borderWidth:1,borderColor:"darkgreen",fontSize:17,width:500}}>{this.state.question}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Answer:</Text>
                  <TextInput
                      value={this.state.answer}
                      onChangeText={(answer)=>{
                          this.setState({
                              answer:answer
                            })
                      }}
                      style={{borderWidth:1,borderColor:"darkgreen",width:800,height:200,fontSize:17,}}
                      multiline
                      placeholder="Type your answer here"
                      placeholderTextColor="darkgreen"
                      maxLength={1000}
                  />
                  <Text style={{color:"darkgreen"}}> Characters written:{this.state.answer.trim().length}/1000</Text>
                  <Text style={{fontSize:15,fontWeight:"bold"}}>References:</Text>
                  <TextInput value={this.state.referencetext} onChangeText={(referencetext)=>{
                      this.setState({
                          referencetext:referencetext
            })
        }}
                    placeholder="Display text for your reference,(if any)"  
                    placeholderTextColor="darkgreen"
                    style={{borderWidth:1,borderColor:"darkgreen",width:400,height:40,fontSize:17,}}
                  />
                  <TextInput value={this.state.referencelink} onChangeText={(referencelink)=>{
                      this.setState({
                          referencelink:referencelink
            })
          
        }}
                    placeholder="Link for your reference,(if any)"  
                    placeholderTextColor="darkgreen"
                    style={{borderWidth:1,borderColor:"darkgreen",width:400,height:40,fontSize:17,marginTop:25}}
                  />
                  <TouchableOpacity onPress={()=>{ 
                      this.addAnswer()
              }} 
                    style={{borderColor:"darkgreen",borderWidth:1,width:200,alignSelf:"center",marginTop:25}}> 
                      <Text style={{color:"darkgreen",fontSize:32,alignSelf:"center"}}>Answer</Text>
                  </TouchableOpacity>
                </View>
    :
                <View>
                  <Card.Title style={{color:"darkgreen",fontWeight:"bold",fontSize:33,fontFamily:"monospace"}}><Text>{this.state.account}'s Idea</Text></Card.Title>            
                  <TouchableOpacity style={{width:150,alignSelf:"flex-start",borderWidth:4,borderRadius:25}} onPress={()=>{this.props.navigation.navigate('HomeRoute')}}>
                                <Text style={{fontSize:30,alignSelf:"center"}}>Back</Text>
                  </TouchableOpacity> 
                  <Avatar
                    placeholderStyle={{backgroundColor:"grey"}}
                    source={this.state.image}
                    containerStyle={{borderColor:"black",borderRadius:25,alignSelf:"center",width:200,height:200,backgroundColor:"grey",marginTop:25,borderWidth:5,alignSelf:"center"}}
                    rounded={true}
                    iconStyle={{borderRadius:100,width:200,height:200}}
                    size="medium"
                    >
                  </Avatar>        
                  <Image style={{width:400,height:400,position:"absolute",marginLeft:1400,}} source={require("../assets/Answer.PNG")}/>
                  <Text style={{position:"absolute",marginLeft:1300,marginTop:415,color:"darkgreen",fontWeight:"bold"}}>Remember to check the authenticity of your answer! A reference to any well-established source is recommended!</Text>
                  
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Name:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.fullname}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Date:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.date}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Email:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.email2}</Text>
                
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Idea:</Text>
                  <Text style={{color:"darkgreen",borderWidth:1,borderColor:"darkgreen",fontSize:17,width:500}}>{this.state.idea}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Assessment:</Text>
                  <TextInput
                    value={this.state.assessment}
                    onChangeText={(assessment)=>{
                        this.setState({
                          assessment:assessment
                        })
                    }}
                    style={{borderWidth:1,borderColor:"darkgreen",width:800,height:200,fontSize:17,}}
                    multiline
                    placeholder="Type your idea here"
                    placeholderTextColor="darkgreen"
                    maxLength={1000}
                  />
                  <Text style={{color:"darkgreen"}}> Characters written:{this.state.answer.trim().length}/1000</Text>
                  <Text style={{fontSize:15,fontWeight:"bold"}}>References:</Text>
                  <TextInput value={this.state.referencetext} onChangeText={(referencetext)=>{
                      this.setState({
                          referencetext:referencetext
                    }) 
                }}
                    placeholder="Display text for your reference,(if any)"  
                    placeholderTextColor="darkgreen"
                    style={{borderWidth:1,borderColor:"darkgreen",width:400,height:40,fontSize:17,}}
                  />
                  <TextInput value={this.state.referencelink} onChangeText={(referencelink)=>{
                      this.setState({
                          referencelink:referencelink
                    })
                }}
                    placeholder="Link for your reference,(if any)"  
                    placeholderTextColor="darkgreen"
                    style={{borderWidth:1,borderColor:"darkgreen",width:400,height:40,fontSize:17,marginTop:25}}
                  />
                  <TouchableOpacity onPress={()=>{ 
                      this.addAssessment()
                }} 
                    style={{borderColor:"darkgreen",borderWidth:1,width:200,alignSelf:"center",marginTop:25}}>
                      <Text style={{color:"darkgreen",fontSize:32,alignSelf:"center"}}>Assess</Text>
                  </TouchableOpacity>
                </View>
            }
            </View>
        )
    }
}
