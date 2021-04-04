
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem} from 'react-native-elements'


export default class HomeScreen extends React.Component {
  constructor(){
    super();
    this.state={
      email:firebase.auth().currentUser.email,
      occupation:'',
      name:'',
      showCardQuestion:false,
      question:'',
      fullname:'',
      Questions:[],
      showCardUser:false,
      name2:'',
      question2:'',
      account:'',
      date:'',
      answer:''



    }
  }
  getUserData=()=>{
    db.collection("Users").where("Email","==",this.state.email).onSnapshot((document)=>
      document.forEach((doc)=>{
        this.setState({
          occupation:doc.data().Occupation,
          name:doc.data().Account,
          fullname:doc.data().Fullname

        })
      })
      
    )
  }
  getQuestions=()=>{
    db.collection("Questions").onSnapshot((document)=>{
      var Questions=document.docs.map((doc)=>
          doc.data()
      )
      this.setState({
        Questions:Questions
      })
    })
  }
  addQuestion=()=>{
    db.collection("Questions").add({
      "Email":this.state.email,
      "Question":this.state.question,
      "Date":firebase.firestore.Timestamp.now().toDate().toString().slice(0,24),
      "Account":this.state.name,
      "Fullname":this.state.fullname
    })
  }
  showCardUser=(email,question,date,account,fullname)=>{
    if(this.state.showCardUser===true){
      return(
        <Card containerStyle={{width:500,height:700,position:"absolute",alignSelf:"center"}}>
          <Text style={{color:"grey",fontSize:15}} onPress={()=>{this.setState({showCardUser:false})}}>Close</Text>
        <Card.Title style={{color:"darkgreen",fontWeight:"bold",fontSize:33}}><Text>{this.state.account}'s Question</Text></Card.Title>
        <Text>Name:</Text><Text style={{color:"darkgreen"}}>{this.state.name2}</Text>
        <Text>Date:</Text><Text style={{color:"darkgreen"}}>{this.state.date}</Text>
        <Text>Question:</Text>
        <Text style={{color:"darkgreen",borderWidth:1,borderColor:"darkgreen",}}>{this.state.question2}</Text>
        <Input
        multiline
        placeholder="Your Answer"
        placeholderTextColor="darkgreen"
        containerStyle={{marginTop:50}}
        style={{borderBottomColor:"darkgreen",borderBottomWidth:1,}}
        value={this.state.answer}
        onChangeText={(answer)=>{
          this.setState({
            answer:answer
          })
        }}
        maxLength={400}
        leftIcon={<Text style={{alignSelf:"center"}} onPress={()=>{this.setState({answer:''})}}>Clear</Text>}
        />
        <Text style={{color:"darkgreen"}}> Characters written:{this.state.answer.length}/400</Text>
        <TouchableOpacity style={{borderColor:"darkgreen",borderWidth:1,width:200,alignSelf:"center",marginTop:25}}>
          <Text style={{color:"darkgreen",fontSize:32,alignSelf:"center"}}>Answer</Text>
        </TouchableOpacity>
      </Card>
      
      )
     
    }
  }
  renderItem=({item,i})=>{
    return(
      <View>
        
        
   <ListItem topDivider    bottomDivider>
     <View style={{width:1500}}>
     <ListItem.Title  >

       <Text  style={{fontWeight:"bold",fontSize:25,}}>{item.Question}</Text>
     </ListItem.Title   >
     </View>
     <ListItem.Subtitle style={{width:300}}>
      Asked By: {item.Account}
     </ListItem.Subtitle>
     <ListItem.Subtitle right style={{alignSelf:"flex-end",marginLeft:"0%",}}>
     <TouchableOpacity  onPress={()=>
      {this.showCardUser(item.Email,item.Question,item.Date,item.Account,item.Fullname)
      this.setState({
        showCardUser:true,
        name2:item.Fullname,
        question2:item.Question,
        account:item.Account,
        date:item.Date

      })
      }} style={{width:200,borderWidth:1,borderColor:"darkgreen"}}>
       <Text style={{color:"darkgreen",fontSize:20,alignSelf:"center"}}>Answer</Text>
     </TouchableOpacity>
     </ListItem.Subtitle>

   </ListItem>
   </View>
  
    )
  }
  
