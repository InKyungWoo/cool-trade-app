import React from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LogoHeader from '../components/LogoHeader';
import AppleMap from '../components/AppleMap';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <LogoHeader />
            <View>
                <AppleMap />
            </View>
        </SafeAreaView>
    );
};

export default Home;
