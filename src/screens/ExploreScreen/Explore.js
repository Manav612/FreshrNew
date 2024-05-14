import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, {Marker} from 'react-native-maps';
const Explore = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  // const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
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
  const [searchText, setSearchText] = useState('');
  const refRBSheet = useRef([]);

  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };

  return (
    <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          <Marker
            draggable
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324,
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>
        {/* <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 25, elevation: 2, shadowColor: COLOR.BLACK, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15, marginTop: 40 }}>
          <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.80, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <AntDesign name="search1" size={30} color={COLOR.GRAY} />
              <TextInput
                placeholder='Search'
                placeholderTextColor={COLOR.GRAY}
                style={{ fontSize: 20, color: COLOR.GRAY, width: 200 }}
                onChangeText={text => {
                  setSearchText(text);
                }}
              />
            </View>
            <TouchableOpacity onPress={openBottomSheet}>
              <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          <RBSheet
            ref={(ref) => (refRBSheet.current[0] = ref)}
  
            height={Screen_Height * 0.50}
            customStyles={{
  
              wrapper: {
                backgroundColor: 'transparent',
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
            <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontWeight: '600', fontSize: 25 }}>Details</Text>
              </View>
            </View>
  
          </RBSheet>
        </View> */}
      </View>
  )
}

export default Explore

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})