  componentDidMount(){
    this.getUserData()
    this.getQuestions()
    this.showCardUser()
  }
  render(){
    return(
      <View>
        {this.state.occupation==="Student"?
        
        <View>
        
          
          <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Questions</Text>
          <TouchableOpacity style={{borderWidth:1,borderColor:"darkgreen",width:200}} onPress={()=>{this.setState({showCardQuestion:true})}}>
            <Text style={{fontSize:27,color:"darkgreen",alignSelf:"center"}}>Ask A Question</Text>
          </TouchableOpacity>
          <FlatList
          data={this.state.Questions}
          keyExtractor={(item,index)=>{
            index.toString()
          }}
          renderItem={this.renderItem}
          />
          
          {this.state.showCardQuestion===true?
        <Card containerStyle={{alignSelf:"center",width:500,height:700,position:"absolute"}}>
           <Text style={{color:"grey",fontSize:15}} onPress={()=>{this.setState({showCardQuestion:false})}}>Close</Text>
          <Card.Title  style={{fontWeight:"bold",fontSize:33,color:"darkgreen"}}>Ask Question</Card.Title>
                <View>
                    <Input
                    value={this.state.question}
                    onChangeText={(question)=>{
                        this.setState({
                            question:question
                        })
                    }}
                    placeholder="Your Question"
                    placeholderTextColor="darkgreen"
                   
                    leftIconContainerStyle={{borderWidth:1,borderColor:"darkgreen",width:50}}
                    leftIcon={<Text style={{alignSelf:"center"}} onPress={()=>{this.setState({question:''})}}>Clear</Text>}
                    multiline
                    containerStyle={{alignSelf:"center"}}
                    style={{borderColor:"darkgreen",borderBottomWidth:1}}
                    maxLength={400}
                    />
                    
        
        <Text style={{color:"darkgreen"}}> Characters written:{this.state.question.length}/400</Text>
                     <TouchableOpacity  style={{alignSelf:"center", width:150,borderColor:"darkgreen",borderWidth:2,marginTop:25}} onPress={()=>{this.addQuestion()}}>
                   <Text style={{alignSelf:"center",color:"darkgreen",fontSize:32}}>Post</Text>
               </TouchableOpacity>
              
                </View>
               
        </Card>
        
        :null
        }
        
         {this.showCardUser()}
            </View>

  :<View>
<Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Questions</Text>
          
          <FlatList
          data={this.state.Questions}
          keyExtractor={(item,index)=>{
            index.toString()
          }}
          renderItem={this.renderItem}
          />
          
          {this.state.showCardQuestion===true?
        <Card containerStyle={{alignSelf:"center",width:500,height:700,position:"absolute"}}>
           <Text style={{color:"grey",fontSize:15}} onPress={()=>{this.setState({showCardQuestion:false})}}>Close</Text>
          <Card.Title  style={{fontWeight:"bold",fontSize:33,color:"darkgreen"}}>Ask Question</Card.Title>
                <View>
                    <Input
                    value={this.state.question}
                    onChangeText={(question)=>{
                        this.setState({
                            question:question
                        })
                    }}
                    placeholder="Your Question"
                    placeholderTextColor="darkgreen"
                   
                    leftIconContainerStyle={{borderWidth:1,borderColor:"darkgreen",width:50}}
                    leftIcon={<Text style={{alignSelf:"center"}} onPress={()=>{this.setState({question:''})}}>Clear</Text>}
                    multiline
                    containerStyle={{alignSelf:"center"}}
                    style={{borderColor:"darkgreen",borderBottomWidth:1}}
                    maxLength={400}
                    />
                    
        
        <Text style={{color:"darkgreen"}}> Characters written:{this.state.question.length}/400</Text>
                     <TouchableOpacity  style={{alignSelf:"center", width:150,borderColor:"darkgreen",borderWidth:2,marginTop:25}} onPress={()=>{this.addQuestion()}}>
                   <Text style={{alignSelf:"center",color:"darkgreen",fontSize:32}}>Post</Text>
               </TouchableOpacity>
              
                </View>
               
        </Card>
        
        :null
        }
        
         {this.showCardUser()}

  </View>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  }
       
      </View>
    )
  }

}