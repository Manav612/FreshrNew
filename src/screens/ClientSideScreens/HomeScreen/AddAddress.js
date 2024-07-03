import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
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
import { NavigationScreens } from '../../../constants/Strings';
import { SetAddress } from '../../../redux/AddressAction';

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


  const onSaveAddress = ()=>{
    try {

      Geocoder.from(rState.region.latitude, rState.region.longitude)
        .then(json => {
          var addressComponent = json;
          console.log(json.results[0]?.formatted_address);
          dispatch(SetAddress((apartment ? `${apartment},`:'')+json.results[0]?.formatted_address));
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  }
  return (
    <>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.05, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Add Address</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width, height: 600 }}>
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
        <View style={{ height: Screen_Height * 0.3, width: Screen_Width * 0.88, borderRadius: 15, marginVertical: 10, backgroundColor: COLOR.AuthField, elevation: 5, shadowColor: COLOR.BLACK }} >
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
        <TouchableOpacity style={{ width: Screen_Width * 0.9, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 10, borderRadius: 15 }} onPress={onSaveAddress}>
          <Text style={{ color: COLOR.WHITE, fontWeight: 'bold' }}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default AddAddress

