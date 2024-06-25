import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
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

const Delivery = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState({
    Address: '',
    city: '',
    state: '',
    Nearbylandmark: ''
  });
  const refRBSheet = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage < ProfileData.length - 1) {
        flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
        setCurrentPage(currentPage + 1);
      } else {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        setCurrentPage(0);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentPage, ProfileData.length]);

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
        fetchDataForSalon(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchDataForDelivery = async (lat, lng) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/female/female/delivery/1/1000/`, config);
      console.log('========    delivery           ==========.........', res.data.data);
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDataForSalon = async (lat, lng) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/female/female/salon/1/1000/male`, config);
      console.log('============    salon     ======.........', res.data.data);
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;


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

 


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLOR.WHITE }}>
      <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')} style={{ backgroundColor: COLOR.LIGHTGRAY, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
          <AntDesign name="search1" size={30} color={COLOR.GRAY} />
          <Text style={{ fontSize: 20, color: COLOR.GRAY }} >Search Professionals</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')}>
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{ marginVertical: 10, borderRadius: 15 }}>
        <FlatList
          ref={flatListRef}
          data={ProfileData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.floor(offset / Screen_Width);
            setCurrentPage(index);
          }}
          renderItem={({ item }) => (
            <View style={{ borderRadius: 15, marginHorizontal: 5 }}>
              <FastImage
                source={item.img}
                style={{ width: Screen_Width * 0.9, height: 200, resizeMode: 'cover', borderRadius: 15 }}
              />
            </View>
          )}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', bottom: 25, borderRadius: 15 }}>
        {ProfileData.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === currentPage ? COLOR.ORANGECOLOR : COLOR.GRAY,
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
      <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Nearby Location</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NearbyYourLocation Screen')} ><Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>See all</Text></TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Category />
      </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Nearby Professional</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.Booking)} ><Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>See all</Text></TouchableOpacity> */}
      </View>
      <View style={{ marginVertical: 10 }}>
        <Category />
      </View>


     
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Delivery;