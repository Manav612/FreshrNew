import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';

import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geocoder from 'react-native-geocoding';
import { SetAddress } from '../../../redux/AddressAction';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectDeliveryLocation = ({ route }) => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [modalVisible, setModalVisible] = useState(false);
  const editData = route.params?.editData;

  const coordinates = route?.params?.coordinates;
  const isNew = route?.params?.isNew;
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = Platform.OS === "IOS" ? 1.5 : 0.5;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const initialRegion = {
    latitude: editData ? editData.coordinates[0] : coordinates ? coordinates.lat : 37.78825,
    longitude: editData ? editData.coordinates[1] : coordinates ? coordinates.lng : -122.4324,
    latitudeDelta: LATITUDE_DELTA * Number(1 / 15),
    longitudeDelta: LONGITUDE_DELTA * Number(1 / 15),
  };
  const [region, setRegion] = useState(initialRegion);
  const [position, setPosition] = useState();

  const [address, setAddress] = useState();

  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

  const mapRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => { getAddressFromCoordinates(region.latitude, region.longitude) }, [region])

  const onValueChanged = (region) => {
    setRegion(region);
    getAddressFromCoordinates(
      parseFloat(JSON.stringify(region.latitude)),
      parseFloat(JSON.stringify(region.longitude))
    )
  }

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
        mapRef.current?.animateToRegion(
          {
            ...region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        );
        setRegion({
          ...region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })

        getAddressFromCoordinates(position.coords.latitude, position.coords.longitude);
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
          console.log("manavavvvvvvvvvv", json.results[0]?.formatted_address);
          setAddress(json.results[0]?.formatted_address);
          // dispatch(SetAddress(json.results[0]?.formatted_address));
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      height: Screen_Height * 0.57,
    },
    mapStyle: {
      height: Screen_Height * 0.57,
    },
  });

  return (
    <View>
      <View
        style={{
          width: Screen_Width,
          height: Screen_Height * 0.05,
          paddingHorizontal: 15,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          marginVertical: 10,
        }}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={26}
          color="black"
        />
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>
          Select Delivery Location{' '}
        </Text>
      </View>

      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: Screen_Height * 0.1,
          // height: Screen_Height * 0.1,
          width: Screen_Width * 0.9,
          zIndex: 1,
        }}>
        <GooglePlacesAutocomplete
          placeholder='Enter Location to Search address'
          minLength={2}
          styles={{
            textInput: {
              height: 50,
              backgroundColor: COLOR.WHITE,
              borderRadius: 15,
              elevation: 5,
              shadowColor: COLOR.BLACK,
              marginVertical: 10,
              color: COLOR.BLACK
            },
            listView: {
              // position:'absolute',
              backgroundColor: COLOR.AuthField,
              borderRadius: 15,
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
            poweredContainer: { display: 'none' }
          }}
          onPress={(data, details) => {
            setRegion({
              ...region,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            })
            mapRef.current?.animateToRegion(
              {
                ...region,
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
          disableScroll
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

      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.mapStyle}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          customMapStyle={mapStyle}
          onRegionChangeComplete={onValueChanged}
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title={'Test Marker'}
            description={'This is a description of the marker'}
          // key={i}
          ></Marker>
        </MapView>
      </View>

      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          bottom: Screen_Height * 0.2,
          zIndex: 1,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={checkLocationPermission}
        >
          <View style={{ marginRight: 8 }}>
            <MaterialIcons
              name="my-location"
              size={20}
              color={COLOR.ORANGECOLOR}
            />
          </View>
          <Text
            style={{
              color: COLOR.ORANGECOLOR,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            LOCATE ME
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1 }}>
          <MaterialIcons
            name="location-on"
            size={24}
            color={COLOR.ORANGECOLOR}
          />
          <Text style={{ color: COLOR.BLACK, fontSize: 16, flex: 1 }} numberOfLines={3}>
            {address}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLOR.AuthField,
            padding: 5,
            borderRadius: 5,
          }}>
          <Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '500' }}>
            CHANGE
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.ConformLocationScreen, { CurrentAddress: address, coordinates: region, editName:editData ? editData.name : '' ,id:editData ? editData.id : editData ? editData.id:'' })} 
        style={{
          justifyContent: 'center',
          borderRadius: 10,
          alignItems: 'center',
          height: Screen_Height * 0.05,
          backgroundColor: COLOR.ORANGECOLOR,
          marginHorizontal: 15,
          marginTop: 10,
        }}>
        <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>CONFIRM LOCATION</Text>
      </TouchableOpacity>


    </View>
  );
};

export default SelectDeliveryLocation;
