import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dummyItems } from '../data/dummyItems';
import { siObj, siGuList } from '../data/regionData';
import DropdownModal from '../components/DropdownModal';
import BasicHeader from '../components/BasicHeader';

const noResultImg = require('../assets/images/sadLogo.png');

const Search = () => {
    const navigation = useNavigation();

    const [selectedSi, setSelectedSi] = useState('전체');
    const [selectedGu, setSelectedGu] = useState('전체');
    const [filteredItems, setFilteredItems] = useState([]);
    const [guList, setGuList] = useState(['전체']);
    const [showSiModal, setShowSiModal] = useState(false);
    const [showGuModal, setShowGuModal] = useState(false);

    useEffect(() => {
        if (selectedSi) {
            const selectedSiGuList = siGuList.find(item => item.si === selectedSi);
            setGuList(selectedSiGuList ? selectedSiGuList.gu : ['전체']);
            setSelectedGu('전체');
        }
    }, [selectedSi]);

    useEffect(() => {
        filterItems();
    }, [selectedSi, selectedGu]);

    const filterItems = () => {
        let filtered = dummyItems;
        if (selectedSi !== '전체') {
            filtered = filtered.filter(item => item.location.address.includes(selectedSi));
        }
        if (selectedGu !== '전체') {
            filtered = filtered.filter(item => item.location.address.includes(selectedGu));
        }
        setFilteredItems(filtered);
    };

    const handleSiSelect = si => {
        setSelectedSi(si);
        setSelectedGu('전체');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemCard}
            onPress={() => navigation.navigate('ItemDetail', { itemId: item.id })}>
            <View style={{ flex: 1, marginRight: 15 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemContent} numberOfLines={1}>
                    {item.content}
                </Text>
                <Text style={styles.itemPrice}>{item.price.toLocaleString()}원</Text>
                <View style={styles.locationWrapper}>
                    <Text style={styles.itemLocation}>{item.location.address}</Text>
                </View>
            </View>
            <View>
                <Image source={item.images[0]} style={styles.itemImg} />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <BasicHeader title={'지역 선택'} />
            <View style={styles.filterContainer}>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowSiModal(true)}>
                    <Text>{selectedSi || '시/도 선택'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown} onPress={() => setShowGuModal(true)}>
                    <Text>{selectedGu || '구/군 선택'}</Text>
                </TouchableOpacity>
            </View>

            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <View style={{ alignItems: 'center' }}>
                    <Image source={noResultImg} style={styles.noResultImg} />
                    <Text style={styles.noResultText}>해당 지역에 등록된 물품이 없습니다.</Text>
                </View>
            )}

            <DropdownModal
                visible={showSiModal}
                data={siObj}
                onSelect={handleSiSelect}
                onClose={() => setShowSiModal(false)}
                isRegionData={true}
            />

            <DropdownModal
                visible={showGuModal}
                data={guList}
                onSelect={setSelectedGu}
                onClose={() => setShowGuModal(false)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10,
    },
    dropdown: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#1D3FC6',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    itemCard: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    itemContent: {
        fontSize: 13,
        marginBottom: 10,
        color: '#666',
    },
    itemPrice: {
        fontSize: 16,
        color: '#3572EF',
        fontWeight: '700',
        marginBottom: 10,
    },
    locationWrapper: {
        backgroundColor: '#E8F0FE',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    itemLocation: {
        fontSize: 12,
        fontWeight: '500',
        color: '#666',
    },
    noResultImg: {
        width: 100,
        height: 100,
        marginTop: 50,
        marginBottom: 10,
    },
    noResultText: {
        fontSize: 16,
        marginTop: 20,
        color: '#888',
    },
});

export default Search;
