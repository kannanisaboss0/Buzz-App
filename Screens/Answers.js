import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,Dimensions} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem,Avatar,Icon} from 'react-native-elements'

export default class AnswerScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            QuestionAnswers:[],
            IdeaAnswers:[],
            occupation:''
        }
    }
    getUserData=()=>{
        db.collection("Users").where("Email","==",this.state.email).onSnapshot((document)=>
            document.forEach((doc)=>{
            this.setState({
                occupation:doc.data().Occupation,
                
                  
          
            })
             
        })
                
        )
        } 

   getQuestionAnswers=()=>{
       db.collection("AnswersQuestions").where("QuestionEmail","==",this.state.email).onSnapshot((document)=>{
       var QuestionAnswers= document.docs.map((data)=>
            data.data()
        )
        this.setState({
            QuestionAnswers:QuestionAnswers
        })
       })}
    getIdeaAnswers=()=>{
        db.collection("AnswersIdeas").where("QuestionEmail","==",this.state.email).onSnapshot((document)=>{
            var IdeaAnswers= document.docs.map((data)=>
                 data.data()
             )
             this.setState({
                 IdeaAnswers:IdeaAnswers
             })
            })
    }   
   
   renderItem=({item,index})=>{
       return(
       <View style={{height:"300%",backgroundColor:"#F8FAFB"}}>
           <ListItem containerStyle={{borderColor:"darkgreen",borderWidth:1,backgroundColor:"white"}} topDivider    bottomDivider>
           <Text style={{color:"darkgreen",fontWeight:"bold"}}>{index+1}</Text>
            <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('AnswerViewRoute',{'Item':item,'Type':'Question'})}} style={{width:200,borderWidth:1,borderColor:"darkgreen"}}>
                <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:15,color:"black"}}>View Complete Answer</Text>
            
                </TouchableOpacity>   
    <ListItem.Title style={{marginRight:32,alignItems:"center"}}>
    
 <Text style={{fontWeight:"bold",fontSize:17,alignSelf:"center"}}>{item.Question.slice(0,10)+"..."}</Text>
 </ListItem.Title>
 

    
   
    <ListItem.Subtitle right={true}  style={{width:1300}}>
       
     <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:18}}> {item.Answer.slice(0,52)+"..."}</Text>  
        </ListItem.Subtitle>
        
    
    <ListItem.Subtitle>
    <Text style={{color:"darkgreen"}}>{item.Date}</Text>
    </ListItem.Subtitle>
      
   

    </ListItem>
    </View>
       )
   } 
   renderItem2=({item,index})=>{
    return(
        
    <View style={{backgroundColor:"#F8FAFB"}}>
      
        <ListItem containerStyle={{borderColor:"darkgreen",borderWidth:1,backgroundColor:"white"}} topDivider    bottomDivider>
        <Text style={{color:"darkgreen",fontWeight:"bold"}}>{index+1}</Text>
         <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('AnswerViewRoute',{'Item':item,'Type':'Idea'})}} style={{width:200,borderWidth:1,borderColor:"darkgreen"}}>
             <Text style={{alignSelf:"center",fontWeight:"bold",fontSize:15,color:"black"}}>View Complete Answer</Text>
         
             </TouchableOpacity>   
 <ListItem.Title style={{marginRight:32,alignItems:"center"}}>
 
<Text style={{fontWeight:"bold",fontSize:17,alignSelf:"center"}}>{item.Idea.slice(0,10)+"..."}</Text>
</ListItem.Title>


 

 <ListItem.Subtitle right={true}  style={{width:1500}}>
    
  <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:18}}> {item.Assessment.slice(0,52)+"..."}</Text>  
     </ListItem.Subtitle>
     

   

 <ListItem.Subtitle>
 <Text style={{color:"darkgreen"}}>{item.Date}</Text>
 </ListItem.Subtitle>
   


 </ListItem>
 </View>
    )
}  
   componentDidMount(){
       this.getQuestionAnswers()
       this.getIdeaAnswers()
       this.getUserData()
   }
    render(){
        return(
            <View style={{backgroundColor:"#F8FAFB",height:"100%"}}>
               
                    {this.state.occupation==="Student"?
                     <View>
                <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen",alignSelf:"center"}}>Answers</Text>
                
              
                     
                        <Avatar
                            avatarStyle={{borderRadius:25,width:200,height:200}}
                            containerStyle={{borderRadus:25,width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/AnswerIcon.PNG")}
                        />
                        
                       
                <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Ideas</Text>
                {this.state.QuestionAnswers.length===0?
      <View style={{backgroundColor:"#F8FAFB",mariginTop:-50}} >
        <Image
        style={{width:200,height:200,alignSelf:"center"}}
        source={require("../assets/Dropbox.PNG")}
        />
        <Text style={{alignSelf:"center",color:"grey",fontSize:25}}>No  Answers currently</Text>
        <Text onPress={()=>{this.getIdeaAnswers()}} style={{alignSelf:"center",color:"grey",fontSize:20}}>Click here to try again.</Text>
        </View>
      :
                <ScrollView style={{height:150}}>
                <FlatList
                data={this.state.IdeaAnswers}
                keyExtractor={(item,index)=>{
                    index.toString()
                }}
                renderItem={this.renderItem2}
           
                >
                    
                </FlatList>
                
                </ScrollView>
    }
    
                <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen",position:"absolute",marginTop:495}}>Questions</Text>
                {this.state.QuestionAnswers.length===0?
                
      <View style={{backgroundColor:"#F8FAFB",marginTop:2}} >
        <Image
        style={{width:200,height:200,alignSelf:"center",marginTop:25}}
        source={require("../assets/Dropbox.PNG")}
        />
        <Text style={{alignSelf:"center",color:"grey",fontSize:25}}>No  Answers currently</Text>
        <Text onPress={()=>{this.getQuestionAnswers()}} style={{alignSelf:"center",color:"grey",fontSize:20}}>Click here to try again.</Text>
        </View>
      :
      <View>
                   
                <ScrollView style={{height:150,marginTop:100}}>
                <FlatList
                data={this.state.QuestionAnswers}
                keyExtractor={(item,index)=>{
                    index.toString()
                }}
                renderItem={this.renderItem}
                
                >
                    
                </FlatList>
                </ScrollView>
                </View>
               
                }
                
               </View>
              
                
            :
            <View style={{height:(Dimensions.get("window").height)*3,backgroundColor:"#F8FAFB"}}>
                  <Image source={require('../assets/Prohibited.PNG')} style={{alignSelf:"center",width:500,height:500,marginTop:"5%",}}/>
                 <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>Only Students can access Answers!</Text>
                  {this.state.occupation==="Expert"?
                <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>And it is your duty to correct their Errors!</Text>  
                :
                <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>And it is your duty to assess their Ideas!</Text>
                }
              </View>
        
        }


                </View>
            
            )
        }
    
}