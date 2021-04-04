import React from 'react'
import {View,TouchableOpacity,Text,Image,Linking} from 'react-native'
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
        image:''
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
                    occupation:data.data().Occupation

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
         firebase.storage().ref().child("Profiles"+image).put(BlobbedImage).then(()=>{
           this.fetchImage(image)
         })  
       }
       catch(error){
           window.alert(error)
       }
       
       }
       fetchImage=async(user)=>{
        firebase.storage().ref().child("Profiles"+user).getDownloadURL().then((URL)=>{
           this.setState({
               image:URL
           })
       })
       }
    componentDidMount(){
        this.getUserDetails()
        this.fetchImage(this.state.email)
    }
    render(){
        return(
            <View>
                <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.account}</Text>
                 <Avatar
                onPress={()=>{this.selectImage()}}
                placeholderStyle={{backgroundColor:"grey"}}
                source={this.state.image}
                containerStyle={{borderColor:"darkgreen",borderRadius:25,alignSelf:"center",width:200,height:200,backgroundColor:"grey",marginTop:25,borderWidth:1}}
                rounded={true}
                iconStyle={{borderRadius:100,width:200,height:200}}
                size="medium"
                />
                
                <Text style={{fontWeight:"bold",color:"darkgreen",fontSize:30,alignSelf:"center"}}>{this.state.name}</Text>
                <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>{this.state.email}</Text>
                <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>{this.state.occupation}</Text>
                <Text style={{color:"darkgreen",fontSize:15,fontWeight:"bold"}}>{this.state.number}</Text>
                <Badge status="primary" style={{alignSelf:"center"}} value="Open Email in Google Mail" onPress={()=>{Linking.openURL(" https://mail.google.com/mail/u/"+this.state.email)}}/>
                <View style={{backgroundColor:"darkgreen",borderWidth:1,marginTop:25}}>
                <DrawerItems itemStyle={{borderBottomWidth:1,}} {...this.props}>
                    </DrawerItems>
                    </View>

            </View>
        )
    }
}