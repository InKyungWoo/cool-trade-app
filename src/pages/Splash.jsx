import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image, Text, StyleSheet } from 'react-native';

const splashImg = require('../assets/images/splash_img.png');
const { width } = Dimensions.get('window');

const Splash = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('MainTab');
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Image source={splashImg} style={styles.logoImg} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    logoImg: {
        width,
        height: width,
        resizeMode: 'cover',
    },
});

export default Splash;
