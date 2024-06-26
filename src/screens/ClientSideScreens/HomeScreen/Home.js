
import { ScrollView, StyleSheet, Text, View, FlatList,PermissionsAndroid, Image, TextInput, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
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

const Home = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [apartment, setApartment] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
    const [radius, setRadius] = useState(1);
    const mapRef = useRef();
    const [loc, setLoc] = useState()
    const [formattedAddress, setFormattedAddress] = useState('')
    
  const [address, setAddress] = useState({
    Address: '',
    city: '',
    state: '',
    Nearbylandmark: ''
  });
  const refRBSheet = useRef(null);

  const [region, setRegion] = useState(initialRegion);
  const LATITUDE_DELTA = Platform.OS === "IOS" ? 1.5 : 0.5;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA * Number(1 / 15),
    longitudeDelta: LONGITUDE_DELTA * Number(1 / 15),
  };
  const _map = useRef(null);
  s = {
    region: {
      latitude: 23.052524,
      longitude: 72.6800283,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }
  }
  const [rState, rSetState] = useState(s);
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const locationPermissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
        );

        const locationGranted = locationPermissionStatus === 'granted' || locationPermissionStatus === 'restricted';

        if (locationGranted) {
            handleUserLocation();
            return true;
        }
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                handleUserLocation();
            } else {
                requestLocationPermission();
            }
        } catch (err) {
            console.warn(err)
        }
    }
}

const handleUserLocation = () => {
    Geolocation.getCurrentPosition(
        (pos) => {

            rSetState({
                region: {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                }
            })
            _map.current.animateToRegion({
                ...rState.region,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            })
        },
        (error) => {
            // See error code charts below.
            console.warn("Error " + error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
    );
}

useEffect(() => {
    requestLocationPermission();
}, [])

const onValueChanged = (region) => {
    rSetState({ region: region });
    getAddressFromCoordinates(
        parseFloat(JSON.stringify(region.latitude)),
        parseFloat(JSON.stringify(region.longitude))
    )
}
const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
        Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json;
                console.log(json.results[0]?.formatted_address);
                // setFormattedAddress(json.results[0]?.formatted_address)
            })
            .catch(error => console.warn(error));
    } catch (error) {
        console.log('Error retrieving address:', error);
    }
};
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
    input: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 15,
      elevation: 5,
      shadowColor: COLOR.BLACK,
      marginVertical: 5,
      color: COLOR.BLACK,
  },
  });

  const openBottomSheet = () => {
    refRBSheet.current.open();
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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
      {activeTab === 'Delivery' ? <Delivery /> : <Salon />
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
        <View style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width, }}>
          <GooglePlacesAutocomplete
            placeholder='Enter Location'
            minLength={4}
            styles={{
              textInput: {
                height: 50,
                width: Screen_Width * 0.9,
                backgroundColor: COLOR.WHITE,
                borderRadius: 15,
                elevation: 5,
                shadowColor: COLOR.BLACK,
                marginVertical: 10,
                color: COLOR.BLACK
              },
              container: {
                width: Screen_Width * 0.9,
              },
              predefinedPlacesDescription: {
                color: COLOR.WHITE,
              },
              description: {
                color: COLOR.WHITE,
              },
              row: {
                backgroundColor: COLOR.DarkBackground,
              },
              separator: {
                backgroundColor: COLOR.GRAY,
                height: 1,
              },
            }}
            onPress={(data, details = null) => {
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
                longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
              });
              console.log(data, details);
              _map.current?.animateToRegion(
                {
                  latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
                  longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                },
              );
            }}
            autoFocus={false}
            listViewDisplayed={false}
            keepResultsAfterBlur={false}
            returnKeyType={"default"}
            fetchDetails={true}
            GooglePlacesDetailsQuery={{
              rankby: "distance",
            }}
            query={{
              key: "AIzaSyCs3kyGiiVDcIn3KZ6aKCRDVe66EZKh9qU",
              language: "en",
              radius: 30000,
              location: `${region?.latitude}, ${region?.longitude}`,
            }}

          />
          <View style={{ width: Screen_Width * 0.88 }}>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 14 }}>Apartment, Suite (optional)</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Apartment, Suite"
              placeholderTextColor={COLOR.GRAY}
              value={apartment}
              onChangeText={setApartment}
            />
          </View>
          <View style={{ height: Screen_Height * 0.3, width: Screen_Width * 0.88, borderRadius: 15, marginVertical: 20, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK }} >
            <MapView
              ref={_map}
              // provider={PROVIDER_GOOGLE}
              style={{ flex: 1, borderRadius: 7, overflow: 'hidden' }}
              initialRegion={rState.region}
              showsUserLocation={true}
              rotateEnabled={false}
              onRegionChangeComplete={onValueChanged}
            >
              <Marker coordinate={rState.region}>

                <FontAwesome
                  name="map-marker"
                  size={35}
                  color={COLOR.PINK} />
              </Marker>
            </MapView>
          </View>
        </View>
      </RBSheet>
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Home;
