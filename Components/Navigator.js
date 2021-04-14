import React from 'react'
import {View,TouchableOpacity,Text,Image,Linking,ImageBackground} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import db from '../config'
import firebase from 'firebase'
import {Avatar,Badge} from 'react-native-elements'
import  *as ImagePicker from 'expo-image-picker'




export default class Navigator extends React.Component{
    constructor(){
    super()
    this.state={
        email:firebase.auth().currentUser.email,
        account:'',
        name:'',
        address:'',
        number:'',
        occupation:'',
        image:'',
        ide:'',
        enableBackgroundImage:true,
        shouldPlay:false

        }
    }
    
    
        
    getUserDetails=()=>{
        db.collection("Users").where("Email","==",this.state.email).onSnapshot((document)=>{
            document.forEach((data)=>{
                this.setState({
                    
                    account:data.data().Account,
                    name:data.data().Fullname,
                    address:data.data().Address,
                    number:data.data().Number,
                    occupation:data.data().Occupation,
                    ide:data.id

                })
            })
        })
    }
    selectImage= async()=>{
        const {canceled,uri}= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            aspect:[4,3],
            allowsEditing:true,
            quality:1
        })
        if(!canceled){
            this.uploadImage(uri,this.state.email)
        }
       }
       uploadImage=async(URL,image)=>{
       var Image=  await fetch(URL)
       var BlobbedImage= await Image.blob()
       try{
         firebase.storage().ref().child("Profiles/"+image).put(BlobbedImage).then(()=>{
           this.fetchImage(image)
         })  
       }
       catch(error){
           window.alert(error)
       }
       
       }
       fetchImage=async(user)=>{
        firebase.storage().ref().child("Profiles/"+user).getDownloadURL().then((URL)=>{
           this.setState({
               image:URL
           })
       })
       }
    componentDidMount(){
        this.getUserDetails()
        this.fetchImage(this.state.email)
        console.log(this.state.image)
       
        
        
    }
    render(){
        return(
           <View>
              

         
         
        
            
               {this.state.enableBackgroundImage===true?
               
            <Text onPress={()=>{this.setState({enableBackgroundImage:false,})}} style={{fontWeight:"bold"}}>Disable Background Image</Text>   
            :
            <Text onPress={()=>{this.setState({enableBackgroundImage:true})}} style={{fontWeight:"bold"}}>Enable Background Image</Text>
            }
          {this.state.enableBackgroundImage===true?
           <View  style={{height:"300%",backgroundColor:"lightgreen"}} >
           <ImageBackground source={this.state.image}>
               <View style={{borderWidth:2,borderColor:"darkgreen"}}>
               <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.account}</Text>
               <Badge status="error" style={{alignSelf:"center"}} value="Change Profile Picture" onPress={()=>{this.selectImage()}}/>
                <Avatar
               onPress={()=>{this.selectImage()}}
               placeholderStyle={{backgroundColor:"grey"}}
               source={this.state.image}
               containerStyle={{borderColor:"darkgreen",borderRadius:25,alignSelf:"center",width:200,height:200,backgroundColor:"grey",marginTop:25,borderWidth:1}}
               rounded={true}
               iconStyle={{borderRadius:100,width:200,height:200}}
               size="medium"
               />
               <View style={{borderTopWidth:2,borderBottomWidth:2,borderColor:"darkgreen",marginTop:25,backgroundColor:"#F8FAFB"}}>
               <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.name}</Text>
               <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Email: {this.state.email}</Text>
               <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Occupation: {this.state.occupation}</Text>
               <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Number: {this.state.number}</Text>
               <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>User ID: {this.state.ide}</Text>
               </View>
               
               
               <Badge status="primary" style={{alignSelf:"center"}} value="Open Email in Google Mail" onPress={()=>{Linking.openURL(" https://mail.google.com/mail/u/"+this.state.email)}}/>
               <TouchableOpacity onPress={()=>{firebase.auth().signOut(),this.props.navigation.navigate('LoginRoute')}}  style={{borderWidth:3,height:90,backgroundColor:"#F8FAFB"}}>
                   <Text style={{fontSize:27,alignSelf:"center",fontWeight:"bold"}}>Log Out</Text>
                   <Image
                   style={{width:45,height:45,alignSelf:"center"}}
                   source={require("../assets/Logout.PNG")}/>
               </TouchableOpacity>
               </View>
               <View >
               <DrawerItems itemStyle={{borderWidth:1,borderRadius:25}} {...this.props}>
                   </DrawerItems>
                   </View>
</ImageBackground>
                   </View>
                   :
                   <View  style={{height:"300%",backgroundColor:"lightgreen"}} >
                   
                       <View style={{borderWidth:2,borderColor:"darkgreen"}}>
                       <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.account}</Text>
                       <Badge status="error" style={{alignSelf:"center"}} value="Change Profile Picture" onPress={()=>{this.selectImage()}}/>
                        <Avatar
                       onPress={()=>{this.selectImage()}}
                       placeholderStyle={{backgroundColor:"grey"}}
                       source={this.state.image}
                       containerStyle={{borderColor:"darkgreen",borderRadius:25,alignSelf:"center",width:200,height:200,backgroundColor:"grey",marginTop:25,borderWidth:1}}
                       rounded={true}
                       iconStyle={{borderRadius:100,width:200,height:200}}
                       size="medium"
                       />
                       <View style={{borderTopWidth:2,borderBottomWidth:2,borderColor:"darkgreen",marginTop:25}}>
                       <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.name}</Text>
                       <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Email: {this.state.email}</Text>
                       <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Occupation: {this.state.occupation}</Text>
                       <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>Number: {this.state.number}</Text>
                       <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>User ID: {this.state.ide}</Text>
                       </View>
                       
                       
                       <Badge status="primary" style={{alignSelf:"center"}} value="Open Email in Google Mail" onPress={()=>{Linking.openURL(" https://mail.google.com/mail/u/"+this.state.email)}}/>
                       <TouchableOpacity onPress={()=>{firebase.auth().signOut(),this.props.navigation.navigate('LoginRoute')}}  style={{borderWidth:3,height:90,backgroundColor:"#F8FAFB"}}>
                           <Text style={{fontSize:27,alignSelf:"center",fontWeight:"bold"}}>Log Out</Text>
                           <Image
                           style={{width:45,height:45,alignSelf:"center"}}
                           source={require("../assets/Logout.PNG")}/>
                       </TouchableOpacity>
                       </View>
                       <View >
                       <DrawerItems itemStyle={{borderWidth:1,borderRadius:25}} {...this.props}>
                           </DrawerItems>
                           </View>
     
                           </View>
        }
           
        
                    
            </View>
          
            
            
        )
    }
}