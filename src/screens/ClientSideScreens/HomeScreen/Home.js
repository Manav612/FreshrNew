
import { ScrollView, StyleSheet, Text, View, FlatList,PermissionsAndroid, Image, TextInput, TouchableOpacity, RefreshControl, Dimensions, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Scale, Screen_Height, Screen_Width } from '../../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../constants/Strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import RBSheet from 'react-native-raw-bottom-sheet';
import Delivery from './Delivery';
import Salon from './Salon';
import MapView, { Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from 'react-native-geocoding';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SetAddress } from '../../../redux/AddressAction';
const Home = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [address, setAddress] = useState('');
  
  const [refreshing, setRefreshing] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
    const mapRef = useRef();
    const formattedAddress = useSelector(state=>state.AddressReducer);
    const dispatch = useDispatch();
 
 
  useEffect(() => {
    getUserInfo()
  }, [])


  const getUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/users/getMe`, config);
      console.log('========  user ID   ==========', res.data.data.user.searchLocations[0].address)
      setUser(res.data.data.user);
      
      // Filter the addresses to include only those with isSelected: true
      // const selectedAddresses = res.data.data.user.searchLocations.filter(
      //   location => location.isSelected
      // );
      // console.log("=============  seleAddressss   ================",selectedAddresses);
      setAddress(res.data.data.user.searchLocations[0].address);

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


  const fullName = `${user?.firstName} ${user?.lastName}`.trim();
  const displayName = fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;
 
  useEffect(() => {
    fetchData();
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
        getAddressFromCoordinates(position.coords.latitude,position.coords.longitude);
      },
      (error) => {
        console.error("Error:", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      Geocoder.from(latitude, longitude)
        .then(json => {
          var addressComponent = json;
          console.log(json.results[0]?.formatted_address);
          dispatch(SetAddress(json.results[0]?.formatted_address));
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  };

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
      console.error("Errorssa:", error);
    }
  };


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    
    >
      <View style={{ height: Screen_Height * 0.08, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <View>
            <Text style={{ color: COLOR.BLACK, fontSize: 17 }}>{greeting}, {displayName}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.AddAddressScreen)} style={{ flexDirection: 'row', alignItems: 'center',  height: 38,flex:1 }}>
              <Entypo name="location-pin" size={15} color={COLOR.BLACK} />
              <Text style={{ color: COLOR.BLACK, fontSize: 16,flex:1 }} numberOfLines={1}>
              {address}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, marginLeft:10,alignItems: 'center' }}>
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
          <TouchableOpacity style={{ width:Screen_Width*0.4, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:Screen_Width*0.4, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Salon</Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'Delivery' ? <Delivery /> : <Salon />
      }
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Home;
