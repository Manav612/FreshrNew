// AcceptRejectModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { hideModal } from '../../redux/modalAction';


const AcceptRejectModal = ({
    data,
    visible,
    setVisibility,
    onAccept,
    onReject,
}) => {
    const entireState = useSelector((state) => state);

    const modalState = useSelector((state) => state.modalReducer);
    const { isVisible, orderData } = modalState || { isVisible: false, orderData: null };
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: COLOR.WHITE }]}>
                    <Text style={[styles.modalTitle, { color: COLOR.BLACK }]}>New Booking Request</Text>
                    <TouchableOpacity onPress={onAccept} style={[styles.button, { backgroundColor: COLOR.GREEN }]}>
                        <Text style={styles.buttonText}>Accept booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onReject} style={[styles.button, { backgroundColor: COLOR.CANCEL_B }]}>
                        <Text style={styles.buttonText}>Reject booking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: Screen_Width * 0.8,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AcceptRejectModal;