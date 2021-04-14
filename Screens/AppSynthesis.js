import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,SafeAreaView,Linking } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar,Header,} from 'react-native-elements'

export default class AppSynthesisScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:firebase.auth().currentUser.email,
            account:'',
            occupation:''
            

        }
    }

    getUserDetails=()=>{
        db.collection("Users").where("Email","==",this.state.email).get().then((document)=>{
          document.forEach((doc)=>{
            this.setState({
              account:doc.data().Account,
              occupation:doc.data().Occupation
              
            })
          }
          )
        })
      }
    componentDidMount(){
        this.getUserDetails()
    }
    
    render(){
        return(
            <View style={{backgroundColor:"F8FAFB",height:"100%"}}>
                <Text style={{fontSize:32,color:"darkgreen",fontWeight:"bold",alignSelf:"center"}}>App Synthesis</Text>
                <Avatar
                            avatarStyle={{borderRadius:25,width:200,height:200}}
                            containerStyle={{borderRadus:25,width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/AnswerIcon.PNG")}
                        />
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>Hello {this.state.account} ! Welcome to Mind Overview! Mind Overview is a forum where a certain type of Users "Students" post questions and ideas. Questions are only visible to another user type "Exeprts" and ideas are only visible to the user type "Representatives".
                You are a/an {this.state.occupation}
                 </Text>  
                <Text style={{fontSize:25,alignSelf:"center",color:"darkgreen",fontWeight:"bold",fontSize:15}}>Main App Synthesis:</Text>   
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>
                    The app consists of a drawer navigator or side bar menu, which enables the user to travel to various screens. It can be activated by using the drag input, to the right
                    The screens are listed below:(You can travel to the screen by clicking on it.)
                </Text>
                <Text onPress={()=>{this.props.navigation.navigate("AnswerRoute")}} style={{color:"darkgreen",alignSelf:"center",fontSize:15}}>1.Answers</Text>
                <Text onPress={()=>{this.props.navigation.navigate("QuestionRoute")}} style={{color:"darkgreen",alignSelf:"center",fontSize:15}}>2.Questions(under Home section)</Text>
                <Text onPress={()=>{this.props.navigation.navigate("IdeaRoute")}} style={{color:"darkgreen",alignSelf:"center",fontSize:15}}>3.Ideas(under Home section)</Text>
                <Text onPress={()=>{this.props.navigation.navigate("AskAndProposeRoute")}} style={{color:"darkgreen",alignSelf:"center",fontSize:15}}>4.Ask and Propose</Text>
                <Text onPress={()=>{this.props.navigation.navigate("SettingRoute")}} style={{color:"darkgreen",alignSelf:"center",fontSize:15}}>5.User Info</Text>
                <Text style={{alignSelf:"center",color:"grey"}}>
                A Student has access to all the screens, while the Expert and Representative only have access to: 
                </Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>Experts:</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>1.Questions</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>2.User Info</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>Representative</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>1.Ideas</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>2.User Info</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>However, Experts and Represenatives can answer students' questions and assess students' ideas respectively</Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>that is all you need to know! Wait,did you know about the background music...well,it caan be activated with a button present next to the login button(or even the sign up button),but be aware, for if you enable it once, it will run forever, until you reload the app. The only way to stop it, with the app running is to lower your system volume, or you can just get used to it... </Text>
                <Text style={{alignSelf:"center",color:"grey",fontSize:15}}>But we are sure you will enjoy it...:)</Text>

                
            </View>
        )
    }  
}