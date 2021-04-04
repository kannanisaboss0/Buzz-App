import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'
import HomeScreen from './Screens/Home';
import SettingScreen from './Screens/Settings'
import Login from './Screens/Login'
import {createDrawerNavigator,} from 'react-navigation-drawer'
import Navigator from './Components/Navigator'

export default class App extends React.Component {
  render(){
    return(
      <View style={{flex:1}}>
        <Container/>

      </View>
    )
  }
 
}

const DrawerNavigator=createDrawerNavigator({
  HomeRoute:{screen:HomeScreen,navigationOptions:{drawerLabel:'Home'}},
  SettingRoute:{screen:SettingScreen, navigationOptions:{drawerLabel:'Settings'}},
  
 
},
{initialRouteName:'HomeRoute', 
contentComponent:Navigator
},

)  

const SwitchNavigator=createSwitchNavigator({
  LoginRoute:{screen:Login},
  
  DrawerRoute:{screen:DrawerNavigator }
  })

const Container=createAppContainer(SwitchNavigator)