import React from 'react';
import Profile from '../screens/Profile';
import {
  createStaticNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Home from '../screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Routes(){
  const AppTabs = createBottomTabNavigator({
    initialRouteName: 'Home',
    screens: {
      Home: Home,
      Profile: Profile
    },
    id: undefined
  });

  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Login',
    screenOptions: {
      headerShown: false
    },
    screens: {
      Login: Login,
      AppTab: AppTabs,
    },
  });

const Navigation = createStaticNavigation(RootStack);
    return <Navigation />
}