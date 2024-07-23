import React from 'react';
import { Dimensions, Image, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import BasicHeader from '../components/BasicHeader';


const Profile = () => {
    return (
        <SafeAreaView>
            <BasicHeader title={'프로필 설정'} />
            <View>
                <Text>Profile</Text>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
