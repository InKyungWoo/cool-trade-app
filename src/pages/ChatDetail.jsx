import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import dayjs from 'dayjs';
import { useFocusEffect } from '@react-navigation/native';

import { dummyChats } from '../data/dummyChats';
import BasicHeader from '../components/BasicHeader';
import LeftBubble from '../components/LeftBubble';
import RightBubble from '../components/RightBubble';

const plusIcon = require('../assets/icons/chatmodal/plus.png');
const photoButton = require('../assets/icons/chatmodal/photoButton.png');
const cameraButton = require('../assets/icons/chatmodal/cameraButton.png');
const voiceButton = require('../assets/icons/chatmodal/voiceButton.png');

const { width } = Dimensions.get('window');

const ChatDetail = ({ route, navigation }) => {
    const { userId, sellerId, sellerNickname, itemTitle } = route.params;
    // const chatData = dummyChats.find(chat => chat.id === userId);
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [inputText, setInputText] = useState('');
    const [playingAudio, setPlayingAudio] = useState(null);
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

    useEffect(() => {
        if (userId) {
            // 기존 채팅
            const chatData = dummyChats.find(chat => chat.id === userId);
            if (chatData) {
                setMessages(chatData.messages);
                setUserName(chatData.username);
                navigation.setOptions({ title: chatData.username });
            } else {
                console.error('채팅 데이터를 찾을 수 없습니다 (userId): ', userId);
            }
        } else if (sellerId) {
            // 새로운 채팅
            const initialMessage = {
                id: Date.now().toString(),
                text: `"${itemTitle}" 상품에 대한 채팅방이 열렸습니다.`,
                sender: 'system',
                time: dayjs().format('HH:mm'),
                isRead: true,
            };
            setMessages([initialMessage]);
            setUserName(sellerNickname);
            navigation.setOptions({ title: sellerNickname });
        }
    }, [userId, sellerId, sellerNickname, itemTitle, navigation]);

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                // 화면을 벗어날 때 오디오 정지
                if (playingAudio) {
                    audioRecorderPlayer.stopPlayer();
                    setPlayingAudio(null);
                }
            };
        }, [playingAudio]),
    );

    const handleAudioPress = async audioUri => {
        if (playingAudio === audioUri) {
            // 현재 재생 중인 오디오 정지
            await audioRecorderPlayer.stopPlayer();
            setPlayingAudio(null);
        } else {
            if (playingAudio) {
                await audioRecorderPlayer.stopPlayer();
            }
            await audioRecorderPlayer.startPlayer(audioUri);
            setPlayingAudio(audioUri);

            // 재생이 끝나면 상태 초기화
            audioRecorderPlayer.addPlayBackListener(e => {
                if (e.currentPosition === e.duration) {
                    audioRecorderPlayer.stopPlayer();
                    setPlayingAudio(null);
                }
            });
        }
    };

    const sendMessage = (content, type = 'text') => {
        const newMessage = {
            id: Date.now().toString(),
            sender: 'me',
            time: dayjs().format('HH:mm'),
            isRead: false,
            [type]: content,
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setModalVisible(false);
    };

    const goToCameraRoll = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            sendMessage(image.path, 'image');
        });
    };

    const handleCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            sendMessage(image.path, 'image');
        });
    };

    const onStartRecord = async () => {
        setIsRecording(true);
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener(e => {
            console.log('음성 녹음 시작!');
        });
    };

    const onStopRecord = async () => {
        setIsRecording(false);
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        sendMessage(result, 'audio');
    };

    const renderMessage = ({ item, index }) => {
        const prevMessage = index < messages.length - 1 ? messages[index + 1] : null;
        const nextMessage = index > 0 ? messages[index - 1] : null;

        if (item.sender === 'system') {
            return (
                <View style={styles.systemMessageContainer}>
                    <Text style={styles.systemMessageText}>{item.text}</Text>
                </View>
            );
        } else if (item.sender === 'me') {
            return (
                <RightBubble
                    message={item}
                    prevMessage={prevMessage}
                    nextMessage={nextMessage}
                    onAudioPress={handleAudioPress}
                    isPlaying={playingAudio === item.audio}
                />
            );
        } else {
            return (
                <LeftBubble
                    message={item}
                    prevMessage={prevMessage}
                    onAudioPress={handleAudioPress}
                    isPlaying={playingAudio === item.audio}
                />
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <BasicHeader title={userName} />
                <FlatList
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.messageList}
                />

                {/* 메세지 입력창 */}
                <View style={styles.inputContainer}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={styles.plusButton}>
                        <Image source={plusIcon} style={{ width: 12, height: 12 }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="메세지 입력하기"
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={() => {
                            if (inputText.trim()) {
                                sendMessage(inputText.trim());
                                setInputText('');
                            }
                        }}
                    />
                </View>
            </KeyboardAvoidingView>

            {/* 모달 창 */}
            <Modal
                isVisible={modalVisible}
                useNativeDriver
                animationIn="slideInUp"
                animationOut="slideOutDown"
                animationInTiming={200}
                animationOutTiming={200}
                backdropOpacity={0.5}
                onBackdropPress={() => setModalVisible(false)}
                style={{ margin: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                <View style={{ width, backgroundColor: '#eceefb', paddingTop: 10, height: 200 }}>
                    <View style={{ padding: 16, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.plusButton}>
                            <Image
                                source={plusIcon}
                                style={{ width: 12, height: 12, transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                        <TextInput placeholder="메세지 입력하기" style={styles.textInput} />
                    </View>

                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={goToCameraRoll} style={styles.buttonWrapper}>
                            <Image source={photoButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>앨범</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleCamera} style={styles.buttonWrapper}>
                            <Image source={cameraButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>카메라</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={isRecording ? onStopRecord : onStartRecord}
                            style={styles.buttonWrapper}>
                            <Image source={voiceButton} style={styles.modalButtons} />
                            <Text style={styles.modalButtonText}>
                                {isRecording ? '녹음 중지' : '음성녹음'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    messageList: {
        padding: 15,
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#EFEFEF',
        backgroundColor: '#eceefb',
    },
    plusButton: {
        backgroundColor: '#5865AC',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#FFF',
        borderRadius: 20,
        flex: 1,
        paddingHorizontal: 12,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginHorizontal: 80,
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
    modalButtons: {
        width: 48,
        height: 48,
    },
    modalButtonText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#828282',
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    systemMessageText: {
        backgroundColor: '#e0e0e0',
        color: '#666',
        padding: 5,
        borderRadius: 10,
        fontSize: 12,
    },
});

export default ChatDetail;
