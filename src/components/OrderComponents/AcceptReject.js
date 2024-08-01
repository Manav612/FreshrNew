// AcceptRejectModal.js
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { hideModal } from '../../redux/modalAction';
import FastImage from 'react-native-fast-image';
import LiveTrackingMap from '../LiveTrackingMap';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { barber } from '../../constants/Icons';

const AcceptRejectModal = ({
    data,
    visible,
    setVisibility,
    onAccept,
    onReject,
    services
}) => {
    const entireState = useSelector((state) => state);
    const [timeLeft, setTimeLeft] = useState(120);
    // console.log("=========        socket service             ==================>", services);
    const modalState = useSelector((state) => state.modalReducer);
    const { isVisible, orderData } = modalState || { isVisible: false, orderData: null };
    const dispatch = useDispatch();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [btnVisible, setBtnVisibility] = useState(false);
    const [directionModalVisible, setDirectionModalVisibility] = useState(false);
    const [Prof_distance, setProf_distance] = useState('')
    const [Prof_duration, setProf_duration] = useState('')
    const [Client_distance, setClient_distance] = useState('')
    const [Client_duration, setClient_duration] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState('')
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const styles = StyleSheet.create({
        container: {
            height: Screen_Height,
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: Screen_Width * 0.9,
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
            width: Screen_Width * 0.32,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',

        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 12
        },
        timerText: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        Container: {
            margin: 20,
            borderRadius: 15,
            backgroundColor: '#fff',
        },
        ContentContainer: {
            padding: 15,
            paddingTop: 60,
        },
        IdContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        IdText: {
            fontSize: 14,
            color: '#000',
            textTransform: 'uppercase',
        },
        IdCopyButton: {
            height: 30,
            aspectRatio: 1 / 1,
            borderWidth: 1,
            borderColor: '#717273',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
        },
        InnerContainer: {
            width: '100%',
            padding: 15,
            borderWidth: 1,
            borderColor: COLOR.BLACK,
            borderRadius: 15,
            marginTop: 15,
            backgroundColor: COLOR.WHITE,
            shadowOpacity: 0.1,
            shadowOffset: { height: 2 },
            shadowRadius: 2,
        },
        MapContainer: {
            width: '100%',
            height: Screen_Height * 0.4,
            borderRadius: 10,
            overflow: 'hidden',
            marginVertical: 10,
        },
        DateTimeContainer: {
            width: '100%',
            height: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#f1f1f1',
        },
        BlackContainer: {
            backgroundColor: 'rgba(241,148,54,1)',
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 7,
            alignItems: 'center',
            height: 45,
            shadowOpacity: 0.1,
            shadowOffset: { height: 1 },
            shadowRadius: 1,
        },
        WhiteText: {
            color: COLOR.WHITE,
            fontSize: 9,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        UserDetailsContainer: {
            padding: 7,
            borderRadius: 7,
            marginTop: 7,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#f1f2f3',
            backgroundColor: '#fff',
            shadowOpacity: 0.1,
            shadowOffset: { height: 1 },
            shadowRadius: 1,
            marginBottom: 5,
        },
        UserImage: {
            width: 60,
            height: 60,
            aspectRatio: 1 / 1,
            borderRadius: 7,
        },
        UserName: {
            flex: 1,
            marginLeft: 10,
            color: '#000',
            fontWeight: '600',
        },
        ViewWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000050',
            paddingBottom: '30%',
        },
        ModalContainer: {
            width: '85%',
            borderRadius: 15,
            padding: 30,
            backgroundColor: '#fff',
            elevation: 5,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems: 'center',
        },
        LabelText: {
            fontSize: 16,
            color: '#000',
            textAlign: 'center',
            fontWeight: '600',
        },
        DescText: {
            fontSize: 14,
            color: '#929292',
            marginTop: 15,
        },
    })

    useEffect(() => {
        if (!visible) {
            setTimeLeft(120); // Reset timer when modal is closed
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 120; // Reset to 2 minutes
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [visible]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            {/* <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: COLOR.WHITE }]}>
                    <Text style={[styles.modalTitle, { color: COLOR.BLACK }]}>New Booking Request</Text>
                    <Text style={[styles.timerText, { color: COLOR.BLACK }]}>
                        Time remaining: {formatTime(timeLeft)}
                    </Text>
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
            </View> */}
            <View style={styles.modalContainer}>


                <ScrollView
                    style={styles.Container}
                    contentContainerStyle={styles.modalContent}
                    showsVerticalScrollIndicator={false}>
                    {/* <View style={styles.IdContainer}>
                        <Text style={styles.IdText}>ID : {orderId}</Text>
                        <Text style={[styles.UserName, { textAlign: 'right' }]}>
                            22-07-2024
                        </Text>
                    </View> */}

                    <View style={styles.InnerContainer}>
                        <Text style={[styles.modalTitle, { color: COLOR.BLACK, textAlign: 'center' }]}>New Booking Request</Text>
                        <Text style={[styles.timerText, { color: COLOR.BLACK, textAlign: 'center' }]}>
                            Time remaining: {formatTime(timeLeft)}
                        </Text>
                        <View style={styles.MapContainer}>

                            <LiveTrackingMap
                                mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
                                // onLocationChange={(data) => {
                                //   console.log("Sender : ", JSON.stringify(orderData));
                                //   setOrderId(orderData.message.id.message.order_id)
                                //   socketServices.emit('order_update', {
                                //     recipient: orderData.sender,
                                //     message: {
                                //       type: 'Location_ChangeSP',
                                //       id: orderData.id,
                                //       order_id: orderData.order_id,
                                //       data,
                                //     },
                                //   });
                                // }}
                                socketType={'Location_ChangeCLI'}
                                staticCoordinate={orderData?.message?.id?.message?.coordinates}
                                isPro
                                setVisible={setBtnVisibility}
                                Prof_distance={setProf_distance}
                                Prof_duration={setProf_duration}
                                Client_distance={setClient_distance}
                                Client_duration={setClient_duration}
                            />

                            <View
                                style={

                                    {
                                        backgroundColor: COLOR.BLACK,
                                        paddingHorizontal: 10,
                                        justifyContent: 'center', alignItems: 'center',
                                        height: 25,
                                        position: 'absolute',
                                        borderRadius: 0,
                                        borderBottomRightRadius: 7,
                                        zIndex: 100,
                                    }
                                }>
                                <Text style={styles.WhiteText}>3 in Queue</Text>
                            </View>
                            <View
                                style={

                                    {
                                        backgroundColor: COLOR.BLACK,
                                        justifyContent: 'center', alignItems: 'center',

                                        paddingHorizontal: 10,
                                        height: 25,
                                        position: 'absolute',
                                        borderRadius: 0,
                                        borderBottomLeftRadius: 7,
                                        zIndex: 100,
                                        right: 0,
                                    }
                                }>
                                <Text style={styles.WhiteText}>PENDING</Text>
                            </View>
                        </View>

                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

              <View style={{ width: Screen_Width * 0.4 }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                  <AntDesign name="user" size={15} color={COLOR.BLACK} />
                  <Text style={styles.infoText2}>Professional</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <MaterialIcons name="location-on" size={16} color={COLOR.BLACK} />
                    <Text style={styles.infoText}>{parseFloat(Prof_distance).toFixed(2)}km</Text>
                  </View>
                  <AntDesign name="close" size={15} color={COLOR.BLACK} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <MaterialIcons name="access-time" size={16} color={COLOR.BLACK} />
                    <Text style={styles.infoText}>{parseFloat(Prof_duration).toFixed(2)}min</Text>
                  </View>
                </View>
              </View>

              <View style={{ width: Screen_Width * 0.4 }}>
                <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
                  <AntDesign name="user" size={15} color={COLOR.BLACK} />
                  <Text style={styles.infoText2}>Client</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <MaterialIcons name="location-on" size={16} color={COLOR.BLACK} />
                    <Text style={styles.infoText}>{parseFloat(Client_distance).toFixed(2)}km</Text>
                  </View>
                  <AntDesign name="close" size={15} color={COLOR.BLACK} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <MaterialIcons name="access-time" size={16} color={COLOR.BLACK} />
                    <Text style={styles.infoText}>{parseFloat(Client_duration).toFixed(2)}min</Text>
                  </View>
                </View>
              </View>

            </View>
            <Text style={styles.meetupText}>You meetup at in atmost {parseFloat(Client_duration > Prof_duration ? Client_duration === 0 ? Client_duration : Client_duration + 5 : Prof_duration === 0 ? Prof_duration : Prof_duration + 5).toFixed(2)} min</Text> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={onAccept} style={{
                                backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.36,
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                                borderTopRightRadius: 0, borderBottomRightRadius: 0
                            }}>
                                <Text style={styles.buttonText}>Accept booking</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onReject} style={{
                                backgroundColor: COLOR.ChartBlue, width: Screen_Width * 0.36,
                                padding: 15,
                                borderRadius: 10,
                                alignItems: 'center',
                                borderTopLeftRadius: 0, borderBottomLeftRadius: 0
                            }}>
                                <Text style={styles.buttonText}>Reject booking</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginVertical: 10 }}>
                            <View
                                style={{
                                    borderWidth: 1,

                                    borderColor: COLOR.BLACK,
                                    borderRadius: 10,
                                    width: isOpen ? Screen_Width * 0.7 : Screen_Width * 0.55,
                                }}>
                                <TouchableOpacity
                                    onPress={toggleDropdown}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 5,
                                    }}>
                                    <Text style={{ color: COLOR.BLACK }}>
                                        Services
                                    </Text>
                                    <MaterialIcons
                                        name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                                        color={'#000'}
                                        size={25}
                                    />
                                </TouchableOpacity>
                                {isOpen && (
                                    <FlatList
                                        data={services}
                                        showsVerticalScrollIndicator={false}
                                        style={{ flex: 1 }}
                                        scrollEnabled={false}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ paddingHorizontal: 5 }}>
                                                    <View
                                                        //   onPress={() => handleSelect(item)}
                                                        style={{
                                                            backgroundColor: COLOR.WHITE,
                                                            marginVertical: 10,
                                                            // width: Screen_Width * 0.67,
                                                            height: Screen_Height * 0.1,
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            borderRadius: 10,
                                                            flexDirection: 'row',
                                                            borderWidth: 1,
                                                            borderColor: COLOR.LINECOLOR,
                                                            paddingHorizontal: 5,
                                                            gap: 5

                                                        }}>
                                                        <FastImage
                                                            style={{
                                                                width: Screen_Width * 0.18,
                                                                height: Screen_Height * 0.08,
                                                                borderRadius: 10,

                                                            }}
                                                            // source={{ uri: item?.photo }}
                                                            source={barber}
                                                        />

                                                        <Text
                                                            style={{
                                                                color: COLOR.BLACK,
                                                                fontSize: 16,
                                                                fontWeight: '600',
                                                                paddingRight: 10,
                                                                width: 90,
                                                            }}
                                                            numberOfLines={1}
                                                        >
                                                            {item?.name}
                                                        </Text>



                                                        <View
                                                            style={{

                                                                justifyContent: 'center',
                                                                padding: 10,

                                                                alignItems: 'center',
                                                                borderRadius: 5,
                                                                backgroundColor: COLOR.ORANGECOLOR
                                                            }}

                                                        >
                                                            <Text
                                                                style={{
                                                                    color: COLOR.WHITE,
                                                                    fontSize: 16,
                                                                    fontWeight: '600',

                                                                }}
                                                                numberOfLines={1}

                                                            >
                                                                ${item?.price}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                )}
                            </View>
                            {isOpen ? null :

                                <View
                                    style={{
                                        justifyContent: 'center',
                                        padding: 5,
                                        alignItems: 'center',
                                        borderRadius: 5,
                                        backgroundColor: COLOR.ORANGECOLOR
                                    }}

                                >
                                    <Text
                                        style={{
                                            color: COLOR.WHITE,
                                            fontSize: 14,
                                            fontWeight: '600',

                                        }}
                                        numberOfLines={1}

                                    >
                                        $8000
                                    </Text>
                                </View>
                            }
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <FontAwesome5 name="user-circle" color={'#000'} size={20} />
                            <Text style={[styles.UserName, { marginLeft: 7 }]}>Elon Musk</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}>
                            <Entypo name="scissors" color={'#000'} size={20} />
                            <Text style={[styles.UserName, { marginLeft: 7 }]}>Jk Jk</Text>
                            <Entypo name="message" color={'#000'} size={24} />
                        </View>

                        {/* <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                            }}
                            onPress={() => setDirectionModalVisibility(true)}>
                            <FontAwesome5 name="directions" color="#000" size={20} />
                            <Text
                                style={[
                                    styles.UserName,
                                    {
                                        marginLeft: 7,
                                        textDecorationLine: 'underline',
                                        color: '#000',
                                    },
                                ]}>
                                Ahmedabad Nikol Circle
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ height: 50 }} />
                </ScrollView>

                <Modal
                    animationType="fade"
                    transparent
                    visible={directionModalVisible}
                    statusBarTranslucent>
                    <View style={styles.ViewWrapper}>
                        <View style={styles.ModalContainer}>
                            <Text
                                style={
                                    styles.LabelText
                                }>{`Please head to \n designated location`}</Text>
                            <Text style={styles.DescText}>
                                Once arrived please come back here{' '}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    marginTop: 30,
                                }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: COLOR.ORANGECOLOR,
                                        padding: 10,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: COLOR.WHITE,
                                        borderWidth: 1,
                                        shadowOffset: { height: 2 },
                                        shadowRadius: 2,
                                        shadowOpacity: 0.3,
                                    }}
                                    onPress={() => setDirectionModalVisibility(false)}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '700',
                                        }}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: 10 }} />
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#000',
                                        padding: 10,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowOffset: { height: 2 },
                                        shadowRadius: 2,
                                        shadowOpacity: 0.3,
                                    }}
                                    onPress={() => setDirectionModalVisibility(false)}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 14,
                                            fontWeight: '700',
                                        }}>
                                        Direction
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </Modal>
    );
};


export default AcceptRejectModal;