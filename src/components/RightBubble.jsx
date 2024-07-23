import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AudioMessage = ({ audioUri, onPress, isPlaying }) => {
    return (
        <TouchableOpacity onPress={() => onPress(audioUri)}>
            <Text style={styles.audioText}>
                {isPlaying ? '음성 메시지 정지' : '음성 메시지 재생'}
            </Text>
        </TouchableOpacity>
    );
};

const MessageBubble = ({ message, onAudioPress, isPlaying }) => {
    if (message.image) {
        return (
            <Image
                source={{ uri: message.image }}
                style={{ width: 200, height: 200, borderRadius: 10 }}
            />
        );
    } else if (message.audio) {
        return (
            <AudioMessage audioUri={message.audio} onPress={onAudioPress} isPlaying={isPlaying} />
        );
    }
    return <Text style={styles.messageText}>{message.text}</Text>;
};

const RightBubble = ({ message, prevMessage, nextMessage, onAudioPress, isPlaying }) => {
    const showInfo = !nextMessage || nextMessage.sender !== 'me';

    return (
        <View style={styles.container}>
            {showInfo && (
                <View style={styles.infoWrapper}>
                    <Text style={styles.readStatus}>{message.isRead ? '읽음' : '읽지 않음'}</Text>
                    <View style={styles.microBar} />
                    <Text style={styles.messageTime}>{message.time}</Text>
                </View>
            )}
            <View style={styles.messageContainer}>
                <MessageBubble
                    message={message}
                    onAudioPress={onAudioPress}
                    isPlaying={isPlaying}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: 16,
    },
    infoWrapper: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        marginRight: 4,
    },
    messageContainer: {
        backgroundColor: '#eceefb',
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },
    messageText: {
        fontSize: 15,
        color: '#414141',
        lineHeight: 22.5,
    },
    audioText: {
        fontSize: 15,
        color: '#414141',
        lineHeight: 22.5,
        textDecorationLine: 'underline',
    },
    messageTime: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
    readStatus: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
    microBar: {
        width: 1,
        height: 4,
        backgroundColor: '#D5D5D5',
    },
});

export default RightBubble;