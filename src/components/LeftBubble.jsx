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

const LeftBubble = ({ message, prevMessage, nextMessage, onAudioPress, isPlaying }) => {
    const showInfo = !nextMessage || nextMessage.sender !== 'other';

    return (
        <View style={styles.container}>
            <View style={styles.messageContainer}>
                <MessageBubble
                    message={message}
                    onAudioPress={onAudioPress}
                    isPlaying={isPlaying}
                />
            </View>
            {showInfo && (
                <View style={styles.infoWrapper}>
                    <Text style={styles.messageTime}>{message.time}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    messageContainer: {
        backgroundColor: '#ECECEC',
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
    infoWrapper: {
        flexDirection: 'row',
        marginTop: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    messageTime: {
        fontSize: 10,
        color: '#737373',
        lineHeight: 14.98,
    },
});

export default LeftBubble;