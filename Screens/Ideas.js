import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,Dimensions } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'

export default  class IdeaScreen extends React.Component{
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


getIdeas=()=>{
    db.collection("Ideas").onSnapshot((document)=>{
        var Ideas=document.docs.map((doc)=>
            doc.data()
          )
            this.setState({
                Ideas:Ideas
            })
        })
      }
componentDidMount(){
    this.getUserData()
    this.getIdeas()
 }
                   
  
      
renderItem=({item,index})=>{
    return(
    <View>  
        <ListItem  containerStyle={{borderColor:"darkgreen",borderWidth:1,backgroundColor:"white"}} topDivider    bottomDivider>
            <Text style={{color:"darkgreen",fontWeight:"bold"}}>{index+1}</Text>
        <ListItem.Subtitle  style={{alignSelf:"flex-end",marginLeft:"0%",}}>
            <TouchableOpacity  onPress={()=>{
                this.props.navigation.navigate('DescriptionRoute',{'Item':item,'Image':this.state.image, 'Type':'Idea'}) 
                    this.setState({
                        showCardUser:true,
                        name2:item.Fullname,
                        question2:item.Idea,
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
                    }} 
                    style={{width:150,borderWidth:1,borderColor:"darkgreen"}}>
                 <Text style={{fontWeight:"bold",fontSize:15,alignSelf:"center",color:"black"}}>Assess</Text>
            </TouchableOpacity>
        </ListItem.Subtitle>
        <View style={{width:1100}} >
            <ListItem.Title>
                <Text  style={{fontWeight:"bold",fontSize:17}}>{item.Idea.slice(0,52)+"..."}</Text>
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

render(){
    return(
        <View>
            {this.state.occupation==="Representative"||this.state.occupation==="Student"?
                <View>
                    <View style={{backgroundColor:"#F8FAFB",height:"300%"}}>
                        <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen",alignSelf:"center"}}>Ideas</Text>
                        <Avatar
                            avatarStyle={{borderRadius:25,width:200,height:200}}
                            containerStyle={{borderRadus:25,width:200,height:200,alignSelf:"center"}}
                            source={require("../assets/Idea.PNG")}
                        />
                        {this.state.Ideas.length===0?
                            <View style={{backgroundColor:"#F8FAFB",height:"300%"}} >
                                <Image
                                    style={{width:500,height:500,alignSelf:"center"}}
                                    source={require("../assets/Dropbox.PNG")}
                                />
                                <Text style={{alignSelf:"center",color:"grey",fontSize:25}}>No  Ideas currently</Text>
                                <Text onPress={()=>{this.getIdeas()}} style={{alignSelf:"center",color:"grey",fontSize:20}}>Click here to try again.</Text>
                </View>
            : 
            <ScrollView style={{height:1000,backgroundColor:"#F8FAFB"}}  >
                <FlatList
                    data={this.state.Ideas}
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
                <Text style={{alignSelf:"center",fontSize:20,color:"grey",}}>Only Students and Representatives can access Ideas!</Text>
            </View>
        </View>
        
        
        
        }
        </View>   
 
)
}

    



}
