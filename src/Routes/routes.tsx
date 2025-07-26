import React from 'react';
import Profile from '../screens/Profile';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyTabBar } from '../components/TabBar';
import Movies from '../screens/Movies';
import TvShows from '../screens/TvShows';
import ProfileSeeAll from '../screens/ProfileSeeAll';
import ProfileList from '../screens/ProfileList';
import Details from '../screens/Details';
import ListDetails from '../screens/ListDetails';

export default function Routes() {
  const AppTabs = createBottomTabNavigator({
    initialRouteName: 'Movies',
    screenOptions: {
      headerShown: false,
    },
    // eslint-disable-next-line react/no-unstable-nested-components
    tabBar: props => <MyTabBar {...props} />,

    screens: {
      TvShows: TvShows,
      Movies: Movies,
      Profile: Profile,
    },
  });

  const RootStack = createNativeStackNavigator({
    initialRouteName: 'Login',
    screenOptions: {
      headerShown: false,
    },
    screens: {
      Login: Login,
      AppTab: AppTabs,
      ProfileSeeAll: ProfileSeeAll,
      ProfileList: ProfileList,
      Details: Details,
      ListDetails: ListDetails,
    },
  });

  const Navigation = createStaticNavigation(RootStack);
  return <Navigation />;
}
