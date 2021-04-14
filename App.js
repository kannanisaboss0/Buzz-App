import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'

import HomeScreen from './Screens/Home';
import SettingScreen from './Screens/Settings'
import Login from './Screens/Login'
import {createDrawerNavigator,} from 'react-navigation-drawer'
import Navigator from './Components/Navigator'
import Description from './Screens/Description'
import AnswerScreen from './Screens/Answers'
import AskAndProposeScreen from './Screens/AskandPropose'
import QuestionScreen from './Screens/Question';
import IdeaScreen from './Screens/Ideas';
import AnswerViewScreen from './Screens/AnswerView';
import AppSynthesisScreen from './Screens/AppSynthesis';
import BackgroundMusicScreen from './Screens/BackgroundMusicScreen';
import BackgroundMusicScreen2 from './Screens/BackGroundMusic2Screen';

export default class App extends React.Component {
  render(){
    return(
      <View style={{flex:1}}>
        <Container/>

      </View>
    )
  }
 
}


const TabNavigator=createMaterialTopTabNavigator({
  QuestionRoute:{screen:QuestionScreen,navigationOptions:{tabBarLabel:'Questions',tabBarIcon:<Image source={require("./assets/Question.PNG")} style={{width:40,height:40}}/>}},
  IdeaRoute:{screen:IdeaScreen,navigationOptions:{tabBarLabel:'Ideas',tabBarIcon:<Image source={require("./assets/Idea.PNG")}/>}}
})

const DrawerNavigator=createDrawerNavigator({
  HomeRoute:{screen:TabNavigator,navigationOptions:{drawerLabel:'Home',drawerIcon:<Image style={{width:40,height:40,borderTopLeftRadius:25,borderBottomLeftRadius:25}} source={require("./assets/Home.PNG")}/>}},
  SettingRoute:{screen:SettingScreen, navigationOptions:{drawerLabel:'User Info',drawerIcon:<Image style={{width:40,height:40,borderTopLeftRadius:25,borderBottomLeftRadius:25}} source={require("./assets/Settings.PNG")}/>}},
  AnswerRoute:{screen:AnswerScreen,navigationOptions:{drawerLabel:'Answers',drawerIcon:<Image style={{width:40,height:40,borderTopLeftRadius:25,borderBottomLeftRadius:25}} source={require("./assets/AnswerIcon.PNG")}/>}},
  AskAndProposeRoute:{screen:AskAndProposeScreen,navigationOptions:{drawerLabel:'Ask&Propose',drawerIcon:<View style={{alignItems:"stretch"}}><Image style={{width:40,height:40,borderTopLeftRadius:25,borderBottomLeftRadius:25}} source={require("./assets/Question.PNG")}/></View>}},
  AppSynthesisRoute:{screen:AppSynthesisScreen,navigationOptions:{drawerLabel:'App Synthesis',drawerIcon:<View style={{alignItems:"stretch"}}><Image style={{width:40,height:40,borderTopLeftRadius:25,borderBottomLeftRadius:25}} source={require("./assets/AppSynthesis.PNG")}/></View>}}
  
 
},
{initialRouteName:'HomeRoute', 
contentComponent:Navigator
},

)  

const SwitchNavigator=createSwitchNavigator({
  LoginRoute:{screen:Login},
  DescriptionRoute:{screen:Description},
  DrawerRoute:{screen:DrawerNavigator },
  AnswerViewRoute:{screen:AnswerViewScreen},
 BackgroundMusicRoute:{screen:BackgroundMusicScreen},
 BackgroundMusicRoute2:{screen:BackgroundMusicScreen2}
  })

const Container=createAppContainer(SwitchNavigator)