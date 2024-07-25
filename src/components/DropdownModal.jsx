import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

const DropdownModal = ({ visible, data, onSelect, onClose, isRegionData = false }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => {
                                    onSelect(isRegionData ? item.long : item);
                                    onClose();
                                }}>
                                <Text>{isRegionData ? item.long : item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    modalContent: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 20,
        maxHeight: height * 0.5,
        marginTop: 60,
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default DropdownModal;
