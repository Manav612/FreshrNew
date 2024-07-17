

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

const OurServices = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const dispatch = useDispatch();
  const { SelectedProf, locationData, facilitiesData } = route.params;
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
  const selectedProfId = SelectedProf._id;
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selected, setSelected] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
        openBottomSheet();
        socketServices.emit('order_update', {
          recipient: SelectedProf.user._id,
          message: {
            type: 'create_order',
            data: {
              order: res.data.order,
            },
          },
        });
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
            <TouchableOpacity
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
            </TouchableOpacity>
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

    </>
  );
};

export default OurServices;

const styles = StyleSheet.create({});
