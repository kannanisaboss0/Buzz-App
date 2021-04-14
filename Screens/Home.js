
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'



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


addQuestion=()=>{
  if(this.state.question){
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
          <Text  style={{fontWeight:"bold",fontSize:17}}>{item.Question}</Text>
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
renderItem2=({item,index})=>{
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
        }} style={{width:150,borderWidth:1,borderColor:"darkgreen"}}>
          <Text style={{fontWeight:"bold",fontSize:15,alignSelf:"center",color:"black"}}>Assess</Text>
       </TouchableOpacity>
      </ListItem.Subtitle>
      
      
        <View style={{width:1100}} >
          <ListItem.Title>
            <Text  style={{fontWeight:"bold",fontSize:17}}>{item.Idea}</Text>
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
  this.getQuestions(
    this.getIdeas()
  )
 
  console.log(this.state.image)
  
  
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
  <View style={{backgroundColor:"#F8FAFB"}}>
    {this.state.occupation==="Student"?
        
              <View style={{backgroundColor:"#F8FAFB"}}>
                <View style={{borderWidth:1,borderColor:"darkgreen"}}>
                  <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Questions</Text>
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
               
               <ScrollView style={{height:300,}}  >
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
                  
               
      
                
                  
                  
               <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Ideas</Text>
               {this.state.Ideas.length===0?
               <View>
                 
                 <Image
                 style={{width:200,height:200,alignSelf:"center"}}
                 source={require("../assets/Dropbox.PNG")}
                 />
                 <Text style={{alignSelf:"center",color:"grey",fontSize:25}}>No Ideas currently</Text>
                 <Text onPress={()=>{this.getIdeas()}} style={{alignSelf:"center",color:"grey",fontSize:20}}>Click here to try again.</Text>
                 </View>
               :
               
               <ScrollView style={{height:300,}}  >
                    <FlatList
                      data={this.state.Ideas}
                      keyExtractor={(item,index)=>{
                        index.toString()
                      }}
                      renderItem={this.renderItem2}
                    />
                  </ScrollView>
               
               }
                
             
              </View>
         
         
        
        
   
          

  :
  <View>
    {this.state.occupation==="Expert"?

    <View style={{backgroundColor:"#F8FAFB",height:"300%"}}>
      <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Questions</Text>
      {this.state.Questions.length===0?
      <View style={{backgroundColor:"#F8FAFB",height:"300%"}} >
        <Image
        style={{width:500,height:500,alignSelf:"center"}}
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
    :
    
    <View style={{backgroundColor:"#F8FAFB",height:"300%"}}>
      <Text style={{fontSize:32,fontWeight:"bold",color:"darkgreen"}}>Idea</Text>
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
             renderItem={this.renderItem2}
           />
         </ScrollView>
}
    </View>
}
  
   
        

  </View> 
  
  }
       
      </View>
    )
  }

}