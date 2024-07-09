import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { OnBoard1 } from '../../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import FastImage from 'react-native-fast-image';
import socketServices from '../../../Services/Socket';
import { NavigationScreens } from '../../../constants/Strings';

const ProfessionalUpcoming = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const navigation = useNavigation();
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [toggleStatus, setToggleStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [FetchedData, setFetchedData] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [PaymentData, setPaymentData] = useState(false);
  const authToken = useSelector(state => state.AuthReducer);
  const refRBSheet = useRef();


  const toggleBookmark = sumit => {
    setToggleStatus(prevState => ({
      ...prevState,
      [sumit]: !prevState[sumit],
    }));
  };

  useEffect(() => {
    fetchData();

  }, []);

  useEffect(() => {
    socketServices.on('payment_Done', data => {
      console.log('==== payment done ======', data);
      closeBottomSheet()
      navigation.navigate(NavigationScreens.LiveTrackingProfSideScreen, { orderData: data })

    });

  }, []);

  socketServices.on('create_order', data => {
    // console.log(
    //   '====  order create data Socket ======',
    //   data.message.data.order,
    // );
    setFetchedData([data.message.data.order, ...FetchedData]);
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);


  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const ongoingRes = await axios.get(
        `${BASE_API_URL}/professionals/professional/orders/ONGOING`,
        config,
      );
      const inTrafficRes = await axios.get(
        `${BASE_API_URL}/professionals/professional/orders/IN_TRAFFIC`,
        config,
      );
      const pendingRes = await axios.get(
        `${BASE_API_URL}/professionals/professional/orders/PENDING`,
        config,
      );

      const combinedData = [
        ...ongoingRes.data.data.orders,
        ...inTrafficRes.data.data.orders,
        ...pendingRes.data.data.orders,
      ];

      // console.log('==========   order  List   ===========', combinedData);
      setFetchedData(combinedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const PutData = async (orderId, coordinates) => {
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
        // console.log('===========  milllaaa ayush bhai bolte guru  ==========',{
        //   recipient: res.data.data.order.client._id,
        //   message: {
        //     paymentKey: res.data.data.order.paymentKey,
        //   },
        // });
        openBottomSheet()

        socketServices.emit('order_update', {
          recipient: res.data.data.order.client.id,
          message: {
            type: 'accept_order',
            paymentKey: res.data.data.order.paymentKey,
            orderDetails: res.data.data.order.client.id,
            order_id: res.data.data.order._id,
            coordinates: coordinates,
          },
        });
      }
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const PutCancelData = async orderId => {
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
        Alert.alert('Booking is cancel successfully');
        fetchData();
      } else {
        Alert.alert(res.data.message);
      }
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResetPress = id => {
    setFetchedData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            resetSelected: !item.resetSelected,
            applySelected: false,
          };
        }
        return item;
      }),
    );
  };

  const handleApplyPress = id => {
    setFetchedData(prevData =>
      prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            applySelected: !item.applySelected,
            resetSelected: false,
          };
        }
        return item;
      }),
    );
  };

  const handleResetPress1 = () => {
    setResetSelected(!resetSelected);
    setApplySelected(false);
  };

  const handleApplyPress2 = () => {
    setApplySelected(!applySelected);
    setResetSelected(false);
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

  useEffect(() => {
    // fetchServicesData();
    // socketServices.on('accept_order', data => {
    //   console.log(
    //     '====  Order Accepted ======',data,
    //   );
    //   closeBottomSheet()
    //   navigation.navigate(NavigationScreens.PaymentMethodScreen,{data:data});
    // });
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const openBottomSheet = () => {
    refRBSheet?.current?.open();
    startTimer();
  };

  const closeBottomSheet = () => {
    refRBSheet?.current?.close();
    stopTimer();
  };


  const RenderItem = ({ item, onPress, onCancel }) => (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK,
        elevation: 3,
        marginHorizontal: 3,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View>
          <Text style={{ fontSize: 14, color: COLOR.BLACK }}>
            {item?.createdAt.slice(0, 10)}
          </Text>
        </View>
        {/* <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Remind me</Text>
                    <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                        <FontAwesome
                            name={toggleStatus[item.id] ? "toggle-off" : "toggle-on"}
                            size={25}
                            color={COLOR.ORANGECOLOR}
                        />
                    </TouchableOpacity>
                </View> */}
      </View>
      <View
        style={{
          backgroundColor: COLOR.LINECOLOR,
          height: 2,
          marginVertical: 5,
          paddingHorizontal: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: COLOR.BLACK,
              marginVertical: 2,
            }}>
            {item?.professional.user.firstName}{' '}
            {item?.professional.user.lastName}
          </Text>
        </View>
      </View>
      <FlatList
        data={item.services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: service }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <View
              style={{
                height: 65,
                width: 65,
                backgroundColor: COLOR.LINECOLOR,
                borderRadius: 99,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FastImage
                source={{ uri: service.photo }}
                resizeMode="contain"
                style={{ width: 90, height: 100, borderRadius: 10 }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text
                style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>
                {service.serviceType.name}
              </Text>
              <Text
                style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>
                {service.serviceType.category}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: COLOR.ORANGECOLOR,
                  marginVertical: 2,
                }}>
                {service.serviceType.description}
              </Text>
            </View>
          </View>
        )}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            onCancel(item.id);
          }}
          style={{
            backgroundColor: item.resetSelected
              ? COLOR.ORANGECOLOR
              : COLOR.WHITE,
            height: 45,
            borderRadius: 30,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: COLOR.ORANGECOLOR,
            borderWidth: 2,
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: item.resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR,
            }}>
            Cancel Booking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPress(item.id,item?.address?.coordinates)}
          style={{
            backgroundColor: item.applySelected
              ? COLOR.ORANGECOLOR
              : COLOR.WHITE,
            height: 45,
            borderRadius: 30,
            width: 130,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: COLOR.ORANGECOLOR,
            borderWidth: 2,
          }}>
          <Text
            style={{
              fontWeight: '700',
              color: item.applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR,
            }}>
            Accept Booking
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: COLOR.WHITE }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15, marginHorizontal: 15, flex: 1 }}
        scrollEnabled={false}
        data={FetchedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RenderItem item={item} onPress={PutData} onCancel={PutCancelData} />
        )}
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
    </View>
  );
};

export default ProfessionalUpcoming;

const styles = StyleSheet.create({});
