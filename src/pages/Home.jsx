import React from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import LogoHeader from '../components/LogoHeader';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View>
                <LogoHeader />
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;
