
import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity ,RefreshControl} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Scale, Screen_Height, Screen_Width } from '../../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Filter } from '../../../constants/Icons';
import { ProfileData } from '../../../components/utils';

import { useNavigation } from '@react-navigation/native';
import Category from '../../../components/Category';
import FastImage from 'react-native-fast-image';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';
import Delivery from './Delivery';
import Salon from './Salon';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchedData, setFetchedData] = useState('');

  const [address, setAddress] = useState({
    Address: '',
    city: '',
    state: '',
    Nearbylandmark: ''
  });
  const refRBSheet = useRef(null);

  

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentPage < ProfileData.length - 1) {
  //       flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
  //       setCurrentPage(currentPage + 1);
  //     } else {
  //       flatListRef.current.scrollToIndex({ animated: true, index: 0 });
  //       setCurrentPage(0);
  //     }
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, [currentPage, ProfileData.length]);

  // useEffect(() => {
  //   checkLocationPermission();
  // }, []);

  // const checkLocationPermission = async () => {
  //   const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //   if (permissionStatus !== RESULTS.GRANTED) {
  //     const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //     if (result === RESULTS.GRANTED) {
  //       getLocation();
  //     }
  //   } else {
  //     getLocation();
  //   }
  // };

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //       fetchDataForDelivery(position.coords.latitude, position.coords.longitude);
  //       fetchDataForSalon(position.coords.latitude, position.coords.longitude);
  //     },
  //     (error) => {
  //       console.error("Error:", error);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };

  // const fetchDataForDelivery = async (lat, lng) => {
  //   try {
  //     const token = await AsyncStorage.getItem("AuthToken");
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     };
  //     const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/female/female/delivery/1/1000/`, config);
  //     console.log('========    delivery           ==========.........', res.data.data);
  //     // setFetchedData(res.data.facilities.facility);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const fetchDataForSalon = async (lat, lng) => {
  //   try {
  //     const token = await AsyncStorage.getItem("AuthToken");
  //     const config = {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     };
  //     const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/female/female/salon/1/1000/male`, config);
  //     console.log('============    salon     ======.........', res.data.data);
  //     // setFetchedData(res.data.facilities.facility);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  useEffect(()=>{
   getUserInfo()
  },[])


  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
      console.log('========  user ID   ==========', res.data.data.user)
      setUser(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserInfo().then(() => setRefreshing(false));
  }, []);

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [activeTab, setActiveTab] = useState('Delivery');


  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const styles = StyleSheet.create({
  });

  const openBottomSheet = () => {
    refRBSheet.current.open();
  };

  const closeBottomSheet = () => {
    refRBSheet.current.close();
  };

  const handleSaveAddress = () => {
    refRBSheet.current.close();
  };

  
  const fullName = `${user?.firstName} ${user?.lastName}`.trim();
  const displayName = fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;
  const formatAddress = (address) => {
    const fullAddress = `${address.Address}, ${address.city}, ${address.state}, ${address.Nearbylandmark}`;
    if (fullAddress.length > 15) {
      return `${fullAddress.substring(0, 15)}...`;
    }
    return fullAddress;
  };
  useEffect(() => {

    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/users/facilities/`, config);
      console.log('========  user facilty   =============', res.data.data);
      setFetchedData(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    >
      <View style={{ height: Screen_Height * 0.08, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={{ color: COLOR.BLACK, fontSize: 17 }}>{greeting}, {displayName}</Text>
            <TouchableOpacity onPress={openBottomSheet} style={{ flexDirection: 'row', alignItems: 'center', width: 150, height: 38 }}>
              <Entypo name="location-pin" size={15} color={COLOR.BLACK} />
              <Text style={{ color: COLOR.BLACK, fontSize: 16 }}>
                {formatAddress(address)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.InboxScreen)}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} color={COLOR.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notification Screen')}>
            <Ionicons name="notifications-outline" size={30} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginHorizontal: 2, marginBottom: 10, padding: 10, elevation: 2, shadowColor: COLOR.BLACK }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Where do we meet?</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Salon</Text>
          </TouchableOpacity>
        </View>
      </View>
{activeTab === 'Delivery' ? <Delivery/> : <Salon/>
}
<RBSheet
        ref={refRBSheet}
        height={Screen_Height * 0.7}
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
        }}
      >
        <View
          style={{
            width: Screen_Width,
            height: Screen_Height * 0.7,
            paddingHorizontal: 15,
            backgroundColor: COLOR.WHITE,
            justifyContent: 'space-between'
          }}
        >

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 15,
            justifyContent: 'space-between',
            margin: 10
          }}>
            <Text style={{ fontSize: 20, color: COLOR.BLACK }}>Add Address</Text>
            <TouchableOpacity onPress={closeBottomSheet}><AntDesign name="closecircleo" size={25} color={COLOR.BLACK} /></TouchableOpacity>
          </View>

          <ScrollView style={{ margin: 10 }}>
            <TextInput
              placeholder="Address"
              placeholderTextColor={COLOR.GRAY}
              value={address.Address}
              onChangeText={(text) => setAddress({ ...address, Address: text })}
              style={{
                borderWidth: 1,
                borderColor: COLOR.GRAY,
                borderRadius: 5,
                padding: 10,
                color:COLOR.BLACK,
                marginBottom: 10,
                backgroundColor: COLOR.WHITE,
              }}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor={COLOR.GRAY}
              value={address.city}
              onChangeText={(text) => setAddress({ ...address, city: text })}
              style={{
                borderWidth: 1,
                borderColor: COLOR.BLACK,
                borderRadius: 5,
                padding: 10,
                color:COLOR.BLACK,
                marginBottom: 10,
                backgroundColor: COLOR.WHITE,
              }}
            />
            <TextInput
              placeholder="State"
              placeholderTextColor={COLOR.GRAY}
              value={address.state}
              onChangeText={(text) => setAddress({ ...address, state: text })}
              style={{
                borderWidth: 1,
                borderColor: COLOR.GRAY,
                borderRadius: 5,
                padding: 10,
                color:COLOR.BLACK,
                marginBottom: 10,
                backgroundColor: COLOR.WHITE,
              }}
            />
            <TextInput
              placeholder="Nearbylandmark"
              placeholderTextColor={COLOR.GRAY}
              value={address.Nearbylandmark}
              onChangeText={(text) => setAddress({ ...address, Nearbylandmark: text })}
              style={{
                borderWidth: 1,
                borderColor: COLOR.GRAY,
                borderRadius: 5,
                padding: 10,
                color:COLOR.BLACK,
                marginBottom: 10,
                backgroundColor: COLOR.WHITE,
              }}

            />
          </ScrollView>
          <TouchableOpacity
            style={{
              width: Screen_Width * 0.90,
              height: Screen_Height * 0.05,
              backgroundColor: COLOR.ORANGECOLOR,
              justifyContent: 'center',
              borderRadius: 35,
              alignSelf: 'center',
              marginVertical: 20
            }}
            onPress={handleSaveAddress}
          >
            <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.WHITE }}>
              Save Address
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Home;
