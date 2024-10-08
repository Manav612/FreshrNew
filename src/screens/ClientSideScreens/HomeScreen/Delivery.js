import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Scale, Screen_Height, Screen_Width } from '../../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Filter, barber } from '../../../constants/Icons';
import { ProfileData } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import Category from '../../../components/Category';
import FastImage from 'react-native-fast-image';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Slider from '@react-native-community/slider';
import { data, data2, data3 } from '../../../components/utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Delivery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const [FetchedDeliveryData, setFetchedDeliveryData] = useState([]);
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const authToken = useSelector(state => state.AuthReducer);


  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const [distance, setDistance] = useState(50);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (latitude !== null && longitude !== null) {
      fetchDataForDelivery(latitude, longitude).then(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  }, [latitude, longitude]);
  const toggleBookmark = async (itemId) => {
    try {
      await AddFavData(itemId);
      setBookmarkStatus(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
      }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Optionally, show an error message to the user
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchDataForDelivery()
    }
  }, []);

  const AddFavData = async (itemId) => {
    try {
      // console.log("==========>", authToken);
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }

      };
      const res = await axios.post(`${BASE_API_URL}/users/favorites`, { professional: itemId }, config);
      console.log("================= add fav data ======================", res.data.data);
      console.log("Response data:", res.status);

      // Check if the request was successful
      // if (res.data.status === "success") {
      //   Alert.alert("success", res.data.message)

      // } else {
      //   Alert.alert(res.data.message)
      // }
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (currentPage < ProfileData.length - 1) {
  //       flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
  //       setCurrentPage(currentPage + 1);
  //     } else {
  //       flatListRef.current.scrollToIndex({ animated: true, index: 0 });
  //       setCurrentPage(0);
  //     }
  //   }, 7000);
  //   return () => clearInterval(interval);
  // }, [currentPage, ProfileData.length]);

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
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchDataForDelivery = async (lat, lng) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }

      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`, config);
      console.log('========    delivery  ============', res.data.data.professionals);
      setFetchedDeliveryData(res.data.data.professionals);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const styles = StyleSheet.create({
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginLeft: 10,
      borderRadius: 30,
      height: 35,
      width: 110,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
      color: COLOR.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR.WHITE,
    },
  });

  const refRBSheet = useRef([]);

  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };

  const openItemBottomSheet = (index) => {
    refRBSheet.current[index + 1].open();
  };
  const [activeTab, setActiveTab] = useState('Apply Filter');
  const [activeTab1, setActiveTab1] = useState('Both');
  const AllCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.id)}>
      <View
        style={{
          marginHorizontal: 13,
        }}>

        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.id && styles.SelectedCategorytext,
          ]}>
          {item.text.length > 10 ? item.text.substring(0, 10) + '...' : item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const Rating = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem1 === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem1(item.id)}>
      <View
        style={{
          marginHorizontal: 13,
          flexDirection: 'row',
          gap: 5,
        }}>
        <MaterialCommunityIcons
          name="star"
          size={18}
          color={selectedItem1 === item.id ? COLOR.WHITE : COLOR.ORANGECOLOR}
        />
        <Text
          style={[
            styles.Categorytext,
            selectedItem1 === item.id && styles.SelectedCategorytext,
          ]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.ScheduledeliveryScreen)}
        style={{

          height: 50,

          justifyContent: 'space-between',
          backgroundColor: COLOR.WHITE,
          elevation: 3,
          borderRadius: 15,
          paddingHorizontal: 5,
          shadowColor: COLOR.ChartBlue,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 2

        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, color: COLOR.BLACK, fontWeight: 'bold' }}>
            Schedule Appointment
          </Text>
          <AntDesign name="calendar" size={24} color={COLOR.ORANGECOLOR} />
        </View>
        {/* <View style={{height:30,width:30,borderRadius:3,backgroundColor:COLOR.WHITE,elevation:10,shadowColor:COLOR.ChartBlue,justifyContent:'center',alignItems:'center'}}> */}

        <AntDesign name="plus" size={24} color={COLOR.BLACK} />
        {/* </View> */}

      </TouchableOpacity>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')} style={{ backgroundColor: COLOR.LIGHTGRAY, height: 50, width: Screen_Width * 0.75, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
            <AntDesign name="search1" size={30} color={COLOR.GRAY} />
            <Text style={{ fontSize: 20, color: COLOR.GRAY }} >Search Professionals</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openBottomSheet()} style={{ backgroundColor: COLOR.LIGHTGRAY, elevation: 5, shadowColor: COLOR.BLACK, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View> */}
      {/* <View style={{ marginVertical: 5, borderRadius: 15 }}>
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
      </View> */}
      <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Nearby Professionals</Text>
        {/* <TouchableOpacity><Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>See all</Text></TouchableOpacity> */}
      </View>
      <FlatList
        data={FetchedDeliveryData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id || `${item.name}-${item.coverImage}`}
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.ChartBlue, elevation: 2, marginHorizontal: 3 }}>
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
                    <TouchableOpacity onPress={() => toggleBookmark(item._id)} style={{ position: 'absolute', right: 1, top: 1 }}>

                      <MaterialCommunityIcons
                        name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                        size={25}
                        color={COLOR.ChartBlue}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, color: COLOR.WHITE }}>
                      <FontAwesome name="star-half-empty" size={20} color={COLOR.ORANGECOLOR} />
                      <Text style={{ marginLeft: 5, color: COLOR.ORANGECOLOR }}>4.8 (3,456)</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLOR.BLACK, borderRadius: 10, color: COLOR.WHITE, width: Screen_Width * 0.2, height: 25 }}>

                      <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{item?.distance}km</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

            </View>
          )
        }}
      />
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Delivery;
