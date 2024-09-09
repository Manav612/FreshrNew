
import { ScrollView, StyleSheet, Text, View, FlatList, PermissionsAndroid, Image, TextInput, Modal, TouchableOpacity, RefreshControl, Dimensions, Platform, Animated } from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { SetAddress } from '../../../redux/AddressAction';
import { ComeToYou, ComeToYouOrange, ComeToYouWhite, Filter, FilterBlack, FilterBlue, FilterOrange, HomeIcon, HomeIcon2, houseFillOrange, HouseOrange, InSalon, InSalonOrange, InSalonWhite } from '../../../constants/Icons';
import FastImage from 'react-native-fast-image';
import { data3 } from '../../../components/utils';
import Slider from '@react-native-community/slider';
import Tooltip from 'react-native-walkthrough-tooltip';

const Home = () => {

  const navigation = useNavigation();
  const [user, setUser] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [fetchedData, setFetchedData] = useState('');
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const mapRef = useRef();
  const formattedAddress = useSelector(state => state.AddressReducer);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [activeTab, setActiveTab] = useState('Delivery');
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
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
      console.log('========  user ID   ==========', res.data.data.user.searchLocations[0].address)
      setUser(res.data.data.user);

      // Filter the addresses to include only those with isSelected: true
      // const selectedAddresses = res.data.data.user.searchLocations.filter(
      //   location => location.isSelected
      // );
      // console.log("=============  seleAddressss   ================",selectedAddresses);
      setAddress(res.data.data.user?.searchLocations[0]?.address);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserInfo().then(() => setRefreshing(false));
  }, []);

  const styles = StyleSheet.create({
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
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      height: Screen_Height * 0.3,
      width: Screen_Width * 0.8,
      backgroundColor: 'white',
      borderRadius: 20,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 25,
      textAlign: 'center',
      fontSize: 25,
      fontWeight: '900',
      color: 'black',
    },

  });

  const fullName = `${user?.firstName} ${user?.lastName}`.trim();
  const displayName = fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;

  useEffect(() => {
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
          // console.log(json.results[0]?.formatted_address);
          dispatch(SetAddress(json.results[0]?.formatted_address));
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log('Error retrieving address:', error);
    }
  };



  const refRBSheet = useRef([]);
  const openBottomSheet = () => {
    refRBSheet.current[0].open();
  };
  const [activeTab1, setActiveTab1] = useState('Both');
  const [distance, setDistance] = useState(50);
  const [selectedItem1, setSelectedItem1] = useState(null);
  const Rating = ({ item, index }) => (
    <TouchableOpacity
      key={item.id || index}  // Add this line
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

    >
      <View style={{ height: Screen_Height * 0.08, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
          <View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', width: Screen_Width * 0.4 }}>
              {/* <Entypo name="home" size={22} color={COLOR.ORANGECOLOR} /> */}
              {/* <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Hello, {displayName}</Text> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 5 }}>
              {/* <Entypo name="home" size={25} color={COLOR.ORANGECOLOR} /> */}
              <FastImage source={houseFillOrange} style={{ height: 25, width: 25 }} />
              <Text style={{ color: COLOR.BLACK, fontSize: 18, fontWeight: '500' }}>Office</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.AddAddressScreen)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
              <Text style={{ color: COLOR.BLACK, fontSize: 16, flex: 1 }} numberOfLines={1}>
                {address}
              </Text>

              <AntDesign name="down" size={14} color={COLOR.BLACK} />

            </TouchableOpacity>


          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', height: 50, marginHorizontal: 1 }}>
          <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.InboxScreen)} style={{ height: 40, width: 40, borderRadius: 3, backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} color={COLOR.BLACK} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openBottomSheet()} style={{ height: 40, width: 40, borderRadius: 3, backgroundColor: COLOR.WHITE, elevation: 5, shadowColor: COLOR.ChartBlue, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage source={FilterBlack} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginHorizontal: 2, marginBottom: 10, padding: 10, elevation: 3, shadowColor: COLOR.ChartBlue }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Delivery Options</Text>
        <View style={{ position: 'absolute', right: 5, top: 5 }}>
          <Tooltip

            isVisible={showTip}
            content={
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 18, textAlign: 'center', fontWeight: '600', marginVertical: 5 }}>
                  Welcome to your delivery options.

                </Text>

                <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                  {<Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>Comes to you : </Text>}

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
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: Screen_Width * 0.4, flexDirection: 'row', gap: 5, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <FastImage source={activeTab === 'Delivery' ? ComeToYouWhite : ComeToYouOrange} resizeMode='contain' style={{ height: 22, width: 22 }} />
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600', fontSize: 14 }}>Comes to you</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: Screen_Width * 0.4, flexDirection: 'row', gap: 5, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <FastImage source={activeTab === 'Salon' ? HomeIcon2 : HouseOrange} style={{ height: 25, width: 25 }} resizeMode='contain' />
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600', fontSize: 14 }}>Meet In Store</Text>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'Delivery' ? <Delivery /> : <Salon />
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Complete your kyc verification</Text>
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.ORANGECOLOR,
                width: Screen_Width * 0.5,
                borderRadius: 35,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={closeModal}>
              <Text style={{ color: COLOR.WHITE, fontSizeL: 16 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default Home;
