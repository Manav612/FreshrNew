import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { data, data3, data4 } from '../../components/utils';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Filter } from '../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import socketServices from '../../Services/Socket';
import { NavigationScreens } from '../../constants/Strings';
import LiveTrackingMap from '../LiveTrackingMap';


const LiveTrackingProfSide = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const { orderData } = route.params;
  // const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
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
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('Delivery');
  const [activeTab2, setActiveTab2] = useState('Masculine');
  const refRBSheet = useRef([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const navigation = useNavigation()
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [MarkerDataFordelivery, setMarkerDataFordelivery] = useState([]);
  const [MarkerDataForSalon, setMarkerDataForSalon] = useState([]);
  const [distance, setDistance] = useState(50);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState();
  s = {
    region: {
      latitude: 23.052524,
      longitude: 72.6800283,
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    }
  }
  const [rState, rSetState] = useState(s);



  const onRequestToStartOrder = () => {
    const id = orderData.sender;
    socketServices.emit('order_update', {
      recipient: id,
      message: {
        type: 'Request_To_Start_Order',
        id: orderData.message.id,
        order_id: orderData.message.order_id,
      },
    });
  }
  socketServices.on('Accept_To_Process_Order', data => {
    console.log("ACCEPT Calllllllllllllll : ", data);
    navigation.navigate(NavigationScreens.OrderProcessingScreenProfSideScreen, { data });
  });

  socketServices.on('Need_More_Time_To_Process_Order', data => {
    console.log("Need More Time Call : ", data);
    setApplySelected(data)
  });
  const styles = StyleSheet.create({
    container: {
      height: Screen_Height * 0.7,

    },
    mapStyle: {
      height: Screen_Height * 0.7
    },
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
    CardContainer: {
      elevation: 2,
      backgroundColor: COLOR.WHITE,
      borderRadius: 25,
      height: Screen_Height * 0.14,
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    CardImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    CardContain: {
      height: 90,
      width: 180,
      paddingVertical: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },

  });
  return (
    <>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.03, flexDirection: 'row', alignItems: 'center', gap: 15, paddingHorizontal: 10, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={28} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Time and Distance</Text>
      </View>

      <View style={styles.container}>
        {/* <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          initialRegion={{
            latitude: 19.0760,
            longitude: 72.8777,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}
        > */}
        {/* <Marker
            // coordinate={{
            //   latitude: data.location.coordinates[0],
            //   longitude: data.location.coordinates[1],
            // }}
            title={'Test Marker'}
            description={'This is a description of the marker'}
            // key={i}
          >
            <Entypo name="location-pin" size={50} color={COLOR.ORANGECOLOR} />
          </Marker> */}
        {/* </MapView> */}
        <LiveTrackingMap
          mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
          onLocationChange={(data) => {
            const id = orderData.sender;
            socketServices.emit('order_update', {
              recipient: id,
              message: {
                type: 'Location_ChangeSP',
                id: orderData.message.id,
                order_id: orderData.message.order_id,
                data,
              },
            });
          }}
          socketType={'Location_ChangeCLI'}
          staticCoordinate={orderData?.message?.coordinates}
        />
      </View>

      <View style={{ width: Screen_Width, height: Screen_Height * 0.15, justifyContent: 'space-around', alignItems: 'center', position: 'absolute', bottom: Screen_Height * 0.23, paddingHorizontal: 15 }}>
        <View style={{ backgroundColor: COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.45, height: 80, padding: 20, borderTopLeftRadius: 15 }}>
              <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>YOU</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>28 min</Text>
                <AntDesign name="close" size={20} color={COLOR.WHITE} />
                <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>11.8 min</Text>
              </View>
            </View>
            <View style={{ backgroundColor: COLOR.ChartBlue, width: Screen_Width * 0.45, height: 80, padding: 20, borderTopRightRadius: 15 }}>
              <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>Client</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>28 min</Text>
                <AntDesign name="close" size={20} color={COLOR.WHITE} />
                <Text style={{ color: COLOR.WHITE, fontSize: 16 }}>10.7 min</Text>
              </View>
            </View>
          </View>
          <Text style={{ color: COLOR.WHITE, fontSize: 20, fontWeight: '600', marginVertical: 15 }}>You meetup at in at most 33 min</Text>

        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: Screen_Width, position: 'absolute', bottom: Screen_Height * 0.11 }}>
        <TouchableOpacity onPress={onRequestToStartOrder} style={{ width: Screen_Width * 0.9, justifyContent: 'center', alignItems: 'center', height: 50, backgroundColor: COLOR.ChartBlue, marginVertical: 5, borderRadius: 15 }}>
          <Text style={{ color: COLOR.WHITE, fontWeight: 'bold', fontSize: 18 }}>{applySelected ? "user need 5 more min" : "Request to Start order"}</Text>
        </TouchableOpacity>
      </View>

    </>
  )

}

export default LiveTrackingProfSide

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