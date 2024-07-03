import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geocoder from 'react-native-geocoding';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationScreens } from '../../../constants/Strings';
import { SetAddress } from '../../../redux/AddressAction';
import { data5 } from '../../../components/utils';
import RBSheet from 'react-native-raw-bottom-sheet';

const AddAddress = () => {
  const [apartment, setApartment] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('')
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const [radius, setRadius] = useState(1);
  const [region, setRegion] = useState(initialRegion);
  const LATITUDE_DELTA = Platform.OS === "IOS" ? 1.5 : 0.5;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA * Number(1 / 15),
    longitudeDelta: LONGITUDE_DELTA * Number(1 / 15),
  };
  const dispatch = useDispatch()
  const _map = useRef(null);
  s = {
    region: {
      latitude: 23.052524,
      longitude: 72.6800283,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }
  }
  const onValueChanged = (region) => {
    rSetState({ region: region });
    getAddressFromCoordinates(
      parseFloat(JSON.stringify(region.latitude)),
      parseFloat(JSON.stringify(region.longitude))
    )
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
        _map.current?.animateToRegion(
          {
            latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
            longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        );
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
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      Geocoder.from(latitude, longitude)
        .then(json => {
          var addressComponent = json;
          console.log(json.results[0]?.formatted_address);
          setFormattedAddress(json.results[0]?.formatted_address)

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
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef(null);
  const openBottomSheet = (item) => {
    setSelectedItem(item);
    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 5 }}>
          <Text>{item.icon}</Text>
          <Text style={{ color: COLOR.GRAY, fontSize: 16, fontWeight: '900' }}>{item.title}</Text>
          <Text style={{ color: COLOR.GRAY, fontSize: 16 }}>{item.distance}</Text>
        </View>
        <TouchableOpacity onPress={() => openBottomSheet(item)}>
          <Text>{item.icon2}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ fontSize: 14 }}>{item.text}</Text>
    </View>
  );


  const onSaveAddress = () => {
    try {

      Geocoder.from(rState.region.latitude, rState.region.longitude)
        .then(json => {
          var addressComponent = json;
          console.log(json.results[0]?.formatted_address);
          dispatch(SetAddress((apartment ? `${apartment},` : '') + json.results[0]?.formatted_address));
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  }
  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Enter your area or apartment name</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: 10, height: Screen_Height * 0.4 }}>
        <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={6}
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
              color: COLOR.BLACK,
            },
            description: {
              color: COLOR.BLACK,
            },
            row: {
              backgroundColor: COLOR.DarkBackground,
            },
            separator: {
              backgroundColor: COLOR.GRAY,
              height: 1,
            },
          }}
          onPress={(data, details) => {
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: LATITUDE_DELTA * Number(radius / 15),
              longitudeDelta: LONGITUDE_DELTA * Number(radius / 15),
            });
            console.log("=-=-=-=", data);
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
      </View>
      <TouchableOpacity  onPress={() => navigation.navigate(NavigationScreens.SelectDeliveryLocationScreen)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Entypo name="direction" size={25} color={COLOR.ORANGECOLOR} />
          <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.ORANGECOLOR }}>Use my current location</Text>
        </View>
        <AntDesign name="right" size={20} color={COLOR.GRAY} />
      </TouchableOpacity>
      <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 5, }} />
      <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SelectDeliveryLocationScreen)} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 10 }}>
        <AntDesign name="plus" size={25} color={COLOR.ORANGECOLOR} />
        <Text style={{ fontWeight: '600', fontSize: 16, color: COLOR.ORANGECOLOR }}>Add new Address</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 5 }} />
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, color: COLOR.GRAY }}>SAVED ADDRESSES</Text>
        <FlatList
          data={data5}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderItem}
        />
      </View>

      <View>
        <RBSheet
          ref={refRBSheet}
          height={Screen_Height * 0.4}
          customStyles={{
            wrapper: { backgroundColor: COLOR.BLACK_40 },
            container: {
              backgroundColor: COLOR.AuthField,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              elevation: 10,
              shadowColor: COLOR.BLACK,
            },
            draggableIcon: { backgroundColor: COLOR.BLACK },
          }}
          customModalProps={{ animationType: 'slide', statusBarTranslucent: true }}
          customAvoidingViewProps={{ enabled: false }}
        >
          <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ width: 30, height: 3, backgroundColor: COLOR.BLACK, marginBottom: 10 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Screen_Width * 0.9 }}>
                <View style={{ width: 30 }} />
                <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Address</Text>
                <TouchableOpacity onPress={() => refRBSheet.current?.close()}>
                  <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10 }} />

            {selectedItem && (
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>{selectedItem.title} | <Text style={{ fontSize: 16, color: COLOR.BLACK_70 }}>{selectedItem.text}</Text></Text>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SelectDeliveryLocationScreen)} style={{backgroundColor:COLOR.WHITE,elevation:3,height:50,borderRadius:10,marginVertical:5,alignItems:'center',flexDirection:'row',justifyContent:'center',gap:5}}>
                  <Feather name="edit" size={24} color={COLOR.BLACK} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.SelectDeliveryLocationScreen)} style={{backgroundColor:COLOR.WHITE,elevation:3,height:50,borderRadius:10,alignItems:'center',flexDirection:'row',justifyContent:'center',gap:5}}>
                  <FontAwesome name="share-alt" size={24} color={COLOR.BLACK} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK }}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{height:50,marginVertical:10,alignItems:'center',flexDirection:'row',justifyContent:'center',gap:5}}>
                  <AntDesign name="delete" size={24} color={COLOR.CANCEL_B} />
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR.CANCEL_B }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </RBSheet>
      </View>
      <View style={{ height: 90 }} />
    </ScrollView>
  )
}

export default AddAddress

