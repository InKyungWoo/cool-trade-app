import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const homeOn = require('../assets/icons/bottomtab/home_on.png');
const homeOff = require('../assets/icons/bottomtab/home_off.png');
const searchOn = require('../assets/icons/bottomtab/search_on.png');
const searchOff = require('../assets/icons/bottomtab/search_off.png');
const chatOn = require('../assets/icons/bottomtab/chat_on.png');
const chatOff = require('../assets/icons/bottomtab/chat_off.png');
const personOn = require('../assets/icons/bottomtab/person_on.png');
const personOff = require('../assets/icons/bottomtab/person_off.png');

const CustomBottomTab = ({ state, navigation, insets, descriptors }) => {
    const tab1Value = useRef(new Animated.Value(0)).current;
    const tab2Value = useRef(new Animated.Value(0)).current;
    const tab3Value = useRef(new Animated.Value(0)).current;
    const tab4Value = useRef(new Animated.Value(0)).current;
    const tab5Value = useRef(new Animated.Value(0)).current;

    const scaleAnimated = (value, animatedValue) =>
        Animated.timing(animatedValue, {
            useNativeDriver: true,
            toValue: value,
            duration: 150,
        });
    const animatedValues = {
        0: tab1Value,
        1: tab2Value,
        2: tab3Value,
        3: tab4Value,
        4: tab5Value,
    };

    return (
        <View style={[styles.bottomTabBarWrapper, { paddingBottom: insets.bottom }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = route.name;
                const isFocused = state.index === index;
                const animatedOf = animatedValues[index];

                const iconFlag = bool => {
                    switch (label) {
                        case 'Home':
                            return bool ? homeOn : homeOff;
                        case 'Search':
                            return bool ? searchOn : searchOff;
                        case 'Chat':
                            return bool ? chatOn : chatOff;
                        default:
                            return bool ? personOn : personOff;
                    }
                };

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }

                    scaleAnimated(1, animatedOf).start(({ finished }) => {
                        if (finished) {
                            scaleAnimated(0, animatedOf).start();
                        }
                    });
                };
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={onPress}
                        style={{ flex: 1, alignItems: 'center' }}>
                        <Animated.Image
                            source={iconFlag(isFocused)}
                            resizeMode={'contain'}
                            style={{
                                width: 24,
                                height: 24,
                                transform: [
                                    {
                                        scale: animatedOf.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 0.9],
                                        }),
                                    },
                                ],
                            }}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabBarWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderColor: '#EEE',
        backgroundColor: '#FFF',
        paddingTop: 10,
        zIndex: 10,
    },
});

export default CustomBottomTab;
