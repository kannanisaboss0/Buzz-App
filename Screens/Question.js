import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,Dimensions } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'
import {Audio} from 'expo-av'


export default class QuestionScreen extends React.Component{
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
            answer:'',
            email2:'',
            showCardIdea:false,
            idea:'',
            image:'',
            email3:'',
            color:'',
            number:'',
            address:'',
            showCardProfile:false,
            email4:'',
            Ideas:[]
        }
    }



getUserData=()=>{
    db.collection("Users").where("Email","==",this.state.email).onSnapshot((document)=>
        document.forEach((doc)=>{
        this.setState({
            occupation:doc.data().Occupation,
            name:doc.data().Account,
            fullname:doc.data().Fullname,
            email3:doc.data().Email,
              
      
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
    
renderItem=({item,index})=>{
    return(
    <View>  
        <ListItem  containerStyle={{borderColor:"darkgreen",borderWidth:1,backgroundColor:"white"}} topDivider    bottomDivider>
            <Text style={{color:"darkgreen",fontWeight:"bold"}}>{index+1}</Text>
            
            <ListItem.Subtitle  style={{alignSelf:"flex-end",marginLeft:"0%",}}>
            <TouchableOpacity  onPress={()=>{
                this.props.navigation.navigate('DescriptionRoute',{'Item':item,'Image':this.state.image,'Type':'Question'})
                this.setState({
                showCardUser:true,
                name2:item.Fullname,
                question2:item.Question,
                account:item.Account,
                date:item.Date,
                email2:item.Email,
                number:item.Number,
                address:item.Address,
                image:''
            })
            firebase.storage().ref().child("Profiles/"+item.Email).getDownloadURL().then((URL)=>{
              this.setState({
                image:URL
              })
              })
            }} style={{width:150,borderWidth:1,borderColor:"darkgreen"}}>
                <Text style={{fontWeight:"bold",fontSize:15,alignSelf:"center",color:"black"}}>Answer</Text>
            </TouchableOpacity>
            </ListItem.Subtitle>
            <View style={{width:1100}} >
                <ListItem.Title>
                    <Text  style={{fontWeight:"bold",fontSize:17}}>{item.Question.slice(0,52)+"..."}</Text>
                </ListItem.Title>
            </View>
            <ListItem.Subtitle right style={{width:300,fontFamily:"cursive"}}>
            <Text>{this.state.image}</Text>
                Asked By: {item.Account}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={{color:"darkgreen"}}>
                Date Asked: {item.Date}
            </ListItem.Subtitle>
        </ListItem>
    </View>
          )
      }

componentDidMount(){
    this.getUserData()
    this.getQuestions()
    this.props.navigation.toggleDrawer()
}
componentDidUpdate(){
    firebase.storage().ref().child("Profiles/"+this.state.email2).getDownloadURL().then((URL)=>{
      this.setState({
        image:URL
      })
      })
  }     
      
      
render(){
        return(
            <View>
                {this.state.occupation==="Student"||this.state.occupation==="Expert"?
                    <View style={{backgroundColor:"#F8FAFB",height:"300%"}}>
                        <View style={{borderWidth:1,borderColor:"darkgreen"}}>
                        <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen",alignSelf:"center"}}>Questions</Text>
                        <Avatar
                            avatarStyle={{borderRadius:25,width:200,height:200}}
                            containerStyle={{borderRadus:25,width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/Question.PNG")}
                        />
                    {this.state.Questions.length===0?
                        <View>
                            <Image
                            style={{width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/Dropbox.PNG")}
                            />
                            <Text style={{alignSelf:"center",color:"grey",fontSize:25}}>No Questions currently</Text>
                            <Text onPress={()=>{this.getQuestions()}} style={{alignSelf:"center",color:"grey",fontSize:20}}>Click here to try again.</Text>
                        </View>
                    :
                    <ScrollView style={{height:1000,backgroundColor:"#F8FAFB"}}  >
                            <FlatList
                            data={this.state.Questions}
                            keyExtractor={(item,index)=>{
                                index.toString()
                            }}
                            renderItem={this.renderItem}
                            />
                    </ScrollView>
                    
                    }
                    </View>
            </View>
                :
            <View>
                <View style={{height:(Dimensions.get("window").height)*3,backgroundColor:"#F8FAFB"}}>
                    <Image source={require('../assets/Prohibited.PNG')} style={{alignSelf:"center",width:500,height:500,marginTop:"5%"}}/>
                    <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>Only Students and Experts can access Questions!</Text>
                </View>
            </View>
}
            </View>
        )
    }
}