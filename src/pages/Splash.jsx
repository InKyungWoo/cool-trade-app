import React, { useEffect } from 'react';
import { Dimensions, View, Image, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splashImg = require('../assets/images/splash_img.png');
const { width } = Dimensions.get('window');

const Splash = ({ navigation }) => {
    useEffect(() => {
        getCurrentLocation();

        setTimeout(() => {
            navigation.replace('MainTab');
        }, 3000);
    }, []);

    const getMyLocation = () => {
        console.log('get My Location =====>');
        Geolocation.getCurrentPosition(
            async position => {
                console.log('😀 position =====> ', position);
                try {
                    await AsyncStorage.setItem('userLocation', JSON.stringify(position.coords));
                } catch (e) {
                    console.error('Failed to save location to AsyncStorage', e);
                }
            },
            error => {
                console.log('위치 정보 오류:', error);
                switch (error.code) {
                    case 1:
                        console.log('사용자가 위치 정보 제공을 거부했습니다.');
                        break;
                    case 2:
                        console.log('네트워크 문제로 위치를 찾을 수 없습니다.');
                        break;
                    case 3:
                        console.log('위치 정보를 가져오는 데 시간이 초과되었습니다.');
                        break;
                    case 5:
                        console.log('알 수 없는 오류가 발생했습니다.');
                        break;
                    default:
                        console.log('알 수 없는 오류가 발생했습니다.');
                }
            },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
        );
    };

    const getCurrentLocation = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                getMyLocation();
            }
        } else {
            const ios_granted = await Geolocation.requestAuthorization('whenInUse');
            if (ios_granted === 'granted') {
                getMyLocation();
            }
        }
    };

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
