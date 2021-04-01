import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator,createMaterialTopTabNavigator} from 'react-navigation-tabs'
import MainScreen from './Screens/FaceBook';
import LoremIpsum from './Screens/Instagram'
import Login from './Screens/Login'

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
MainRoute: {screen:MainScreen},
 LoremRoute: {screen:LoremIpsum},
}
)
const SwitchNavigator=createSwitchNavigator({
  LoginRoute:{screen:Login},
  TabRoute:{screen:TabNavigator}
  })
const Container=createAppContainer(SwitchNavigator)