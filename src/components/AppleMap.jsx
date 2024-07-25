import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { dummyItems } from '../data/dummyItems';

const { width, height } = Dimensions.get('window');
const currentLocation = require('../assets/icons/currentLocation.png');
const zoominIcon = require('../assets/icons/zoomIn.png');
const zoomOutIcon = require('../assets/icons/zoomOut.png');
const customPin = require('../assets/icons/customPin.png');

const AppleMap = () => {
    const [region, setRegion] = useState({
        latitude: 37.363446,
        longitude: 127.12793,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const mapRef = useRef(null);

    useEffect(() => {
        loadLocation();
    }, []);

    const loadLocation = async () => {
        try {
            const savedLocation = await AsyncStorage.getItem('userLocation');
            if (savedLocation) {
                const parsedLocation = JSON.parse(savedLocation);
                setRegion({
                    ...region,
                    latitude: parsedLocation.latitude,
                    longitude: parsedLocation.longitude,
                });
            }
        } catch (e) {
            console.error('저장된 위치 load 실패', e);
        }
    };

    // 현재 위치로 이동
    const goToCurrentLocation = () => {
        Geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            mapRef.current.animateToRegion(
                {
                    latitude,
                    longitude,
                },
                1000,
            );
        });
    };

    // 줌인 & 줌아웃
    const zoomIn = () => {
        const newRegion = {
            ...region,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2,
        };
        mapRef.current.animateToRegion(newRegion, 300);
    };

    const zoomOut = () => {
        const newRegion = {
            ...region,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2,
        };
        mapRef.current.animateToRegion(newRegion, 300);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                zoomEnabled={true}
                zoomControlEnabled={true}>
                {dummyItems.map(item => (
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.location.latitude,
                            longitude: item.location.longitude,
                        }}
                        title={item.title}
                        description={item.content}
                        // pinColor="#5b86dc"
                    >
                        <Image
                            source={customPin}
                            style={{ width: 40, height: 40 }} // 크기를 원하는 대로 조정하세요
                            resizeMode="contain"
                        />
                    </Marker>
                ))}
            </MapView>

            <View style={styles.buttonContainer}>
                <View>
                    <TouchableOpacity onPress={goToCurrentLocation}>
                        <Image source={currentLocation} style={styles.buttonStyle} />
                    </TouchableOpacity>
                </View>
                <View style={{ gap: 5 }}>
                    <TouchableOpacity onPress={zoomIn}>
                        <Image source={zoominIcon} style={styles.buttonStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={zoomOut}>
                        <Image source={zoomOutIcon} style={styles.buttonStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height,
        width,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    buttonStyle: {
        width: 30,
        height: 30,
    },
});

export default AppleMap;
