
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Modal, TextInput, FlatList, RefreshControl, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Hair1, HomeIcon2, OnBoard1 } from '../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../Services';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActiveLine from '../Story/Story/ActiveLine';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LiveTrackingMap from '../LiveTrackingMap';
import socketServices from '../../Services/Socket';
import { NavigationScreens } from '../../constants/Strings';
import Icon from 'react-native-vector-icons/Ionicons';


const Ongoing = ({
    orderData
}) => {
    // console.log('----------------------   Ongo  Client ------------->', orderData);

    const theme = useSelector(state => state.ThemeReducer);

    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const navigation = useNavigation()
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [toggleStatus, setToggleStatus] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [FetchedData, setFetchedData] = useState([]);
    const [id, setId] = useState('');
    const [height, setHeight] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(true)
    const [recipientId, setRecipientId] = useState('');
    const [orderId, setOrderId] = useState(orderData.message.order_id);
    const [Prof_distance, setProf_distance] = useState('')
    const [Prof_duration, setProf_duration] = useState('')
    const [Client_distance, setClient_distance] = useState('')
    const [Client_duration, setClient_duration] = useState('')
    const [accept, setAccept] = useState('');
    const [requestCount, setRequestCount] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [GetOneOrder, setGetOneOrder] = useState('')
    const [rating, setRating] = useState(4);
    const authToken = useSelector(state => state.AuthReducer);
    const [name, setName] = useState('');
    const handleNameChange = (text) => {
        setName(text);
    };

    socketServices.on('Request_To_End_Order', data => {
        setAccept(data.sender);
        setOrderId(data.message.order_id);
        getOneOrder(data.message.order_id);
        setRequestCount(prevCount => prevCount + 1);
    });

    const onAcceptRequestEnd = () => {
        endOrder();
    }

    const onUnhappyPress = () => {
        if (requestCount >= 2) {
            // If this is the second or later request, end the order and show the review modal
            endOrder();
        } else {
            // For the first request, send the unhappy message as before
            socketServices.emit('order_update', {
                recipient: accept,
                message: {
                    type: 'Unhappy_To_End_Order',
                    id: accept,
                    order_id: orderId,
                },
            });
        }
    }

    const endOrder = () => {
        // End the order for both client and professional
        socketServices.emit('order_update', {
            recipient: accept,
            message: {
                type: 'End_Order',
                id: accept,
                order_id: orderId,
            },
        });

        // Show review modal for client
        setModalVisible(true);
    }

    const HandleReview = () => {
        ReviewData();
    }

    const getOneOrder = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const res = await axios.get(`${BASE_API_URL}/orders/${id}`, config);
            setGetOneOrder(res.data.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const ReviewData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };

            let data = {};

            data['professional'] = GetOneOrder.professional;
            data['service'] = GetOneOrder.services;
            data['facility'] = GetOneOrder.facility || null;
            data['description'] = name;
            data['rating'] = rating;
            data['reviewType'] = 'client';

            const res = await axios.post(
                `${BASE_API_URL}/review/`,
                data,
                config,
            );



            if (res.data.status === 'success') {
                navigation.navigate(NavigationScreens.HomeScreen)
                Alert.alert('Review added successfully');
            } else {
                Alert.alert("technial error", res.data.message);
                navigation.navigate(NavigationScreens.HomeScreen)
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('An error occurred', error.message);
        }
    };


    socketServices.on('Request_To_Start_Order', data => {
        setRecipientId(data?.sender);
        setOrderId(data.message.order_id);
        // openBottomSheet();
        setHide(false)

    });

    const handleAccept = () => {
        // navigation.navigate(NavigationScreens.OrderProcessingScreenClientSideScreen, { services: orderData.message.services });
        // refRBSheet?.current?.close();
        socketServices.emit('order_update', {
            recipient: recipientId,
            message: {
                type: 'Accept_To_Process_Order',
                id: recipientId,
                order_id: orderId,
            },
        });
    }

    const toggleBookmark = (sumit) => {
        setToggleStatus(prevState => ({
            ...prevState,
            [sumit]: !prevState[sumit]
        }));
    };
    const services2 = [
        { name: 'Wings', price: 28.57 },
        { name: 'Wings', price: 28.57 },
        { name: 'Wings', price: 28.57 },
    ];
    const toggleDropdown = ({ services2 }) => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    // console.log("============     onnnngooooginnnggg          ======================", orderData);


    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const ongoingRes = await axios.get(`${BASE_API_URL}/users/user/orders/ONGOING`, config);
            const inTrafficRes = await axios.get(`${BASE_API_URL}/users/user/orders/IN_TRAFFIC`, config);
            // const pendingRes = await axios.get(`${BASE_API_URL}/users/user/orders/PENDING`, config);                                                                                                              

            const combinedData = [
                ...ongoingRes.data.data.orders,
                ...inTrafficRes.data.data.orders,
                // ...pendingRes.data.data.orders,
            ];

            // console.log('==========   order  List Ongoing / in traffic   ===========', combinedData)
            setFetchedData(combinedData)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleResetPress = (id) => {
        setFetchedData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, resetSelected: !item.resetSelected, applySelected: false };
            }
            return item;
        }));
    };

    const handleApplyPress = (id) => {
        setFetchedData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, applySelected: !item.applySelected, resetSelected: false };
            }
            return item;
        }));
    };

    const handleResetPress1 = () => {
        setResetSelected(!resetSelected);
        setApplySelected(false);
    };

    const handleApplyPress2 = () => {
        setApplySelected(!applySelected);
        setResetSelected(false);
    };

    const refRBSheet = useRef([]);
    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };
    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };

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
            paddingTop: hide ? null : 60
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
        buttonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: Screen_Width,
            position: 'absolute',
            bottom: 10
        },
        button: {
            width: Screen_Width * 0.6,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            backgroundColor: COLOR.ChartBlue,
            marginVertical: 5,
            borderRadius: 20,
            flexDirection: 'row',
        },
        button2: {
            width: Screen_Width * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            backgroundColor: COLOR.ChartBlue,
            marginVertical: 5,
            borderRadius: 20,

        },
        buttonText: {
            color: COLOR.WHITE,
            fontWeight: 'bold',
            fontSize: 14,
            marginRight: 10
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
        },
        modalView: {
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: Screen_Width * 0.8,
        },
        iconContainer: {
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 30,
            padding: 15,
            marginBottom: 15,
        },
        modalTitle: {
            marginBottom: 15,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 18,
        },
        modalSubtitle: {
            marginBottom: 15,
            textAlign: 'center',
            color: COLOR.GRAY,
        },
        starsContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 15,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginBottom: 15,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: COLOR.BLACK,
            paddingVertical: 10
        },
        writeReviewButton: {
            backgroundColor: COLOR.ORANGECOLOR,
            borderRadius: 20,
            padding: 15,
            elevation: 2,
            width: Screen_Width * 0.6,
            marginBottom: 10,
        },
        writeReviewText: {
            color: COLOR.WHITE,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        cancelButton: {
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            padding: 15,
            elevation: 2,
            width: Screen_Width * 0.6,
        },
        cancelText: {
            color: COLOR.ORANGECOLOR,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });
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
                                },
                                height > 0 && { top: -height / 2 },
                            ]}
                            onLayout={layout => {
                                setHeight(layout.nativeEvent.layout.height);
                            }}>
                            {accept ? (
                                <>
                                    <View>
                                        <Text style={{ fontSize: 16, textAlign: 'center', color: COLOR.BLACK, fontWeight: "600" }}>Professional requesting order completion</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                        <TouchableOpacity onPress={onAcceptRequestEnd} style={styles.button2}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: COLOR.WHITE }}>Accept complete order</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={onUnhappyPress} style={styles.button2}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: COLOR.WHITE }}>Not satisfied</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            ) :
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: COLOR.BLACK }}>Professional requesting start order</Text>
                                    <TouchableOpacity onPress={handleAccept} style={[styles.button, { backgroundColor: COLOR.ChartBlue }]}>
                                        <Text style={styles.buttonText}>Start order</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    }
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 1000,
                            top: hide ? null : 40,
                            justifyContent: 'space-between',
                            marginVertical: 5
                        }}>
                        <Text style={styles.IdText}>ID : {orderId} </Text>
                        <Text style={[styles.UserName, { textAlign: 'right' }]}>
                            22-07-2024
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
                                socketServices.emit('order_update', {
                                    recipient: orderData.sender,
                                    message: {
                                        type: 'Location_ChangeCLI',
                                        id: orderData.message.id,
                                        order_id: orderData.message.order_id,
                                        data,
                                    },
                                });
                            }}
                            socketType={'Location_ChangeSP'}
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

                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,

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
                                    borderRadius: 0,
                                    borderBottomLeftRadius: 7,
                                    zIndex: 100,
                                    right: 0,
                                    backgroundColor: COLOR.BLACK,
                                },
                            ]}>
                            <Text style={[styles.WhiteText, { fontSize: 10 }]}>Ongoing</Text>
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
                                        <FontAwesome5 name="user" color={'#000'} size={15} />
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
                                            {parseFloat(Client_distance).toFixed(2)}km
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
                                            {parseFloat(Client_duration).toFixed(2)}min
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
                                        <FontAwesome5 name="user" color={'#000'} size={15} />
                                        <Text
                                            style={[styles.LabelText, { fontSize: 13, marginLeft: 7 }]}>
                                            Professional
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
                                            {parseFloat(Prof_distance).toFixed(2)}km
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
                                            {parseFloat(Prof_duration).toFixed(2)}min
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={[
                                    styles.LabelText,
                                    { fontSize: 18, paddingBottom: 70, color: COLOR.ORANGECOLOR },
                                ]}>
                                Meet-up in {parseFloat(Client_duration > Prof_duration ? Client_duration === 0 ? Client_duration : Client_duration + 5 : Prof_duration === 0 ? Prof_duration : Prof_duration + 5).toFixed(2)} min
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
                                                source={Hair1}
                                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                            />
                                            <Text
                                                style={{
                                                    color: COLOR.BLACK,
                                                    fontSize: 18,
                                                    fontWeight: '600',
                                                }}>
                                                Services ({services2.length})
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
                                                source={Hair1}
                                                style={{ width: 50, height: 50, borderRadius: 5 }}
                                            />
                                            <View style={{}}>
                                                <Text
                                                    style={{
                                                        color: COLOR.GRAY,
                                                        fontSize: 14,
                                                        fontWeight: '500',
                                                    }}>
                                                    Services ({services2.length})
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
                                                        Wings
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
                                    {services2.map((service, index) => (
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
                                                source={Hair1}
                                                resizeMode="cover"
                                            />
                                            <Text style={styles.UserName}>{service.name}</Text>
                                            <View style={styles.BlackContainer}>
                                                <Text style={styles.WhiteText}>
                                                    ${service.price.toFixed(2)}
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
                                <Text style={[styles.WhiteText, { height: 'auto' }]}>$8000</Text>
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
                </View>
            </ScrollView>

            {/* <Modal
          animationType="fade"
          transparent
          visible={directionModalVisible}
          statusBarTranslucent>
          <View style={styles.ViewWrapper}>
            <View style={styles.ModalContainer}>
              <Text
                style={
                  styles.LabelText
                }>{`Please head to\ndesignated location`}</Text>
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
        </Modal> */}
        </View>

    );

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
                scrollEnabled={false}
                data={FetchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.iconContainer}>
                            <Icon name="pencil" size={24} color="white" />
                        </View>
                        <Text style={styles.modalTitle}>Congrats! Service Completed 🎊</Text>
                        <Text style={styles.modalSubtitle}>Please rate your experience with the professional:</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={1}>
                                    <Icon
                                        name={star <= rating ? 'star' : 'star-outline'}
                                        size={30}
                                        color={COLOR.ORANGECOLOR}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Write review"
                                placeholderTextColor={COLOR.GRAY}
                                value={name}
                                onChangeText={handleNameChange}
                            />
                        </View>
                        <TouchableOpacity onPress={HandleReview} style={styles.writeReviewButton}>
                            <Text style={styles.writeReviewText}>Leave a Review</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => { setModalVisible(false), navigation.navigate(NavigationScreens.HomeScreen) }}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ height: 100 }} />
        </ScrollView>
    )
}

export default Ongoing

const styles = StyleSheet.create({})

