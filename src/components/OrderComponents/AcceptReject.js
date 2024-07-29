// AcceptRejectModal.js
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { hideModal } from '../../redux/modalAction';
import FastImage from 'react-native-fast-image';


const AcceptRejectModal = ({
    data,
    visible,
    setVisibility,
    onAccept,
    onReject,
    services
}) => {
    const entireState = useSelector((state) => state);
    // console.log("=========        socket service             ==================>", services);
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
                    <FlatList
                        data={services}
                        showsVerticalScrollIndicator={false}
                        style={{}}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ paddingHorizontal: 5 }}>
                                    <View
                                        //   onPress={() => handleSelect(item)}
                                        style={{
                                            backgroundColor: COLOR.WHITE,
                                            marginVertical: 10,
                                            width: Screen_Width * 0.67,
                                            height: Screen_Height * 0.15,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            borderRadius: 10,
                                            flexDirection: 'row',
                                            elevation: 4,
                                            shadowColor: COLOR.BLACK,
                                            gap: 10

                                        }}>
                                        <FastImage
                                            style={{
                                                width: Screen_Width * 0.22,
                                                height: Screen_Height * 0.15,
                                                borderRadius: 10,

                                            }}
                                            source={{ uri: item?.photo }}
                                        />
                                        <View
                                            style={{ flexDirection: 'column', gap: 5 }}>
                                            <Text
                                                style={{
                                                    color: COLOR.BLACK,
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                    paddingRight: 10,
                                                }}
                                                numberOfLines={1}
                                            >
                                                {item?.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLOR.BLACK,
                                                    fontSize: 16,
                                                    fontWeight: '300',
                                                    paddingRight: 10,
                                                }}
                                                numberOfLines={1}
                                            >
                                                {item?.category?.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: COLOR.BLACK_40,
                                                    fontSize: 14,
                                                    fontWeight: '600',
                                                    paddingRight: 10,
                                                    width: 170,
                                                }}
                                                numberOfLines={1}

                                            >
                                                {item.description.length > 40
                                                    ? `${item.description.slice(0, 40)}...`
                                                    : item.description}
                                            </Text>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    width: Screen_Width * 0.55,
                                                    alignItems: 'center',
                                                }}

                                            >
                                                <Text
                                                    style={{
                                                        color: COLOR.ORANGECOLOR,
                                                        fontSize: 16,
                                                        fontWeight: '600',
                                                        paddingRight: 10,
                                                    }}
                                                    numberOfLines={1}

                                                >
                                                    ${item?.price}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}
                    />

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