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

const Salon = () => {
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
  const [FetchedsSalonData, setFetchedSalonData] = useState([]);

  const [address, setAddress] = useState({
    Address: '',
    city: '',
    state: '',
    Nearbylandmark: ''
  });
  const [distance, setDistance] = useState(50);
  const authToken = useSelector(state => state.AuthReducer);
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
        // fetchDataForDelivery(position.coords.latitude, position.coords.longitude);
        fetchDataForSalon(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error("Error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };



  const fetchDataForSalon = async (lat, lng) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lng},${lat}/unit/mi/all/all/all/all/1/1000/all`, config);
      console.log('============    salon     ======', res.data.data.facilities);
      setFetchedSalonData(res.data.data.facilities);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;


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
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE }}>
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')} style={{ backgroundColor: COLOR.LIGHTGRAY, height: 50, width: Screen_Width * 0.75, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
            <AntDesign name="search1" size={30} color={COLOR.GRAY} />
            <Text style={{ fontSize: 20, color: COLOR.GRAY }} >Search Location</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openBottomSheet()} style={{ backgroundColor: COLOR.LIGHTGRAY, elevation: 5, shadowColor: COLOR.BLACK, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View> */}
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
      </View>
      <View style={{ marginVertical: 10 }}>
      <FlatList
        data={FetchedsSalonData}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (

            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 3 }}>
              <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SalonProffListScreen, { FacilityDetail: item })} style={{ paddingHorizontal: 15, marginHorizontal: 5, flexDirection: "row", justifyContent: 'flex-start', gap: 30, alignItems: 'center' }}>
                <Image source={{uri:item.coverImage}} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
                <View>
                  <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600' }}>{item?.name}</Text>
                  <Text style={{ color: COLOR.BLACK, fontSize: 13, }}>{item?.description}</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => toggleBookmark(item._id)}>
                <View style={{ height: 90, width: 30 }}>
                  <MaterialCommunityIcons
                    name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                    size={25}
                    color={COLOR.ORANGECOLOR}
                  />
                </View>
              </TouchableOpacity> */}

            </View>
          )
        }}
      />
      </View>
      <View style={{}}>
        <RBSheet
          ref={(ref) => (refRBSheet.current[0] = ref)}

          height={Screen_Height * 0.50}
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
              <Text style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18, marginVertical: 5 }}>Styles</Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center', gap:20, marginVertical: 5 }}>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: activeTab1 === 'Masculine' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Masculine')}
                >
                  <Text style={{ color: activeTab1 === 'Masculine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Masculine</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: activeTab1 === 'Both' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Both')}
                >
                  <Text style={{ color: activeTab1 === 'Both' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Both</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: activeTab1 === 'Feminine' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR
                  }}
                  onPress={() => setActiveTab1('Feminine')}
                >
                  <Text style={{ color: activeTab1 === 'Feminine' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Feminine</Text>
                </TouchableOpacity>
              </View>
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

export default Salon;

