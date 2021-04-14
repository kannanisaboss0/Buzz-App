import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,SafeAreaView,Linking } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar,Header,} from 'react-native-elements'

export default class AnswerViewScreen extends React.Component{
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
            assessment:'',
            address:'',
            number:'',
            refText:'',
            refLink:'',
            occupation:''
        }
    }
   

    getInformation= async()=>{
      var email=  this.props.navigation.getParam('Item')["AnswerEmail"]
      var date=this.props.navigation.getParam('Item')["Date"]
      var refText=this.props.navigation.getParam('Item')["ReferenceText"]
      var refLink=this.props.navigation.getParam('Item')["ReferenceLink"]
      
     
      var type= this.props.navigation.getParam('Type') 
      db.collection("Users").where("Email","==",email).onSnapshot((document)=>
      document.forEach((doc)=>{
      this.setState({
          account:doc.data().Account,
          fullname:doc.data().Fullname,
          number:doc.data().Number,
          address:doc.data().Address,
          occupation:doc.data().Occupation
          
        })
         
    })
            
    )
      if(type==="Idea"){
        var idea=  this.props.navigation.getParam('Item')["Idea"]
       var assessment=this.props.navigation.getParam('Item')["Assessment"]
       this.setState({
           email2:email,
           type:"Idea",
           date:date,
           assessment:assessment,
           idea:idea,
           refText:refText,
           refLink:refLink
       })
      
            
              
      
       
      }
       
      
      else{
          var question=this.props.navigation.getParam('Item')["Question"]
          var answer=this.props.navigation.getParam('Item')["Answer"]
          this.setState({
            email2:email,
            type:"Question",
            date:date,
            answer:answer,
            question:question,
            refText:refText,
           refLink:refLink

        })
          
      }
      
     await firebase.storage().ref().child("Profiles/"+email).getDownloadURL().then((URL)=>{
        this.setState({
          image:URL
        })
        })
}  


componentDidMount(){
    this.getInformation()
    
     
}  
    render(){
        return(
            <View>
              
                
            
              {this.state.type==="Question"?
                <View>
                  <Card.Title style={{color:"darkgreen",fontWeight:"bold",fontSize:33,fontFamily:"monospace"}}><Text>{this.state.account}'s Answer</Text></Card.Title>            
                  <TouchableOpacity style={{width:150,alignSelf:"flex-start",borderWidth:4,borderRadius:25}} onPress={()=>{this.props.navigation.navigate('AnswerRoute')}}>
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
                  
                  
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Name:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.fullname}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Date:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.date}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Email:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.email2}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Question:</Text>
                  <Text style={{color:"darkgreen",borderWidth:1,borderColor:"darkgreen",fontSize:17,width:500}}>{this.state.question}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",width:300}}>Answer:</Text>
                  <Text style={{color:"darkgreen",fontSize:17,}}>{this.state.answer}</Text>
                  {this.state.refLink!=="No Link"?
                  <View>
                <Text style={{fontSize:15,fontWeight:"bold",}}>Reference Link:</Text><Text style={{color:"darkgreen",fontSize:17,textDecorationLine:"underline"}} onPress={()=>{Linking.openURL(this.state.refLink)}}>{this.state.refText}</Text>
                </View>:
                null}
                </View>
    :
                <View>
                  <Card.Title style={{color:"darkgreen",fontWeight:"bold",fontSize:33,fontFamily:"monospace"}}><Text>{this.state.account}'s Assessment</Text></Card.Title>            
                  <TouchableOpacity style={{width:150,alignSelf:"flex-start",borderWidth:4,borderRadius:25}} onPress={()=>{this.props.navigation.navigate('AnswerRoute')}}>
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
                 
                  
                  
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Name:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.fullname}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Date:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.date}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Email:</Text><Text style={{color:"darkgreen",fontSize:17,}}>{this.state.email2}</Text>
                
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Idea:</Text>
                  <Text style={{color:"darkgreen",borderWidth:1,borderColor:"darkgreen",fontSize:17,width:500}}>{this.state.idea}</Text>
                  <Text style={{fontSize:15,fontWeight:"bold",}}>Assessment:</Text><Text style={{color:"darkgreen",fontSize:17,width:300}}>{this.state.assessment}</Text>
                  {this.state.refLink!=="No Link"?
                  <View>
                <Text style={{fontSize:15,fontWeight:"bold",}}>Reference Link:</Text><Text style={{color:"darkgreen",fontSize:17,textDecorationLine:"underline"}} onPress={()=>{Linking.openURL(this.state.refLink)}}>{this.state.refText}</Text>
                </View>:
                null
            }
                  
                </View>
            }
            </View>
        )
    }
}