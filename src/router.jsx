import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './components/CustomBottomTab';

import Splash from './pages/Splash';
import Home from './pages/Home';
import Search from './pages/Search';
import Chat from './pages/Chat';
import Profile from './pages/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={props => {
                return <CustomBottomTab {...props} />;
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const Router = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="MainTab" component={MainTab} />
        </Stack.Navigator>
    );
};
export default Router;
