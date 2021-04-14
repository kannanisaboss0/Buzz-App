import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput,FlatList,ScrollView,Dimensions} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import *as Permissions from 'expo-permissions'
import db from '../config'
import firebase from 'firebase'
import {Input,Card,ListItem, Avatar} from 'react-native-elements'
import {Audio} from 'expo-av'

export default class BackgroundMusicScreen2 extends React.Component{
    constructor(){
        super();
        this.state={

        }
    }
    playSong=async()=>{
        await Audio.Sound.createAsync({
          uri:require("../assets/Audio.mp3")
           
        },
  
        {shouldPlay:true,
            volume:0.1,
            isMuted:false,
            isLooping:true
            
           
           

        }
        )
        
        }
        
    componentDidMount(){
        this.playSong()
    }
    render(){
        return(
            <View>
                <Text>Playing Song...</Text>
                <Text style={{fontSize:32}}>You are currently in the peripheral app system</Text>
                <Text onPress={()=>{this.props.navigation.navigate('AppSynthesisRoute')}}  style={{fontSize:40}}>Navigate to main app</Text>
            </View>
        )
    }
}