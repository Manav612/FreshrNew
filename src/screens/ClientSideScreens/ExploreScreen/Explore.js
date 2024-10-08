import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import Tooltip from 'react-native-walkthrough-tooltip';

import {
  barber,
  BothOrange,
  BothWhite,
  ComeToYouOrange,
  ComeToYouWhite,
  femaleOrange,
  femaleWhite,
  Filter,
  FilterBlack,
  FilterWhite,
  HomeIcon2,
  HouseOrange,
  InSalonOrange,
  InSalonWhite,
  maleOrange,
  maleWhite,
} from '../../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { NavigationScreens } from '../../../constants/Strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Explore = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
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
  const navigation = useNavigation();
  const [resetSelected, setResetSelected] = useState(false);
  const [applySelected, setApplySelected] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [bookmarkStatusSalon, setBookmarkStatusSalon] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [MarkerDataFordelivery, setMarkerDataFordelivery] = useState([]);
  const [MarkerDataForSalon, setMarkerDataForSalon] = useState([]);
  const [distance, setDistance] = useState(50);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState();
  const [activeTab1, setActiveTab1] = useState('Both');
  const [showTip, setShowTip] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };
  useEffect(() => {
    checkLocationPermission();
  }, []);
  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    });
  }, []);

  const checkLocationPermission = async () => {
    const permissionStatus = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
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
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        fetchDataForDelivery(
          position.coords.latitude,
          position.coords.longitude,
        );
        fetchDataForSalon(position.coords.latitude, position.coords.longitude);
      },
      error => {
        console.error('Error:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const toggleBookmarkSalon = async (itemId) => {
    try {
      await AddFavDataForSalon(itemId);
      setBookmarkStatusSalon(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
      }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Optionally, show an error message to the user
    }
  };


  const AddFavDataForSalon = async (itemId) => {
    try {
      // console.log("==========>", itemId);
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }

      };
      const res = await axios.post(`${BASE_API_URL}/users/favorites`, { facility: itemId }, config);
      console.log("================= add fav data ======================", res.data);
      console.log("Response data:", res.status);

      // Check if the request was successful
      // if (res.data.status === "success") {
      //   Alert.alert("success", res.data.message)

      // } else {
      //   Alert.alert(res.data.message)
      // }
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  const fetchDataForDelivery = async (lat, lng) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('AuthToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${BASE_API_URL}/services/services-within/1000/center/${lat},${lng}/unit/mi/all/all/all/all/1/1000/`,
        config,
      );
      console.log(
        '========    delivery  ============',
        res.data.data.professionals,
      );
      setMarkerDataFordelivery(res.data.data.professionals);
    } catch (error) {
      console.error('Error fetching delivery data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDataForSalon = async (lat, lng) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('AuthToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.get(
        `${BASE_API_URL}/services/services-within/1000/center/${lng},${lat}/unit/mi/all/all/all/all/1/1000/all`,
        config,
      );

      console.log(
        '============    salon     ======.........',
        res.data.data.facilities,
      );
      setMarkerDataForSalon(res.data.data.facilities);
    } catch (error) {
      console.error('Error fetching salon data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleBookmark = async (itemId) => {
    try {
      await AddFavData(itemId);
      setBookmarkStatus(prevState => ({
        ...prevState,
        [itemId]: !prevState[itemId]
      }));
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      // Optionally, show an error message to the user
    }
  };

  const AddFavData = async (itemId) => {
    try {
      // console.log("==========>", authToken);
      const config = {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }

      };
      const res = await axios.post(`${BASE_API_URL}/users/favorites`, { professional: itemId }, config);
      console.log("================= add fav data ======================", res.data.data);
      console.log("Response data:", res.status);

      // Check if the request was successful
      // if (res.data.status === "success") {
      //   Alert.alert("success", res.data.message)

      // } else {
      //   Alert.alert(res.data.message)
      // }
      return res.data; // Return the response data
    } catch (error) {
      console.error("Error:", error);
      throw error; // Rethrow the error to handle it in the calling function
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
          {item.text.length > 10
            ? item.text.substring(0, 10) + '...'
            : item.text}
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
      flex: 1,
    },
    mapStyle: {
      width: '100%',
      height: '100%',
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
      <View
        style={{
          width: Screen_Width,
          paddingHorizontal: 15,
          position: 'absolute',
          top: Screen_Height * 0.01,
          zIndex: 100,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.WHITE,
            marginHorizontal: 2,
            marginVertical: 10,
            marginBottom: 5,
            padding: 10,
            elevation: 10,
            shadowColor: COLOR.ChartBlue,
            borderRadius: 15,
          }}>
          <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>
            Delivery Options
          </Text>
          <View style={{ position: 'absolute', right: 5, top: 5 }}>
            <Tooltip

              isVisible={showTip}
              content={
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ color: COLOR.BLACK, fontSize: 18, textAlign: 'center', fontWeight: '600', marginVertical: 5 }}>
                    Welcome to your delivery options.

                  </Text>

                  <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                    {<Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>Comes to You : </Text>}

                    Enjoy professional services delivered right to your location.

                  </Text>
                  <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                    {<Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>In-Saloon : </Text>}
                    Prefer a traditional experience? Meet-up with your selected professional at a nearby shop or salon.

                  </Text>
                  <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                    {<Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>Schedule Appointment : </Text>}

                    Book an appointment for a specific day and time.
                  </Text>




                </View>
              }
              placement="bottom"
              onClose={() => setShowTip(false)}

            >
              <Animated.View style={animatedStyle}>
                <AntDesign
                  onPress={() => setShowTip(true)}
                  name="infocirlce"
                  size={18}
                  color={COLOR.ChartBlue}
                />
              </Animated.View>
            </Tooltip>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              gap: 30,
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                width: Screen_Width * 0.35,
                flexDirection: 'row',
                gap: 5,
                height: 30,
                backgroundColor:
                  activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLOR.ORANGECOLOR,
              }}
              onPress={() => {
                setActiveTab('Delivery');
              }}>
              <FastImage
                source={
                  activeTab === 'Delivery' ? ComeToYouWhite : ComeToYouOrange
                }
                resizeMode="contain"
                style={{ height: 18, width: 18 }}
              />
              <Text
                style={{
                  color:
                    activeTab === 'Delivery' && COLOR
                      ? COLOR.WHITE
                      : COLOR.ORANGECOLOR,
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Comes to you
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: Screen_Width * 0.35,
                flexDirection: 'row',
                gap: 2,
                height: 30,
                backgroundColor:
                  activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: COLOR.ORANGECOLOR,
              }}
              onPress={() => {
                setActiveTab('Salon');
              }}>
              <FastImage
                source={
                  activeTab === 'Salon' && COLOR ? HomeIcon2 : HouseOrange
                }
                style={{ height: 20, width: 20 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  color:
                    activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR,
                  fontWeight: '600',
                  fontSize: 12,
                }}>
                Meet In Store
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationScreens.ScheduledeliveryScreen)
            }
            style={{
              height: 40,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLOR.WHITE,
              borderRadius: 10,
              paddingHorizontal: 10,
              width: Screen_Width * 0.7,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: COLOR.BLACK,
                  fontWeight: 'bold',
                }}>
                Schedule Appointment
              </Text>
              <AntDesign name="calendar" size={24} color={COLOR.ORANGECOLOR} />
            </View>
            <AntDesign name="plus" size={24} color={COLOR.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openBottomSheet2}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: COLOR.WHITE,
            }}>
            <FastImage
              source={theme == 1 ? FilterWhite : FilterBlack}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={position}
          showsUserLocation={false}
          showsMyLocationButton={false}
          followsUserLocation={true}
          showsCompass={false}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          customMapStyle={mapStyle}
          toolbarEnabled={false}
          liteMode={false}>
          {activeTab === 'Delivery' &&
            MarkerDataFordelivery.map((data, i) => (
              <>
                <Marker
                  coordinate={{
                    latitude: data.location.coordinates[0],
                    longitude: data.location.coordinates[1],
                  }}
                  title={'Queue'}
                  description={'This is a description of the marker'}
                  key={i}>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: COLOR.BLACK,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 5,
                      }}>
                      <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>
                        {' '}
                        {MarkerDataFordelivery.length === 0
                          ? 'Empty Queue'
                          : '1 Queue'}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: COLOR.WHITE,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                      }}>
                      <FastImage
                        style={{ height: 20, width: 20 }}
                        source={ComeToYouOrange}
                      />
                    </View>
                  </View>
                </Marker>
              </>
            ))}

          {activeTab === 'Salon' &&
            MarkerDataForSalon.map((data, i) => (
              <Marker
                coordinate={{
                  latitude: data.location.coordinates[0],
                  longitude: data.location.coordinates[1],
                }}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                key={i}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: COLOR.BLACK,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 5,
                    }}>
                    <Text style={{ color: COLOR.WHITE, fontSize: 12 }}>
                      {MarkerDataForSalon.length === 0 ? '0 Seats' : '10 Seats'}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: COLOR.WHITE,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 20,
                    }}>
                    <Entypo name="home" size={25} color={COLOR.ORANGECOLOR} />
                  </View>
                </View>
              </Marker>
            ))}
        </MapView>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 100,
          paddingHorizontal: 5,
          zIndex: 100,
        }}>
        {activeTab === 'Delivery' ? (
          <FlatList
            data={MarkerDataFordelivery}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    backgroundColor: COLOR.WHITE,
                    height: Screen_Height * 0.1,
                    width: Screen_Width * 0.6,
                    borderRadius: 15,
                    shadowColor: COLOR.ChartBlue,
                    elevation: 3,
                    marginHorizontal: 3,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        NavigationScreens.ProfessionalInfoScreen,
                        { ProfDetail: item },
                      )
                    }
                    style={{
                      marginHorizontal: 5,
                      gap: 10,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={barber}
                      style={{
                        width: Screen_Width * 0.2,
                        height: Screen_Height * 0.08,
                        borderRadius: 10,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 5,
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: Screen_Width * 0.25,
                        }}>
                        <View>
                          <Text
                            style={{
                              color: COLOR.BLACK,
                              fontSize: 16,
                              fontWeight: '600',
                              marginBottom: 2,
                            }}
                            numberOfLines={1}>

                            {item?.user?.firstName} {item?.user?.lastName}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              borderRadius: 10,
                              color: COLOR.WHITE,
                            }}>
                            <FontAwesome
                              name="star-half-empty"
                              size={16}
                              color={COLOR.ORANGECOLOR}
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                color: COLOR.ORANGECOLOR,
                                fontSize: 12,
                              }}>
                              4.8 (3,456)
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: COLOR.BLACK,
                          borderRadius: 10,
                          color: COLOR.WHITE,
                          width: Screen_Width * 0.2,
                          height: 20,
                        }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>
                          {item?.distance}km
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => toggleBookmark(item._id)} style={{}}>

                      <MaterialCommunityIcons
                        name={bookmarkStatus[item._id] ? "bookmark" : "bookmark-outline"}
                        size={25}
                        color={COLOR.ChartBlue}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : (
          <FlatList
            data={MarkerDataForSalon}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    backgroundColor: COLOR.WHITE,
                    height: Screen_Height * 0.1,
                    width: Screen_Width * 0.6,
                    borderRadius: 15,
                    shadowColor: COLOR.ChartBlue,
                    elevation: 3,
                    marginHorizontal: 3,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        NavigationScreens.SalonProffListScreen,
                        { FacilityDetail: item },
                      )
                    }
                    style={{
                      marginHorizontal: 5,
                      flexDirection: 'row',
                      gap: 10,
                    }}>
                    <Image
                      source={{ uri: item.coverImage }}
                      style={{
                        width: Screen_Width * 0.2,
                        height: Screen_Height * 0.08,
                        borderRadius: 10,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 5,
                        width: Screen_Width * 0.35,
                      }}>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: Screen_Width * 0.35,
                        }}>
                        <View>
                          <Text
                            style={{
                              color: COLOR.BLACK,
                              fontSize: 16,
                              fontWeight: '600',
                              width: 90,
                            }}
                            numberOfLines={1}>
                            {item?.name}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              borderRadius: 10,
                              color: COLOR.WHITE,
                            }}>
                            <FontAwesome
                              name="star-half-empty"
                              size={16}
                              color={COLOR.ORANGECOLOR}
                            />
                            <Text
                              style={{
                                marginLeft: 5,
                                color: COLOR.ORANGECOLOR,
                                fontSize: 12,
                              }}>
                              4.8 (3,456)
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity onPress={() => toggleBookmarkSalon(item._id)} style={{ bottom: 5 }}>

                          <MaterialCommunityIcons
                            name={bookmarkStatusSalon[item._id] ? "bookmark" : "bookmark-outline"}
                            size={25}
                            color={COLOR.ChartBlue}
                          />
                        </TouchableOpacity>

                      </View>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLOR.BLACK,
                            borderRadius: 10,
                            color: COLOR.WHITE,
                            width: Screen_Width * 0.2,
                            padding: 6
                          }}>
                          <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>
                            20km
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: COLOR.ORANGECOLOR,
                            padding: 5,
                            borderRadius: 5,
                            borderBottomRightRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            gap: 5,
                          }}>
                          <FontAwesome5
                            name="chair"
                            size={14}
                            color={COLOR.WHITE}
                          />
                          <Text style={{ color: COLOR.WHITE }} numberOfLines={1}>
                            15
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
      <View style={{}}>
        <RBSheet
          ref={ref => (refRBSheet.current[0] = ref)}
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  width: 30,
                  height: 3,
                  backgroundColor: COLOR.BLACK,
                  marginBottom: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: Screen_Width * 0.9,
                }}>
                <View style={{ width: 30 }} />
                <Text
                  style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>
                  Filter
                </Text>
                <TouchableOpacity onPress={() => refRBSheet.current[0].close()}>
                  <AntDesign name="closecircle" size={24} color={COLOR.BLACK} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLOR.LINECOLOR,
                width: Screen_Width,
                height: 2,
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
            />

            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: COLOR.BLACK,
                  fontSize: 18,
                  marginVertical: 5,
                }}>
                Styles
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  gap: 10,
                  marginVertical: 5,
                }}>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor:
                      activeTab1 === 'Masculine'
                        ? COLOR.ORANGECOLOR
                        : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                  }}
                  onPress={() => setActiveTab1('Masculine')}>
                  <FastImage
                    source={activeTab1 === 'Masculine' ? maleWhite : maleOrange}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color:
                        activeTab1 === 'Masculine'
                          ? COLOR.WHITE
                          : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    Masculine
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor:
                      activeTab1 === 'Both' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                  }}
                  onPress={() => setActiveTab1('Both')}>
                  <FastImage
                    source={activeTab1 === 'Both' ? BothWhite : BothOrange}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />

                  <Text
                    style={{
                      color:
                        activeTab1 === 'Both' ? COLOR.WHITE : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    Both
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 110,
                    height: 40,
                    backgroundColor:
                      activeTab1 === 'Feminine'
                        ? COLOR.ORANGECOLOR
                        : COLOR.GULABI,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 5,
                    borderWidth: 1,
                    borderColor: COLOR.ORANGECOLOR,
                  }}
                  onPress={() => setActiveTab1('Feminine')}>
                  <FastImage
                    source={
                      activeTab1 === 'Feminine' ? femaleWhite : femaleOrange
                    }
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color:
                        activeTab1 === 'Feminine'
                          ? COLOR.WHITE
                          : COLOR.ORANGECOLOR,
                      fontWeight: '600',
                    }}>
                    Feminine
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text
                style={{ fontWeight: '700', color: COLOR.BLACK, fontSize: 18 }}>
                Rating
              </Text>
              <FlatList
                data={data3}
                keyExtractor={item => item.id}
                renderItem={Rating}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
              <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>
                Distance: {distance} km
              </Text>
              <Slider
                style={{ width: '100%', marginTop: 10 }}
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#000"
                maximumTrackTintColor="#000"
                thumbTintColor="#000"
                value={distance}
                onValueChange={value => setDistance(value)}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                gap: 30,
                marginVertical: 5,
              }}>
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor:
                    activeTab === 'Reset' ? COLOR.ORANGECOLOR : COLOR.GULABI,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLOR.ORANGECOLOR,
                }}
                onPress={() => {
                  setActiveTab('Reset');
                }}>
                <Text
                  style={{
                    color:
                      activeTab === 'Reset' ? COLOR.WHITE : COLOR.ORANGECOLOR,
                    fontWeight: '600',
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 150,
                  height: 50,
                  backgroundColor:
                    activeTab === 'Apply Filter'
                      ? COLOR.ORANGECOLOR
                      : COLOR.GULABI,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: COLOR.ORANGECOLOR,
                }}
                onPress={() => {
                  setActiveTab('Apply Filter');
                }}>
                <Text
                  style={{
                    color:
                      activeTab === 'Apply Filter'
                        ? COLOR.WHITE
                        : COLOR.ORANGECOLOR,
                    fontWeight: '600',
                  }}>
                  Apply Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </>
  );
};

export default Explore;
