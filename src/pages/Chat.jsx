import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BasicHeader from '../components/BasicHeader';
import { dummyChats } from '../data/dummyChats';

const Chat = () => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => {
        const lastMessage = item.messages[item.messages.length - 1];
        const messageText =
            lastMessage.text ||
            (lastMessage.image
                ? '이미지를 보냈습니다.'
                : lastMessage.audio
                ? '음성 메시지를 보냈습니다.'
                : '');

        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => navigation.navigate('ChatDetail', { userId: item.id })}>
                <Image source={{ uri: item.profile }} style={styles.profile} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={{ color: '#666' }} numberOfLines={2} ellipsizeMode="tail">
                        {messageText}
                    </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#999' }}>{lastMessage.time}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader title={'채팅'} />
            <View>
                <FlatList
                    data={dummyChats}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 0.5,
        borderColor: '#A7E6FF',
    },
    profile: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});


export default Chat;
