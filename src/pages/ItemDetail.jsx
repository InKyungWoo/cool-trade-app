import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Dimensions,
} from 'react-native';
import { dummyItems } from '../data/dummyItems';
import BasicHeader from '../components/BasicHeader';

const { width } = Dimensions.get('window');

const ItemDetailScreen = ({ route }) => {
    const { itemId } = route.params;
    const item = dummyItems.find(item => item.id === itemId);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!item) {
        return <Text>선택한 물품이 없습니다.</Text>;
    }

    const renderImageItem = ({ item: image, index }) => (
        <Image source={image} style={styles.image} resizeMode="cover" />
    );

    const onScroll = event => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveIndex(roundIndex);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <BasicHeader />

            <View style={{ position: 'relative' }}>
                <FlatList
                    data={item.images}
                    renderItem={renderImageItem}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                />
            </View>

            <View style={styles.pagination}>
                {item.images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === activeIndex ? styles.paginationDotActive : null,
                        ]}
                    />
                ))}
            </View>

            <View style={styles.profileContainer}>
                <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View>
                    <Text style={styles.nickname}>{item.nickname}</Text>
                    <Text style={styles.location}>{item.location.address}</Text>
                </View>
            </View>
            <ScrollView>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.category}>
                    {item.category} • {item.registrationDate}
                </Text>
                <Text style={styles.content}>{item.content}</Text>
            </ScrollView>
            <View style={styles.footer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>가격 : </Text>
                    <Text style={styles.price}>{item.price.toLocaleString()}원</Text>
                </View>
                <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>채팅하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        width,
        height: 300,
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#c3d4f7',
        marginHorizontal: 4,
    },
    paginationDotActive: {
        backgroundColor: '#6C96EA',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginRight: 10,
    },
    nickname: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 15,
    },
    category: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        padding: 15,
        lineHeight: 24,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3572EF',
    },
    chatButton: {
        backgroundColor: '#3572EF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    chatButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ItemDetailScreen;
