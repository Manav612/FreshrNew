import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList, RefreshControl, ScrollView, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { OnBoard1 } from '../../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import socketServices from '../../../Services/Socket';
import { NavigationScreens } from '../../../constants/Strings';

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
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const refRBSheet = useRef();
    const authToken = useSelector(state => state.AuthReducer);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };
    const startTimer = () => {
        // if (!isTimerRunning) {
        //   const interval = setInterval(() => {
        //     setTimeLeft(prevTime => {
        //       if (prevTime <= 1) {
        //         clearInterval(interval);
        //         setIsTimerRunning(false);
        //         refRBSheet?.current?.close();
        //         navigation.navigate(NavigationScreens.ProfessionalHomeScreen);
        //         return 0;
        //       }
        //       return prevTime - 1;
        //     });
        //   }, 1000);
        //   setTimer(interval);
        //   setIsTimerRunning(true);
        // }
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
            setIsTimerRunning(false);
        }
    };
    const openBottomSheet = () => {
        refRBSheet?.current?.open();
        startTimer();
    };

    const closeBottomSheet = () => {
        refRBSheet?.current?.close();
        stopTimer();
    };
    const styles = StyleSheet.create({
        modalContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            // backgroundColor: COLOR.ROYALBLUE,

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
            navigation.navigate(NavigationScreens.LiveTrackingProfSideScreen, { orderData: data })
        });
    }, []);


    useEffect(() => {
        fetchData();

        socketServices.on('create_order', data => {
            console.log(
                '====  order create data Socket ======',
                data.message.data.order,
            );
            setFetchedData(prevData => [data.message.data.order, ...prevData]);
            setOrderData({
                order_id: data.message.data.order.id,
                coordinates: data.message.data.order.address?.coordinates,
            })
            // setModalVisible(true); // Open the modal when a new order is received
        });
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    }, []);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const res = await axios.get(`${BASE_API_URL}/professionals/professional/orders/PENDING`, config);
            console.log('==========   order  List pendinggg  ===========', JSON.stringify(res.data.data.orders))
            setFetchedData(res.data.data.orders)
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const PutData = async (orderId, coordinates) => {
        console.log("===================>", orderId, coordinates);
        try {
            setModalVisible(false)
            // console.log("Order Id : ",coordinates);
            const config = {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            };
            console.log('=================>', `${BASE_API_URL}/professionals/professional/acceptOrder/${orderId}`);
            const res = await axios.put(
                `${BASE_API_URL}/professionals/professional/acceptOrder/${orderId}`,
                {},
                config,
            );
            console.log('===========  milllaaa  ==========', JSON.stringify(res.data.data));
            if (res.status == 200) {
                // console.log('===========  milllaaa ayush bhai bolte guru  ==========',{
                //   recipient: res.data.data.order.client._id,
                //   message: {
                //     paymentKey: res.data.data.order.paymentKey,
                //   },
                // });
                openBottomSheet()
                setOrderData({});
                socketServices.emit('order_update', {
                    recipient: res.data.data.order.client.id,
                    message: {
                        type: 'accept_order',
                        paymentKey: res.data.data.order.paymentKey,
                        orderDetails: res.data.data.order.client.id,
                        order_id: orderId,
                        coordinates: coordinates,
                        orderData: res.data.data,
                    },
                });
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

        <View

            style={{ backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 3, borderRadius: 10, paddingHorizontal: 20, marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item?.createdAt}</Text>
                </View>
                <View style={{ backgroundColor: COLOR.ChartBlue, width: 75, height: 25, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: COLOR.WHITE }}>Pending</Text></View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>
                        {item?.professional?.user?.firstName} {item?.professional?.user?.lastName}
                    </Text>
                </View>
            </View>
            <FlatList
                data={item.services}
                keyExtractor={(service, index) => index.toString()}
                renderItem={({ item: service }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ height: 65, width: 65, backgroundColor: COLOR.LINECOLOR, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                            <FastImage source={{ uri: service?.photo }} resizeMode='contain' style={{ width: 90, height: 100, borderRadius: 10 }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{service?.name}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{service?.category?.name}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>{service?.description}</Text>
                            <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>${service?.price}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <TouchableOpacity onPress={() => handleResetPress(item.id)} style={{ backgroundColor: selectedReceipt === item.id ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: Screen_Width * 0.75, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: selectedReceipt === item.id ? COLOR.WHITE : COLOR.ORANGECOLOR }}>View E-Receipt </Text>
                </TouchableOpacity>
            </View>

        </View>

    );

    return (

        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
                data={FetchedData}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />

            <RBSheet
                ref={refRBSheet}
                height={Screen_Height * 0.5}
                customStyles={{
                    wrapper: {
                        backgroundColor: COLOR.BLACK_40,
                    },
                    container: {
                        backgroundColor: COLOR.WHITE,
                        borderRadius: 40,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 0,
                        elevation: 10,
                        shadowColor: COLOR.BLACK,
                    },
                    draggableIcon: {
                        backgroundColor: COLOR.BLACK,
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{
                    enabled: false,
                }}>
                <View
                    style={{
                        width: Screen_Width,
                        height: Screen_Height * 0.5,
                        paddingHorizontal: 15,
                        backgroundColor: COLOR.WHITE,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            color: COLOR.BLACK,
                            textAlign: 'center',
                        }}>
                        Please wait for client's payment
                    </Text>
                    <Text style={{ fontSize: 48, fontWeight: 'bold' }}>
                        {formatTime(timeLeft)}
                    </Text>


                </View>
            </RBSheet>
            <View style={{ height: 100 }} />

            {
                Object.keys(orderData).length > 0 &&
                <Modal visible={Object.keys(orderData).length > 0} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>

                            <TouchableOpacity onPress={() => PutData(orderData.order_id, orderData.coordinates)} style={{ backgroundColor: COLOR.GREEN, borderRadius: 35, height: 40, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.6, marginBottom: 10 }} >
                                <Text style={{ fontSize: 18, fontWeight: '600', color: COLOR.WHITE }}>
                                    Accept booking
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: COLOR.CANCEL_B, borderRadius: 35, height: 40, justifyContent: 'center', alignItems: 'center', width: Screen_Width * 0.6 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: COLOR.WHITE }}>
                                    Reject booking
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
        </ScrollView>

    )
}

export default ProfessionalPending

const styles = StyleSheet.create({})
