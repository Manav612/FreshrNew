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


  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  const [address, setAddress] = useState({
    Address: '',
    city: '',
    state: '',
    Nearbylandmark: ''
  });
  const [distance, setDistance] = useState(50);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    AddFavData(),fetchDataForDelivery(),fetchDataForSalon().then(() => setRefreshing(false));
  }, []);
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

  const AddFavData = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
            // console.log("==========>", token);
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }

            };
      const res = await axios.post(`${BASE_API_URL}/users/favorites`, { professional:itemId },config);
      console.log("================= add fav data ======================", res.data.data);
      console.log("Response data:", res.status);

            // Check if the request was successful
            if (res.data.status === "success") {
              Alert.alert("success",res.data.message)
                
            } else {
                Alert.alert(res.data.message)
              }
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

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
      }
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`, config);
      console.log('========    delivery  ============', res.data.data.professionals);
      setFetchedDeliveryData(res.data.data.professionals);
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
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/male`, config);
      console.log('============    salon     ======.........', res.data.data);
      // setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    AddFavData()
    // fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('AuthToken');
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
  //     console.log('========    Proff   ==========', res.data.professional);
  //     setProfData(res?.data?.professional)
  //     const ProfId = res.data.professional.map((prof) => prof.id);
  //     // console.log("========  profId   =============",ProfId);
  //     // setProfID(ProfId)
  //     const emailList = res.data.professional.map((prof) => prof.user.email);
  //     // console.log('======     emails hkb     ===========', emailList);
  //     const Name = res.data.professional.map((prof) => prof.user.firstName);
  //     // console.log('======     name hkb     ===========', Name);
  //     // setFetchedProfName(Name);
  //     const Phone = res.data.professional.map((prof) => prof.user.phone);
  //     // console.log('======     Phone hkb     ===========', Phone);
  //     // setFetchedProfPhone(Phone);

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };



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
  const [activeTab2, setActiveTab2] = useState('Masculine');
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')} style={{ backgroundColor: COLOR.LIGHTGRAY, height: 50, width: Screen_Width * 0.75, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
            <AntDesign name="search1" size={30} color={COLOR.GRAY} />
            <Text style={{ fontSize: 20, color: COLOR.GRAY }} >Search Professionals</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openBottomSheet()} style={{ backgroundColor: COLOR.LIGHTGRAY, elevation: 5, shadowColor: COLOR.BLACK, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>
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
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Nearby Professional</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.Booking)} ><Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>See all</Text></TouchableOpacity> */}
      </View>
      <FlatList
        data={FetchedDeliveryData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 3 }}>
              <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.ProfessionalInfoScreen, { ProfDetail: item })} style={{ paddingHorizontal: 15, marginHorizontal: 5, flexDirection: "row", justifyContent: 'flex-start', gap: 30, alignItems: 'center' }}>
                <Image source={barber} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
                <View>
                  <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600' }}>{item?.user?.firstName}{" "}{item?.user?.lastName}</Text>
                  <Text style={{ color: COLOR.BLACK, fontSize: 13, }}>{item?.distance}km</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleBookmark(item._id)}>
                <View style={{ height: 90, width: 30 }}>
                  <MaterialCommunityIcons
                    name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                    size={25}
                    color={COLOR.ORANGECOLOR}
                  />
                </View>
              </TouchableOpacity>

            </View>
          )
        }}
      />
      <View style={{}}>
        <RBSheet
          ref={(ref) => (refRBSheet.current[0] = ref)}

          height={Screen_Height * 0.65}
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
          <View style={{ paddingHorizontal: 5, marginVertical: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ width: 30, height: 3, backgroundColor: COLOR.BLACK, marginBottom: 10 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.9 }}>
                <View style={{ width: 30 }} />
                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Filter</Text>
                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                  <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                </TouchableOpacity>
              </View>

            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />



            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Style</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
                <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Masculine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Masculine') }}>
                  <Text style={{ color: activeTab2 === 'Masculine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Masculine</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 150, height: 40, backgroundColor: activeTab2 === 'Feminine' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab2('Feminine') }}>
                  <Text style={{ color: activeTab2 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Category</Text>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={AllCategory}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18 }}>Rating</Text>
              <FlatList
                data={data3}
                keyExtractor={item => item.id}
                renderItem={Rating}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>Distance: {distance} km</Text>
              <Slider
                style={{ width: '100%', marginTop: 10 }}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#000"
                thumbTintColor="#000"
                value={distance}
                onValueChange={(value) => setDistance(value)}
              />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
              <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Reset' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Reset') }}>
                <Text style={{ color: activeTab === 'Reset' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Apply Filter' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Apply Filter') }}>
                <Text style={{ color: activeTab === 'Apply Filter' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Apply Filter</Text>
              </TouchableOpacity>
            </View>
          </View>

        </RBSheet>
      </View>


      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Delivery;
