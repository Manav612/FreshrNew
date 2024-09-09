

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
  Modal,
  Button,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Servicesdata } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';
import { SetServiceData } from '../../redux/ServicesData/ServicesDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import socketServices from '../../Services/Socket';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { barber, Hair1 } from '../../constants/Icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ongoing from '../MyBookingDetails/Ongoing';



const OurServices = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);

  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const dispatch = useDispatch();
  const [modalVisible, setmodalVisible] = useState(false)
  const { SelectedProf, locationData, facilitiesData } = route.params;
  const [FetchedDeliveryData, setFetchedDeliveryData] = useState([]);
  const coordinates = route.params.coorinates;
  const refRBSheet = useRef(null);

  const facilitiesInfo = {

    coordinates: [
      facilitiesData?.location?.coordinates[0],
      facilitiesData?.location?.coordinates[1]
    ],
    address: facilitiesData?.formattedAddress,
  };

  const [ModalVisible, setModalVisible] = useState(false);

  const selectedProfId = SelectedProf._id;
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [orderData, setOrderData] = useState()
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [id, setId] = useState('');

  const navigation = useNavigation();

  const authToken = useSelector(state => state.AuthReducer);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10

    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLOR.BLACK
    },
    role: {
      fontSize: 14,
      color: COLOR.GRAY,
    },
    menuIcon: {
      marginLeft: 'auto',
    },
    menuText: {
      fontSize: 24,
    },
    earningsContainer: {
      marginVertical: 20,
      padding: 20,
      backgroundColor: COLOR.BLACK,
      borderRadius: 10,
      alignItems: 'center',
    },
    earningsText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLOR.BLACK
    },
    percentageText: {
      fontSize: 16,
      color: COLOR.ORANGECOLOR, // COLOR.ORANGECOLOR-red color for percentage
    },
    earningsSubText: {
      fontSize: 14,
      color: COLOR.GRAY,
      width: Screen_Width * 0.3
    },
    overview: {
      marginVertical: 20,
    },
    overviewTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: COLOR.BLACK
    },
    overviewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 2
    },
    overviewBox: {
      width: Screen_Width * 0.44,
      padding: 15,
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      marginVertical: 5,
      elevation: 2,
      shadowColor: COLOR.BLACK
    },
    overviewBoxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLOR.BLACK
    },
    overviewBoxValue: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 5,
      color: COLOR.BLACK
    },
    overviewBoxSubText: {
      fontSize: 14,
      color: COLOR.GRAY,
    },
    increaseText: {
      fontSize: 16,
      color: COLOR.ChartBlue, // lime-green color for increase
    },
    decreaseText: {
      fontSize: 16,
      color: COLOR.ORANGECOLOR, // COLOR.ORANGECOLOR-red color for decrease
    },
    chartContainer: {
      marginVertical: 20,
      alignItems: 'center',
      backgroundColor: COLOR.WHITE,
      elevation: 2,
      marginHorizontal: 2,
      shadowColor: COLOR.BLACK,
      borderRadius: 20,
      height: Screen_Height * 0.48,
      justifyContent: 'center',

    },
    chartTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: COLOR.BLACK
    },
    customLabel: {
      backgroundColor: COLOR.WHITE,
      padding: 5,
      borderRadius: 5,
      shadowColor: COLOR.BLACK,
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      color: COLOR.BLACK
    },
    labelText: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: COLOR.BLACK
    },
    dropdownContainer: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      borderColor: COLOR.AuthField,
      padding: 10
    },
    dropdown: {
      height: 20,
      width: 150,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      paddingHorizontal: 8,
      marginBottom: 10
    },
    placeholderStyle: {
      fontSize: 16,
      color: COLOR.BLACK_40
    },
    selectedTextStyle: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    icon: {
      marginRight: 10
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    dropdownItemSelected: {
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      maxHeight: Screen_Height * 0.5,
      height: 150,
      padding: 20,
      backgroundColor: COLOR.WHITE,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color: COLOR.BLACK,
      textAlign: 'center'
    },
    modasubTitle: {
      fontSize: 14,
      fontWeight: "800",
      marginBottom: 10,
      color: COLOR.BLACK,
      textAlign: 'center'
    },
    input2: {
      height: 40,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: COLOR.BLACK,
    },
  });

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkLocationPermission();
    fetchServicesData().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchServicesData();
    socketServices.on('accept_order', data => {
      console.log(
        '====  Order Accepted ======', data,
      );
      openBottomSheet()
      setOrderData(data)
      // closeBottomSheet()
      // navigation.navigate(NavigationScreens.PaymentMethodScreen, { data: data });
    });
    socketServices.on('cancle_order', data => {
      console.log(
        '====  cancle order ======', data,
      );
      closeBottomSheet()
      setModalVisible(true)
      fetchDataForDelivery()
    });
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);


  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (permissionStatus !== RESULTS.GRANTED) {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        getLocation();
      }
    } else {
      getLocation();
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchDataForDelivery(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error:", error);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchDataForDelivery = async (lat, lng) => {
    try {
      // setLoading(true);
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`, config);
      console.log('========    delivery  ============', res.data.data.professionals);

      setFetchedDeliveryData(res.data.data.professionals);
      // setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      // setLoading(false);
      // setError("Failed to fetch data. Please try again.");
    }
  };



  const fetchServicesData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const res = await axios.get(
        `${BASE_API_URL}/professionals/professional/${selectedProfId}`,
        config,
      );
      console.log(
        '=======   fetchhh services  == ========',
        res.data.data.Professional.services,
      );
      setFetchedServices(res.data.data.Professional.services);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelect = item => {
    setSelected(prevSelected => {
      const isItemSelected = prevSelected.some(
        service => service.id === item.id,
      );
      if (isItemSelected) {
        return prevSelected.filter(service => service.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const handlePayNow = () => {
    closeBottomSheet()
    return (
      <Ongoing orderData={orderData} />
    )
  }


  const handleBookNow = () => {
    if (selected.length > 0) {
      toggleModal();
    } else {
      Alert.alert('Please select at least one service');
    }
  };

  const toggleModal = async () => {
    try {
      console.log('==========>', authToken);
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const data = {
        address: facilitiesData === undefined ? locationData : facilitiesInfo,
        professionalTravelDistance: '30',
      };
      console.log('==============  book now  donneeeeeee    ===    ===========', data);
      const serviceIds = selected.map(service => service.id).join(',');

      const res = await axios.post(
        `${BASE_API_URL}/orders/checkout-session/${serviceIds}/null/60`,
        data,
        config,
      );

      console.log('Response data:', res.data);
      console.log('Response status:', res.status);

      if (res.data.status === 'success') {
        const socketData = {
          recipient: SelectedProf.user._id,
          message: {
            type: 'create_order',
            data: {
              order: res.data.order,
            },
            service: selected
          },
        };
        const order_id = res.data.order.id;
        console.log("==============      create order id           ===================", order_id);

        await AsyncStorage.setItem('order_id', order_id);

        // Emit the socket event
        socketServices.emit('order_update', socketData);

        // Navigate to MyBookingScreen with the socket data
        navigation.navigate(NavigationScreens.MyBookingScreen, { socketData });


        console.log("==================      socketData       ====================", JSON.stringify(socketData));
        console.log("==================      selectedddddddd       ====================", selected);

      } else {
        Alert.alert("==== our services screen ====", res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred', error.message);
    }
  };

  const PutCancelData = async orderId => {
    try {

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
        // fetchData();
      } else {
        Alert.alert(res.data.message);
      }
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderitem = ({ item }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          backgroundColor: COLOR.WHITE,
          marginTop: 10,
          width: Screen_Width * 0.92,
          height: Screen_Height * 0.15,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
        }}>
        <Image
          source={Hair1}
          // source={
          //   { uri: item?.photo }
          // }
          style={{
            width: Screen_Width * 0.22,
            height: Screen_Height * 0.1,
            borderRadius: 10,
          }}

        />
        <View
          style={{ flexDirection: 'column', marginLeft: 15, gap: 5, width: 180 }}>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '600',
              paddingRight: 10,
            }}>
            {item?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '300',
              paddingRight: 10,
            }}>
            {item?.category?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK_40,
              fontSize: 14,
              fontWeight: '600',
              paddingRight: 10,
              width: 170,
            }}>
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
            }}>
            <Text
              style={{
                color: COLOR.ORANGECOLOR,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              ${item?.price}
            </Text>
          </View>
        </View>

        <Fontisto
          name={
            selected.some(service => service.id === item.id)
              ? 'checkbox-active'
              : 'checkbox-passive'
          }
          size={28}
          color={COLOR.BLACK}
        />
      </TouchableOpacity>
    </View>
  );
  const renderitemguest = ({ item }) => (
    <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginHorizontal: 2, marginBottom: 10, padding: 10, }}>
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          backgroundColor: COLOR.WHITE,
          marginTop: 10,
          width: Screen_Width * 0.92,
          height: Screen_Height * 0.15,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          borderRadius: 10,
          flexDirection: 'row',
          elevation: 3, shadowColor: COLOR.ChartBlue
        }}>
        <Image
          source={Hair1}
          // source={
          //   { uri: item?.photo }
          // }
          style={{
            width: Screen_Width * 0.22,
            height: Screen_Height * 0.1,
            borderRadius: 10,
          }}

        />
        <View
          style={{ flexDirection: 'column', marginLeft: 15, gap: 5, width: 180, elevation: 3, shadowColor: COLOR.ChartBlue }}>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '600',
              paddingRight: 10,
            }}>
            {item?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '300',
              paddingRight: 10,
            }}>
            {item?.category?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK_40,
              fontSize: 14,
              fontWeight: '600',
              paddingRight: 10,
              width: 170,
            }}>
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
            }}>
            <Text
              style={{
                color: COLOR.ORANGECOLOR,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              ${item?.price}
            </Text>
          </View>
        </View>

        <Fontisto
          name={
            selected.some(service => service.id === item.id)
              ? 'checkbox-active'
              : 'checkbox-passive'
          }
          size={28}
          color={COLOR.BLACK}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >



        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, color: COLOR.BLACK }}>
              Select Services
            </Text>
          </View>

        </View>
        <ScrollView horizontal style={{ flex: 1, height: 50, flexDirection: "row", gap: 10 }}>

          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} onPress={() => openBottomSheet()}>
            <Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '600' }}>Guest 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >
            <Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '600' }}>Guest 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >
            <Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '600' }}>Guest 6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >
            <Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '600' }}>Guest 8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR, flexDirection: 'row', gap: 10, marginLeft: 10 }} >


            <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Guest 10</Text>
          </TouchableOpacity>


        </ScrollView>
        <FlatList
          data={fetchedServices}
          showsVerticalScrollIndicator={false}
          renderItem={renderitem}
          style={{ flex: 1 }}
          scrollEnabled={false}
        />

        <View style={{ height: 170 }} />
      </ScrollView >
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 35,
          backgroundColor: selected.length > 0 ? COLOR.ORANGECOLOR : COLOR.GRAY,
          marginVertical: 15,
          position: 'absolute',
          bottom: 90,
          width: Screen_Width * 0.95,
          marginHorizontal: 10,
        }}
        onPress={handleBookNow}
        disabled={selected.length === 0}>
        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>
          Book now
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{ width: Screen_Width, height: Screen_Height, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.BLACK_40 }}>
          <View style={{ width: Screen_Width * 0.8, height: Screen_Height * 0.6, borderRadius: 15, backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK, elevation: 3, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: COLOR.BLACK, fontWeight: '600', fontSize: 20, marginTop: 20 }}>Select other professional</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: 'absolute', right: 1, top: 0 }}>
              <AntDesign name="closecircle" size={30} color={COLOR.BLACK} />
            </TouchableOpacity>

            <FlatList
              data={FetchedDeliveryData}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              style={{ flex: 1, marginTop: 20 }}
              // scrollEnabled={false}
              renderItem={({ item }) => {
                return (

                  <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.ChartBlue, elevation: 3, marginHorizontal: 3, width: Screen_Width * 0.7 }}>
                    {/* <View style={item.isOnline?{backgroundColor:COLOR.GREEN,position:'absolute',right:5,top:5,height:8,width:8,borderRadius:5}:{backgroundColor:COLOR.CANCEL_B,position:'absolute',right:5,top:5,height:8,width:8,borderRadius:5}}/> */}
                    <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalInfoScreen, { ProfDetail: item })} style={{ paddingHorizontal: 15, marginHorizontal: 5, gap: 10, flexDirection: 'row' }}>
                      <Image source={barber} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.12, borderRadius: 10 }} />
                      <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 5 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: Screen_Width * 0.6 }}>
                          <View>
                            <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600', marginBottom: 5 }}>{item?.user?.firstName}{" "}{item?.user?.lastName}</Text>
                            <View style={{ backgroundColor: COLOR.ORANGECOLOR, borderRadius: 10, width: Screen_Width * 0.2, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ fontSize: 15, color: COLOR.WHITE, }}>{item?.sericeCnt} service</Text>
                            </View>
                          </View>
                          {/* <TouchableOpacity onPress={() => toggleBookmark(item._id)} style={{ position: 'absolute', right: 1, top: 1 }}>

                      <MaterialCommunityIcons
                        name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                        size={25}
                        color={COLOR.ChartBlue}
                      />
                    </TouchableOpacity> */}
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                          <View style={{ flexDirection: 'row', borderRadius: 10, color: COLOR.WHITE, marginBottom: 3 }}>
                            <FontAwesome name="star-half-empty" size={20} color={COLOR.ORANGECOLOR} />
                            <Text style={{ marginLeft: 5, color: COLOR.ORANGECOLOR }}>4.8 (3,456)</Text>
                          </View>
                          <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.BLACK, borderRadius: 10, color: COLOR.WHITE, width: Screen_Width * 0.2, height: 25 }}>

                            <Text style={{ color: COLOR.WHITE, fontSize: 13, marginVertical: 5 }}>{item?.distance}km</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>

                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={modalVisible} onRequestClose={() => setmodalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>You are 3rd in the queue</Text>

            <Text style={styles.modasubTitle}>Would you like to proceed?</Text>


            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", }}>
              <TouchableOpacity
                onPress={() => { setmodalVisible(false), navigation.navigate("Home Screen") }}
                style={{
                  width: 130,
                  backgroundColor: COLOR.BLACK,
                  height: 40,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10, marginRight: 5
                }}
              >
                <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Take me back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: 130,
                  backgroundColor: COLOR.ORANGECOLOR,
                  height: 40,
                  borderRadius: 10,
                  marginVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

            backgroundColor: COLOR.WHITE,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ width: "100%", height: 60, borderBottomWidth: 1, borderColor: COLOR.LINECOLOR, }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
                textAlign: 'center',
                color: "#000"
              }}>
              Select Services
            </Text>
          </View>
          <ScrollView>
            <FlatList
              data={fetchedServices}
              showsVerticalScrollIndicator={false}
              renderItem={renderitemguest}
              style={{ flex: 1 }}
              scrollEnabled={false}
            />
          </ScrollView>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderRadius: 35,
              backgroundColor: COLOR.ORANGECOLOR,
              marginVertical: 15,

              width: Screen_Width * 0.95,
              marginHorizontal: 10,
            }}
          >
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>
              Add services for Guest 1
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </>
  );
};

export default OurServices;

const styles = StyleSheet.create({});
