import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const logo = require('../assets/images/header_logo.png');

const LogoHeader = () => {
    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 64,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#6C96EA',
    },
    logo: {
        width: 150,
        height: 56.25,
    },
});

export default LogoHeader;
