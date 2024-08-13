import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView, Modal, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Client, ClientBlack, ComeToYou, ComeToYouWhite, Hair1, HomeIcon2, InSalonWhite, OnBoard1 } from '../../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import socketServices from '../../../Services/Socket';
import { NavigationScreens } from '../../../constants/Strings';
import MapScreen2 from '../../MapScreen2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import ActiveLine from '../../../components/Story/Story/ActiveLine';
import LiveTrackingMap from '../../../components/LiveTrackingMap';
const ProfessionalPending = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [FetchedData, setFetchedData] = useState([]);
    const [orderData, setOrderData] = useState({});
    const [timer, setTimer] = useState(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const refRBSheet = useRef();
    const authToken = useSelector(state => state.AuthReducer);
    const [directionModalVisible, setDirectionModalVisibility] = useState(false);
    const [height, setHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false)
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
    const [id, setId] = useState('');
    const [Prof_distance, setProf_distance] = useState('')
    const [Prof_duration, setProf_duration] = useState('')
    const [Client_distance, setClient_distance] = useState('')
    const [Client_duration, setClient_duration] = useState('')
    const [ModalVisible, setModalVisibility] = useState(false);


    // const [date, setDate] = useState(FetchedData?.createdAt)
    // const [status, setStatus] = useState(FetchedData?.status)
    const [services, setServices] = useState()

    const toggleDropdown = ({ services2 }) => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            setId(timerId);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const openBottomSheet = () => {
        refRBSheet?.current?.open();

    };

    const closeBottomSheet = () => {
        clearTimeout(id);
        refRBSheet?.current?.close();

    };
    // console.log("------------------>", orderData.order_id);

    const styles = StyleSheet.create({
        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            // backgroundColor: COLOR.ROYALBLUE,

        },
        Container: {
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 5,
        },
        ContentContainer: {
            // padding: 10,
            paddingTop: hide ? null : 60,
        },
        IdContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        IdText: {
            fontSize: 13,
            color: '#000',
            fontWeight: '600',
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
            padding: 10,
            borderWidth: 1,
            borderColor: '#e1e1e1',
            borderRadius: 15,
            backgroundColor: '#fff',
            shadowOpacity: 0.1,
            shadowOffset: { height: 2 },
            shadowRadius: 2,
        },
        MapContainer: {
            width: '100%',
            aspectRatio: 1 / 1.1,
            borderRadius: 10,
            overflow: 'hidden',
            marginTop: 15,
        },
        DateTimeContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 15,
        },
        BlackContainer: {
            backgroundColor: COLOR.ORANGECOLOR,
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 7,
            alignItems: 'center',
            height: 35,
            shadowOpacity: 0.1,
            shadowOffset: { height: 1 },
            shadowRadius: 1,
        },
        WhiteText: {
            color: '#FFF',
            fontSize: 13,
            fontWeight: '600',
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
            width: 50,
            height: 50,
            aspectRatio: 1 / 1,
            borderRadius: 7,
        },
        UserName: {
            flex: 1,
            marginLeft: 10,
            fontSize: 13,
            color: '#000',
            fontWeight: '600',
        },
        ViewWrapper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000050',

        },
        ModalContainer: {
            borderRadius: 15,
            padding: 15,
            backgroundColor: '#fff',
            elevation: 5,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems: 'center',
        },
        LabelText: {
            fontSize: 16,
            color: COLOR.BLACK,
            textAlign: 'center',
            fontWeight: '600',
        },
        DescText: {
            fontSize: 14,
            color: '#929292',
            marginTop: 15,
        },
        DistenceContainer: {
            borderColor: 'grey',
            borderTopWidth: 1,
            flex: 1,
            padding: 10,
            bottom: -34,
        },

        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.BLACK_40,
        },
        modalContent: {
            width: Screen_Width * 0.8,
            backgroundColor: COLOR.WHITE,
            height: Screen_Height * 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            marginBottom: 10,
            color: COLOR.BLACK
        },
    });

    useEffect(() => {
        socketServices.on('payment_Done_close', data => {
            console.log('==== payment done      ====================', data.message.id.message);
            closeBottomSheet()
            // navigation.navigate(NavigationScreens.LiveTrackingProfSideScreen, { orderData: data })
        });
    }, []);


    useEffect(() => {
        fetchData();

        socketServices.on('create_order', data => {
            console.log(
                '====  order create data Socket ======',
                data.message.data.order._id,
            );
            setFetchedData(prevData => [data.message.data.order, ...prevData]);
            setOrderData({
                order_id: data.message.data.order._id,
                message: {
                    coordinates: data.message.data.order.address?.coordinates,
                }
            })

            setServices(data.services)
            // setModalVisible(true); // Open the modal when a new order is received
        });
    }, []);
    // console.log("========       orderData              ===========", orderData);

    const orderIddd = orderData.order_id
    // console.log('=============>', orderIddd);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    const fetchData = async () => {
        try {
            const order_id2 = await AsyncStorage.getItem("order_id");
            console.log("==============        gettttt order id       -----------        ==============", order_id2);
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.get(`${BASE_API_URL}/professionals/professional/orders/PENDING`, config);
            // console.log('==========   order  List pendinggg  ===========', JSON.stringify(res.data.data.orders))
            setFetchedData(res.data.data.orders)
            // console.log("=================------------>", JSON.stringify(FetchedData));

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onAccept = async () => {

        const orderId = orderData?.order_id;
        const coordinates = orderData?.message?.coordinates;
        try {
            // console.log("Order Id : ",coordinates);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.put(
                `${BASE_API_URL}/professionals/professional/acceptOrder/${orderId}`,
                {},
                config,
            );
            console.log('===========  milllaaa  ==========', JSON.stringify(res.data.data));
            if (res.status == 200) {
                console.log('===========   orderrr  acceptted   ==========')
                // openBottomSheet()
                setModalVisible(true)
                // Alert.alert('Please wait while client do the payment')
                setHide(true)
                socketServices.emit('order_update', {
                    recipient: res.data.data.order.client.id,
                    message: {
                        type: 'accept_order',
                        paymentKey: res.data.data.order.paymentKey,
                        orderDetails: res.data.data.order.client.id,
                        order_id: orderId,
                        coordinates: coordinates,
                        orderData: res.data.data,
                        services: services,
                    },
                });
                setOrderData({});
            }
            // setFetchedData(res.data.facilities.facility);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const PutCancelData = async () => {
        const orderId = orderData?.order_id;
        try {
            // console.log("Order Id : ",orderId);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.put(
                `${BASE_API_URL}/professionals/professional/cancelOrder/${orderId}`,
                {},
                config,
            );
            console.log('===========  cancelllll  ==========', res.data);
            if (res.data.status === 'success') {
                socketServices.emit('order_update', {
                    recipient: res.data.data.order.client.id,
                    message: {
                        type: 'cancle_order',
                        order_id: orderId,
                    },
                });
                Alert.alert('Booking is cancel successfully');
                // fetchData();
            } else {
                Alert.alert(res.data.message);
            }
            // setFetchedData(res.data.facilities.facility);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleResetPress = (id) => {
        setSelectedReceipt(id);
    }

    const renderItem = ({ item }) => (
        <View style={styles.Container}>
            <ScrollView
                style={styles.Container}
                contentContainerStyle={[
                    styles.ContentContainer,
                    // height > 0 && { paddingTop: height / 2 },
                ]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.InnerContainer}>
                    {hide ? null :
                        <View
                            style={[
                                {
                                    borderWidth: 1,
                                    borderColor: '#e1e1e1',
                                    borderRadius: 15,
                                    padding: 10,
                                    shadowOpacity: 0.1,
                                    shadowOffset: { height: 1 },
                                    shadowRadius: 1,
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    zIndex: 100,
                                    width: '100%',
                                    alignSelf: 'center',
                                    marginTop: 6
                                },
                                height > 0 && { top: -height / 2 },
                            ]}
                            onLayout={layout => {
                                setHeight(layout.nativeEvent.layout.height);
                            }}>
                            <Text style={[styles.LabelText, { fontSize: 18 }]}>
                                New Booking Request
                            </Text>
                            <View style={[styles.IdContainer, { marginVertical: 5 }]}>
                                <Text style={[styles.UserName, { textAlign: 'center' }]}>
                                    Time remaining: {formatTime(timeLeft)}
                                </Text>
                            </View>

                            <ActiveLine
                                duration={1000 * 300}
                                width={200}
                                isActive={true}
                                onLayout={() => { }}
                                bgColor={COLOR.ORANGECOLOR}
                                progressColor={COLOR.BLACK}
                            />

                            <View style={[styles.IdContainer, { marginTop: 10 }]}>
                                <TouchableOpacity
                                    onPress={onAccept}
                                    style={{
                                        flex: 1,
                                        padding: 7,
                                        backgroundColor: COLOR.ORANGECOLOR,
                                        borderRadius: 7,
                                    }}>
                                    <Text style={[styles.LabelText, { color: COLOR.WHITE }]}>
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ width: 10 }} />
                                <TouchableOpacity
                                    onPress={PutCancelData}
                                    style={{
                                        flex: 1,
                                        padding: 7,
                                        backgroundColor: COLOR.GULABI,
                                        borderRadius: 7,
                                        borderColor: COLOR.ORANGECOLOR,
                                        borderWidth: 1,
                                    }}>
                                    <Text style={[styles.LabelText, { color: COLOR.ORANGECOLOR }]}>
                                        Reject
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    }

                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 1000,
                            top: hide ? null : 70,
                            marginVertical: hide ? 10 : null,
                            justifyContent: 'space-between',
                        }}>
                        <Text style={styles.IdText}>ID : {orderIddd}</Text>
                        <Text style={[styles.UserName, { textAlign: 'right' }]}>
                            {item.createdAt.slice(0, 10)}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.MapContainer,
                            height > 0 && { marginTop: hide ? null : height / 1.8 },
                        ]}>
                        <LiveTrackingMap
                            mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
                            onLocationChange={(data) => {
                                console.log("+++++++++++++++++++++", data);

                                // socketServices.emit('order_update', {
                                //     recipient: orderData.sender,
                                //     message: {
                                //         type: 'Location_ChangeCLI',
                                //         id: orderData.message.id,
                                //         order_id: orderData.message.order_id,
                                //         data,
                                //     },
                                // });
                            }}
                            // socketType={'Location_ChangeSP'}
                            staticCoordinate={orderData?.message?.coordinates}
                            Prof_distance={setProf_distance}
                            Prof_duration={setProf_duration}
                            Client_distance={setClient_distance}
                            Client_duration={setClient_duration}
                        />

                        <View
                            style={[
                                styles.BlackContainer,
                                {
                                    height: 30,
                                    position: 'absolute',
                                    //   top: 20,
                                    borderRadius: 0,
                                    borderBottomRightRadius: 7,
                                    zIndex: 100,
                                    backgroundColor: COLOR.BLACK,
                                },
                            ]}>
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>3 in Queue</Text>
                        </View>
                        <View
                            style={[
                                styles.BlackContainer,
                                {
                                    height: 30,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    flexDirection: 'row',
                                    gap: 5,
                                    // top: 40,
                                    // borderRadius: 0,
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                    // borderBottomRightRadius: 7,
                                    zIndex: 100,
                                    backgroundColor: COLOR.ChartBlue,
                                },
                            ]}>
                            {/* <Image source={ComeToYouWhite} style={{ height: 15, width: 15 }} /> */}
                            <Image source={HomeIcon2} style={{ height: 15, width: 15 }} />
                            {/* <Text style={[styles.WhiteText, { fontSize: 10 }]}>Go to client</Text> */}
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>Meet in Salon</Text>
                        </View>
                        <View
                            style={[
                                styles.BlackContainer,
                                {
                                    height: 30,
                                    position: 'absolute',
                                    //   top: 20,
                                    borderRadius: 0,
                                    borderBottomLeftRadius: 7,
                                    zIndex: 100,
                                    right: 0,
                                    backgroundColor: COLOR.BLACK,
                                },
                            ]}>
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>{item.status}</Text>
                        </View>
                        <View
                            style={{
                                width: '96%',
                                flex: 1,
                                borderRadius: 7,
                                position: 'absolute',
                                bottom: 5,
                                marginHorizontal: 5,
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    flex: 1,
                                    elevation: 2,
                                    borderRadius: 7,
                                    borderWidth: 1,
                                    borderColor: '#f1f1f1',
                                    paddingBottom: 34,
                                    marginTop: 15,
                                    flexDirection: 'row',
                                    shadowOpacity: 0.2,
                                    shadowOffset: { height: 2 },
                                    shadowRadius: 2,
                                    position: 'absolute',
                                    bottom: 0,
                                    marginHorizontal: 5,
                                }}>
                                <View style={styles.DistenceContainer}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center',
                                        }}>
                                        <Image style={{ height: 20, width: 20 }} source={ComeToYou} resizeMode='contain' />

                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 7 }]}>
                                            You
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}>
                                        <FontAwesome5
                                            name="map-marker-alt"
                                            color={'#000'}
                                            size={15}
                                        />
                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                                            0.2Km
                                        </Text>
                                        <Entypo
                                            name="cross"
                                            color={'#000'}
                                            size={15}
                                            style={{
                                                marginHorizontal: 2,
                                            }}
                                        />
                                        <Feather name="clock" color={'#000'} size={15} />
                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                                            0.7Min
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.DistenceContainer}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center',
                                        }}>
                                        <Image style={{ height: 20, width: 20 }} source={ClientBlack} resizeMode='contain' />

                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 7 }]}>
                                            Client
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            flex: 1,
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}>
                                        <FontAwesome5
                                            name="map-marker-alt"
                                            color={'#000'}
                                            size={15}
                                        />
                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                                            0.2Km
                                        </Text>
                                        <Entypo
                                            name="cross"
                                            color={'#000'}
                                            size={15}
                                            style={{
                                                marginHorizontal: 2,
                                            }}
                                        />
                                        <Feather name="clock" color={'#000'} size={15} />
                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                                            0.7Min
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={[
                                    styles.LabelText,
                                    { fontSize: 20, paddingBottom: 70, color: COLOR.ORANGECOLOR },
                                ]}>
                                Meet-up in 2:20 min
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderWidth: 1,
                            borderColor: COLOR.GRAY,
                            borderRadius: 15,
                            padding: 10,
                            marginVertical: 10,
                        }}>
                        <View
                            style={{
                                // borderWidth: 1,
                                width: isOpen ? null : Screen_Width * 0.6,
                                borderColor: COLOR.GRAY,
                                borderRadius: 10,
                            }}>
                            <TouchableOpacity
                                onPress={toggleDropdown}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 5,
                                }}>
                                {isOpen ? (
                                    <>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 10,
                                            }}>
                                            <Image
                                                source={{ uri: item?.services?.photo }}
                                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                            />
                                            <Text
                                                style={{
                                                    color: COLOR.BLACK,
                                                    fontSize: 18,
                                                    fontWeight: '600',
                                                }}>
                                                Services ({item?.services.length})
                                            </Text>
                                        </View>
                                        <MaterialIcons
                                            name={
                                                isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                                            }
                                            color={'#000'}
                                            size={25}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 10,
                                            }}>
                                            <Image
                                                source={{ uri: item.services?.photo }}
                                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                            />
                                            <View style={{}}>
                                                <Text
                                                    style={{
                                                        color: COLOR.GRAY,
                                                        fontSize: 14,
                                                        fontWeight: '500',
                                                    }}>
                                                    Services ({item?.services.length})
                                                </Text>
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        borderWidth: 1,
                                                        width: Screen_Width * 0.4,
                                                        borderRadius: 5,
                                                        paddingHorizontal: 10,
                                                        borderColor: COLOR.LINECOLOR,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: COLOR.BLACK,
                                                            fontSize: 14,
                                                        }}>
                                                        {item.services[0].name}
                                                    </Text>
                                                    <MaterialIcons
                                                        name={
                                                            isOpen
                                                                ? 'keyboard-arrow-up'
                                                                : 'keyboard-arrow-down'
                                                        }
                                                        color={'#000'}
                                                        size={25}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                )}
                            </TouchableOpacity>
                            {isOpen && (
                                <View>
                                    {item.services.map((service, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                width: Screen_Width * 0.81,
                                                borderRadius: 7,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: '#f1f2f3',
                                                backgroundColor: '#fff',
                                                shadowOpacity: 0.1,
                                                shadowOffset: { height: 1 },
                                                shadowRadius: 1,
                                                marginBottom: 5,
                                                padding: 5,
                                            }}>
                                            <Image
                                                style={styles.UserImage}
                                                source={{ uri: service?.photo }}
                                                resizeMode="cover"
                                            />
                                            <Text style={styles.UserName}>{service?.name}</Text>
                                            <View style={styles.BlackContainer}>
                                                <Text style={styles.WhiteText}>
                                                    ${service?.price}
                                                </Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>

                        {!isOpen && (
                            <View
                                style={{
                                    backgroundColor: COLOR.ORANGECOLOR,
                                    height: 35,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 8,
                                    borderRadius: 7,
                                }}>
                                <Text style={[styles.WhiteText, { height: 'auto' }]}>${item.price}</Text>
                            </View>
                        )}
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                        <FontAwesome5 name="user-circle" color={'#000'} size={20} />
                        <Text style={[styles.UserName, { marginLeft: 7 }]}>{item.client.firstName}{" "}{item.client.lastName}</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                        <Entypo name="scissors" color={'#000'} size={20} />
                        <Text style={[styles.UserName, { marginLeft: 7 }]}>{item.professional.user.firstName}{" "}{item.professional.user.lastName}</Text>
                        <Entypo name="message" color={'#000'} size={24} />
                    </View>
                </View>
            </ScrollView>


        </View>

    );

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, flex: 1 }}
                data={FetchedData}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                statusBarTranslucent>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLOR.BLACK_30,
                }}>
                    <View style={{
                        borderRadius: 15,
                        padding: 15,
                        backgroundColor: COLOR.WHITE,
                        elevation: 5,
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        alignItems: 'center',
                    }}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>Please wait while client do the payment !!</Text>
                        <TouchableOpacity
                            style={{
                                width: 50,
                                marginTop: 10,
                                backgroundColor: COLOR.ORANGECOLOR,
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
                            onPress={() => setModalVisible(false)}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: '700',
                                }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>

    )
}

export default ProfessionalPending

const styles = StyleSheet.create({})
