import React, { useEffect } from 'react';
import { Dimensions, View, Image, StyleSheet, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

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
            position => {
                console.log('😀 position =====> ', position);
                // 상태관리 라이브러리나 Async Storage에 현재 위치 저장하기
                // coords에 latitude와 longitude가 있음. (위경도)
                // userStore.setCurrentLocation(position.coords);
                // 여기서 상태 관리 라이브러리나 Async Storage를 사용하여 위치 저장
            },
            error => {
                console.log('error가 있습니다.', error);
                // 에러 처리 로직, console로 확인
                if (error.code === 1) {
                    console.log('설정에서 위치를 허용해주세요.');
                } else if (error.code === 5) {
                    console.log('다시 시도하여 확인을 눌러주세요.');
                } else {
                    console.log('다시 시도하여 확인을 눌러주세요.');
                }
            },
            { enableHighAccuracy: false, timeout: 2000 },
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
