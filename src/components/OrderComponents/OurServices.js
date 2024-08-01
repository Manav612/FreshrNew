

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
import { barber } from '../../constants/Icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const OurServices = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);

  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const dispatch = useDispatch();
  const { SelectedProf, locationData, facilitiesData } = route.params;
  const [FetchedDeliveryData, setFetchedDeliveryData] = useState([]);
  const coordinates = route.params.coorinates;
  console.log("==============   selected facilitiiiiii   ==============", facilitiesData);
  // console.log("==============   selected coordinates   ==============", coordinates);
  // const location = facilitiesData?.formattedAddress
  const facilitiesInfo = {

    coordinates: [
      facilitiesData?.location?.coordinates[0],
      facilitiesData?.location?.coordinates[1]
    ],
    address: facilitiesData?.formattedAddress,
  };
  console.log("======  facilitiesInfo   ========", facilitiesInfo);
  const [ModalVisible, setModalVisible] = useState(false);

  const selectedProfId = SelectedProf._id;
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const refRBSheet = useRef(null);
  const navigation = useNavigation();

  const authToken = useSelector(state => state.AuthReducer);

  const startTimer = () => {
    // if (!isTimerRunning) {
    //   const interval = setInterval(() => {
    //     setTimeLeft(prevTime => {
    //       if (prevTime <= 1) {
    //         clearInterval(interval);
    //         setIsTimerRunning(false);
    //         refRBSheet?.current?.close();
    //         navigation.navigate(NavigationScreens.HomeScreen);
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
      closeBottomSheet()
      navigation.navigate(NavigationScreens.PaymentMethodScreen, { data: data });
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

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

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

  const openBottomSheet = () => {
    refRBSheet.current.open();
    startTimer();
  };

  const closeBottomSheet = () => {
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
    stopTimer();
  };

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
        // openBottomSheet();
        navigation.navigate(NavigationScreens.MyBookingScreen)
        socketServices.emit('order_update', {
          recipient: SelectedProf.user._id,
          message: {
            type: 'create_order',
            data: {
              order: res.data.order,
            },
            service: selected
          },
        });
        console.log("==================      selectedddddddd       ====================", selected);

      } else {
        Alert.alert(res.data.message);
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
          style={{
            width: Screen_Width * 0.22,
            height: Screen_Height * 0.1,
            borderRadius: 10,
          }}
          source={{ uri: item?.photo }}
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
        <FlatList
          data={fetchedServices}
          showsVerticalScrollIndicator={false}
          renderItem={renderitem}
          style={{ flex: 1 }}
          scrollEnabled={false}
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
              Wait while your order is accepted
            </Text>
            <Text style={{ fontSize: 48, fontWeight: 'bold', color: COLOR.BLACK }}>
              {formatTime(timeLeft)}
            </Text>
            {/* <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 35,
                backgroundColor: COLOR.CANCEL_B,
                marginVertical: 15,
                width: Screen_Width * 0.95,
                marginHorizontal: 10,
              }}
            // onPress={PutCancelData}
            >
              <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '700' }}>
                Cancel Order
              </Text>
            </TouchableOpacity> */}
          </View>
        </RBSheet>
        <View style={{ height: 170 }} />
      </ScrollView>
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
    </>
  );
};

export default OurServices;

const styles = StyleSheet.create({});
