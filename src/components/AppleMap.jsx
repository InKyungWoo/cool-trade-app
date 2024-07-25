import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const AppleMap = () => {
    const [region, setRegion] = useState({
        latitude: 37.363446,
        longitude: 127.12793,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
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

        loadLocation();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
            />
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
});

export default AppleMap;
