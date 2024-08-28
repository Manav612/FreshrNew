import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { useSelector } from 'react-redux';

const Screen_Width = Dimensions.get('window').width;

const QueueToggle = ({ theme, onToggle, COLOR }) => {
    const [selected, setSelected] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleToggle = () => {
        setSelected(!selected);
        if (!selected) {
            setModalVisible(true);
        }
        onToggle(!selected);
    };

    return (
        <>
            <TouchableOpacity onPress={handleToggle} style={styles.toggleButton(COLOR)}>
                <Text style={{ color: COLOR.BLACK, fontWeight: '600' }}>Queue</Text>
                {selected ? (
                    <View style={styles.statusContainer(COLOR, selected)}>
                        <Text style={styles.statusText(COLOR)}>on</Text>
                        <View style={styles.statusIndicator(COLOR.ChartBlue)} />
                    </View>
                ) : (
                    <View style={styles.statusContainer(COLOR, selected)}>
                        <View style={styles.statusIndicator(COLOR.ORANGECOLOR)} />
                        <Text style={styles.statusText(COLOR)}>off</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalContainer(COLOR)}>
                    <View style={styles.modalContent(COLOR)}>
                        <Text style={styles.modalTitle(COLOR)}>Disclaimer</Text>
                        <Text style={styles.modalText(COLOR)}>
                            Be ready to receive an accumulation of orders. (Up a max of 5)
                        </Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity onPress={() => { setModalVisible(false), setSelected(false) }} style={styles.modalButton(COLOR, COLOR.BLACK)}>
                                <Text style={styles.modalButtonText(COLOR)}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton(COLOR, COLOR.ORANGECOLOR)}>
                                <Text style={styles.modalButtonText(COLOR)}>Accept</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    toggleButton: (COLOR) => ({
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowColor: COLOR.ChartBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        padding: 5,
        gap: 5,
    }),
    statusContainer: (COLOR, selected) => ({
        borderRadius: 15,
        borderWidth: 1,
        borderColor: selected ? COLOR.ChartBlue : COLOR.ORANGECOLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        paddingLeft: selected ? 5 : 0,
        paddingRight: selected ? 0 : 5,
    }),
    statusText: (COLOR) => ({
        color: COLOR.BLACK,
        fontSize: 10,
        fontWeight: '600',
        height: 16,
    }),
    statusIndicator: (color) => ({
        backgroundColor: color,
        height: 16,
        width: 16,
        borderRadius: 10,
    }),
    modalContainer: (COLOR) => ({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.BLACK_40,
    }),
    modalContent: (COLOR) => ({
        width: '80%',
        backgroundColor: COLOR.WHITE,
        padding: 20,
        borderRadius: 10,
    }),
    modalTitle: (COLOR) => ({
        fontSize: 18,
        marginBottom: 10,
        color: COLOR.BLACK,
        textAlign: 'center',
    }),
    modalText: (COLOR) => ({
        color: COLOR.BLACK,
        marginBottom: 10,
    }),
    modalButtonContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modalButton: (COLOR, backgroundColor) => ({
        height: 40,
        width: Screen_Width * 0.3,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    }),
    modalButtonText: (COLOR) => ({
        color: COLOR.WHITE,
    }),
});

export default QueueToggle;