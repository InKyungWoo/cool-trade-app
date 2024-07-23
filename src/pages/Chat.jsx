import React from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import BasicHeader from '../components/BasicHeader';

const Chat = () => {
    return (
        <SafeAreaView>
            <BasicHeader title={'채팅'} />
            <View>
                <Text>Chat</Text>
            </View>
        </SafeAreaView>
    );
};

export default Chat;
