import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';
import MapView, { Marker } from 'react-native-maps';
import { data, data3, data4 } from '../../../components/utils';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { ComeToYouOrange, ComeToYouWhite, Filter, FilterBlack, FilterWhite, InSalonOrange, InSalonWhite } from '../../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';


const Explore = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
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
  const [activeTab1, setActiveTab1] = useState('Both');

  useEffect(() => {
    checkLocationPermission();
  }, []);
  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    })
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
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`, config);
      console.log('========    delivery  ============', res.data.data.professionals);
      setMarkerDataFordelivery(res.data.data.professionals);
    } catch (error) {
      console.error("Error fetching delivery data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchDataForSalon = async (lat, lng) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/male`, config);
      console.log('============    salon     ======.........', res.data.data.facilities);
      setMarkerDataForSalon(res.data.data.facilities);
    } catch (error) {
      console.error("Error fetching salon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeliverySide = () => {
    if (latitude && longitude) {
      fetchDataForDelivery(latitude, longitude);
    }
    setActiveTab('Delivery');
  };
  
  const handleSalonSide = () => {
    if (latitude && longitude) {
      fetchDataForSalon(latitude, longitude);
    }
    setActiveTab('Salon');
  };

  const openBottomSheet2 = () => {
    refRBSheet.current[0].open();
  };
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
  const styles = StyleSheet.create({
    container: {
      height:Screen_Height*0.84

    },
    mapStyle: {
       height:Screen_Height*0.84
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
      <View style={{width:Screen_Width,paddingHorizontal:15,position:'absolute',top:Screen_Height*0.01,zIndex:100}}>

      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginHorizontal:2,marginVertical:10, marginBottom: 5, padding: 10, elevation: 10, shadowColor: COLOR.ChartBlue,borderRadius:15 }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>Delivery Options</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: Screen_Width * 0.35,flexDirection:'row',gap:5, height: 30, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
          <FastImage source={activeTab === 'Delivery'?ComeToYouWhite:ComeToYouOrange} resizeMode='contain' style={{height:18,width:18}}/>
            <Text style={{ color: activeTab === 'Delivery' && COLOR ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600',fontSize:12 }}>Comes to you</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: Screen_Width * 0.35,flexDirection:'row',gap:10, height: 30, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
          <FastImage source={activeTab === 'Salon' && COLOR ?InSalonWhite:InSalonOrange} style={{height:20,width:20}} resizeMode='contain'/>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600',fontSize:12 }}>In Salon</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:5}}>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.ScheduledeliveryScreen)}
        style={{
          height: 40,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:COLOR.WHITE,
          borderRadius:10,
          paddingHorizontal:10,
          width:Screen_Width*0.7
        }}
      >
       <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:10}}>
       <Text style={{ textAlign: 'center', fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold' }}>
          Schedule Appointment
        </Text>
        <AntDesign name="calendar" size={24} color={COLOR.ORANGECOLOR} />
       </View>
        {/* <View style={{height:30,width:30,borderRadius:3,backgroundColor:COLOR.WHITE,elevation:10,shadowColor:COLOR.ChartBlue,justifyContent:'center',alignItems:'center'}}> */}

        <AntDesign name="plus" size={24} color={COLOR.BLACK}  />
        
        {/* </View> */}

      </TouchableOpacity>
      <TouchableOpacity onPress={openBottomSheet2} style={{width:40,height:40,justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:COLOR.WHITE}}>
            <FastImage source={theme == 1?FilterWhite:FilterBlack } style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
      </View>
      

      {/* <View style={{  borderRadius: 15, justifyContent: 'center', alignSelf: 'center', backgroundColor: COLOR.WHITE,marginBottom:10 }}>
        <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.9,marginHorizontal:10, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <AntDesign name="search1" size={30} color={COLOR.GRAY} />
            <TextInput
              placeholder='Search'
              placeholderTextColor={COLOR.GRAY}
              style={{ fontSize: 20, color: COLOR.BLACK, width: 200 }}
            // onChangeText={text => {
            //     setSearchText(text);
            //     handleSearch();
            // }}
            />
          </View>
          <TouchableOpacity onPress={openBottomSheet2}>
            <FastImage source={Filter} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>
        </View>
      </View> */}
      </View>
      
      <View style={styles.container}>
      
        <MapView
          style={styles.mapStyle}
          initialRegion={position}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
          
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          // initialRegion={{
          //   latitude: 19.0760,
          //   longitude: 72.8777,
          //   latitudeDelta: 0.0922,
          //   longitudeDelta: 0.0421,
          // }}
          customMapStyle={mapStyle}
        >
         
             {activeTab === 'Delivery' && MarkerDataFordelivery.map((data, i) => (
              <Marker
                coordinate={{
                  latitude: data.location.coordinates[0],
                  longitude: data.location.coordinates[1],
                }}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                key={i}
              >
                <View style={{height:40,width:40,backgroundColor:COLOR.WHITE,justifyContent:'center',alignItems:'center',borderRadius:50}}>
                <Entypo name="home" size={30} color={COLOR.ORANGECOLOR} />
                </View>
              </Marker>
            ))}
            
            {activeTab === 'Salon' && MarkerDataForSalon.map((data, i) => (
              <Marker
                coordinate={{
                  latitude: data.location.coordinates[0],
                  longitude: data.location.coordinates[1],
                }}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                key={i}
              >
                <Entypo name="location-pin" size={50} color={COLOR.ORANGECOLOR} />
              </Marker>
            ))}
           
        </MapView>
      </View>

      <View style={{}}>

      <RBSheet
          ref={(ref) => (refRBSheet.current[0] = ref)}

          height={Screen_Height * 0.53}
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
              <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 20, marginVertical: 5 }}>
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
    </>
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