import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import LogoHeader from '../components/LogoHeader';
import AppleMap from '../components/AppleMap';
import { dummyItems } from '../data/dummyItems';

const { width } = Dimensions.get('window');

const formatPrice = price => {
    return new Intl.NumberFormat('ko-KR').format(price);
};

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <LogoHeader />
            <View style={{ flex: 1 }}>
                <AppleMap />
                <View style={styles.itemContainer}>
                    <ScrollView horizontal>
                        {dummyItems.map(item => (
                            <TouchableOpacity key={item.id} style={styles.itemCard}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}>
                                    <View style={{ flex: 1, marginRight: 15 }}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.itemContent} numberOfLines={2}>
                                            {item.content}
                                        </Text>
                                        <Text style={styles.itemPrice}>
                                            {formatPrice(item.price)}원
                                        </Text>
                                    </View>
                                    <Image source={item.images[0]} style={styles.itemImg} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        position: 'absolute',
        bottom: 30,
        height: 150,
    },
    itemCard: {
        width: width * 0.8,
        height: 130,
        marginHorizontal: 10,
        backgroundColor: '#EFFAFF',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        overflow: 'hidden',
    },
    itemImg: {
        width: 100,
        height: 100,
        borderRadius: 200,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1D3FC6',
        marginBottom: 10,
    },
    itemContent: {
        fontSize: 14,
        marginBottom: 15,
        color: '#555',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3572EF',
    },
});

export default Home;
