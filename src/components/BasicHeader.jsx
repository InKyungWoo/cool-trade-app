import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const back_arrow = require('../assets/icons/back_arrow.png');

const BasicHeader = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={back_arrow} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{ width: 40, height: 63 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#6C96EA',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1D3FC6',
    },
});

export default BasicHeader;
