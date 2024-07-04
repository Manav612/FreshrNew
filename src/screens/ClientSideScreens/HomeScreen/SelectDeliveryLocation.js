import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';

const SelectDeliveryLocation = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}],
    },
  ];

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
        <Text style={{fontWeight: '600', fontSize: 20, color: COLOR.BLACK}}>
          Select Delivery Location{' '}
        </Text>
      </View>

      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: Screen_Height * 0.14,
          height: Screen_Height * 0.1,
          width: Screen_Width * 0.99,
          zIndex: 1,
        }}>
        <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.SearchLocationScreen)} 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLOR.WHITE,
            borderRadius: 10,
            paddingHorizontal: 15,
            marginHorizontal: 10,
            height:40,
          }}>
          <Text
            style={{
              fontSize: 16,
              color:COLOR.GRAY,
            }}>
            Search for a building, street name, or area
            </Text>
          <MaterialIcons name="search" size={24} color={COLOR.GRAY} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          customMapStyle={mapStyle}
        />
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
          }}>
          <View style={{marginRight: 8}}>
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
        <View style={{flexDirection: 'row', alignItems: 'flex-start', flex: 1}}>
          <MaterialIcons
            name="location-on"
            size={24}
            color={COLOR.ORANGECOLOR}
          />
          <View style={{marginLeft: 12, flex: 1}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: COLOR.BLACK}}>
              New India Colony
            </Text>
            <Text style={{fontSize: 14, color: COLOR.GRAY, marginTop: 4}}>
              Ankur Tenament, Nikol, Ahmedabad, Gujarat 380038, India (New India
              Colony)
            </Text>
          </View>
        </View>
        <TouchableOpacity
         onPress={() => navigation.navigate(NavigationScreens.SearchLocationScreen)} 
          style={{
            backgroundColor: COLOR.AuthField,
            padding: 5,
            borderRadius: 5,
          }}>
          <Text style={{color: COLOR.ORANGECOLOR, fontWeight: '500'}}>
            CHANGE
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
       onPress={() => navigation.navigate(NavigationScreens.ConformLocationScreen)} 
        style={{
          justifyContent: 'center',
          borderRadius: 10,
          alignItems: 'center',
          height: Screen_Height * 0.05,
          backgroundColor: COLOR.ORANGECOLOR,
          marginHorizontal: 15,
          marginTop: 10,
        }}>
        <Text style={{color: COLOR.WHITE, fontSize: 18}}>CONFIRM LOCATION</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectDeliveryLocation;
