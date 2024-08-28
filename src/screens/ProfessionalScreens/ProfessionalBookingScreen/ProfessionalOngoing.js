import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert,
  TextInput,
  ScrollView,
  Modal
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Client, ClientBlack, ComeToYou, ComeToYouBlue, Hair1, HomeIcon2, OnBoard1 } from '../../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import FastImage from 'react-native-fast-image';
import socketServices from '../../../Services/Socket';
import { NavigationScreens } from '../../../constants/Strings';
import MapView, { Marker } from 'react-native-maps';
import ActiveLine from '../../../components/Story/Story/ActiveLine';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LiveTrackingMap from '../../../components/LiveTrackingMap';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigationToReset } from '../../../constants/NavigationController';

const ProfessionalOngoing = ({
  FetchedData,
  setFetchedData,
  orderData
}) => {
  console.log('----------------------   Ongo  proffff ------------->', JSON.stringify(FetchedData));

  const theme = useSelector(state => state.ThemeReducer);

  const navigation = useNavigation();
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [refreshing, setRefreshing] = useState(false);
  const [orderId, setOrderId] = useState('')
  const [hide, setHide] = useState(true)
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [endReq, setEndReq] = useState(false)
  const [btnVisible, setBtnVisibility] = useState(false);
  const [directionModalVisible, setDirectionModalVisibility] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [Prof_distance, setProf_distance] = useState('')
  const [Prof_duration, setProf_duration] = useState('')
  const [Client_distance, setClient_distance] = useState('')
  const [Client_duration, setClient_duration] = useState('')
  const [timeLeft, setTimeLeft] = useState(1 * 60); // 1 minute in seconds
  const authToken = useSelector(state => state.AuthReducer);
  const refRBSheet = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [GetOneOrder, setGetOneOrder] = useState('')
  const [rating, setRating] = useState(4);
  const [name, setName] = useState('');
  const handleNameChange = (text) => {
    setName(text);
  };

  const openBottomSheet = () => {
    refRBSheet?.current?.open();
  };
  const closeBottomSheet = () => {
    refRBSheet?.current?.close();
  };


  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (timeLeft === 0) {
    closeBottomSheet()
  }

  const onRequestToEnd = () => {
    // Alert.alert('Request sent successfully to compelete the order !!!!')
    setModalVisible2(true)
    console.log("===========   endddddd orderr   hiiii =========");
    const id = orderData.sender;
    socketServices.emit('order_update', {
      recipient: id,
      message: {
        type: 'Request_To_End_Order',
        id: id,
        order_id: orderData.message.order_id,
      },
    });
  }

  socketServices.on('Accept_To_End_Order', data => {
    console.log("ACCEPT END ORDER Calllllllllllllll : ", data);
    console.log("asdas", timeLeft);
    setModalVisible(true);
  });

  socketServices.on('Unhappy_To_End_Order', data => {
    console.log("Unhappy to end order : ", data);
    setTimeLeft(1 * 60)
    openBottomSheet()
  });

  socketServices.on('End_Order', data => {
    console.log("Order ended: ", data);
    setModalVisible(true);
  });

  const HandleReview = () => {
    // Implement your review submission logic here
    console.log("Submitting review:", { rating, review: name });
    // After submitting the review, navigate to the appropriate screen
    navigationToReset(navigation, NavigationScreens.ProfessionalBottomTab);
  }
  // console.log("------------------------------------>>>>>", JSON.stringify(orderData));

  useEffect(() => {
    fetchData();
    console.log("Callllllllllll;;;;;;;;;;;;;;;;;")

  }, []);

  const services2 = [
    { name: 'Wings', price: 28.57 },
    { name: 'Wings', price: 28.57 },
    { name: 'Wings', price: 28.57 },
  ];
  const toggleDropdown = ({ services2 }) => {
    setIsOpen(!isOpen);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);


  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const ongoingRes = await axios.get(
        `${BASE_API_URL}/professionals/professional/orders/ONGOING`,
        config,
      );
      const inTrafficRes = await axios.get(
        `${BASE_API_URL}/professionals/professional/orders/IN_TRAFFIC`,
        config,
      );

      const combinedData = [
        ...ongoingRes.data.data.orders,
        ...inTrafficRes.data.data.orders,
      ];

      // console.log('==========   order  List  ongoing   ===========', JSON.stringify(combinedData))
      setFetchedData(combinedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  socketServices.on('Accept_To_Process_Order', data => {
    console.log("=============== Accept_To_Process_Order ===============", data);
    setEndReq(true)
  });
  console.log(btnVisible);
  const handleRequest = () => {
    // Alert.alert('Request sent successfully to start order !!!!!')
    setModalVisible3(true)
    socketServices.emit('order_update', {
      recipient: orderData.sender,
      message: {
        type: 'Request_To_Start_Order',
        id: orderData.id,
        order_id: orderData.order_id,
      },
    });
  }


  const styles = StyleSheet.create({
    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      // backgroundColor: COLOR.ROYALBLUE,

    },
    Container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 5,
    },
    ContentContainer: {
      // padding: 10,
      paddingTop: btnVisible ? 60 : null
    },
    IdContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    IdText: {
      fontSize: 13,
      color: '#000',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    IdCopyButton: {
      height: 30,
      aspectRatio: 1 / 1,
      borderWidth: 1,
      borderColor: '#717273',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    InnerContainer: {
      width: '100%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#e1e1e1',
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowOpacity: 0.1,
      shadowOffset: { height: 2 },
      shadowRadius: 2,
    },
    MapContainer: {
      width: '100%',
      aspectRatio: 1 / 1.1,
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 15,
    },
    DateTimeContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
    },
    BlackContainer: {
      backgroundColor: COLOR.ORANGECOLOR,
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 7,
      alignItems: 'center',
      height: 35,
      shadowOpacity: 0.1,
      shadowOffset: { height: 1 },
      shadowRadius: 1,
    },
    WhiteText: {
      color: '#FFF',
      fontSize: 13,
      fontWeight: '600',
    },
    UserDetailsContainer: {
      padding: 7,
      borderRadius: 7,
      marginTop: 7,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#f1f2f3',
      backgroundColor: '#fff',
      shadowOpacity: 0.1,
      shadowOffset: { height: 1 },
      shadowRadius: 1,
      marginBottom: 5,
    },
    UserImage: {
      width: 50,
      height: 50,
      aspectRatio: 1 / 1,
      borderRadius: 7,
    },
    UserName: {
      flex: 1,
      marginLeft: 10,
      fontSize: 13,
      color: '#000',
      fontWeight: '600',
    },
    ViewWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000050',
      paddingBottom: '30%',
    },
    ModalContainer: {
      width: '85%',
      borderRadius: 15,
      padding: 30,
      backgroundColor: '#fff',
      elevation: 5,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      alignItems: 'center',
    },
    LabelText: {
      fontSize: 16,
      color: COLOR.BLACK,
      textAlign: 'center',
      fontWeight: '600',
    },
    DescText: {
      fontSize: 14,
      color: '#929292',
      marginTop: 15,
    },
    DistenceContainer: {
      borderColor: 'grey',
      borderTopWidth: 1,
      flex: 1,
      padding: 10,
      bottom: -34,
    },

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.BLACK_40,
    },
    modalContent: {
      width: Screen_Width * 0.8,
      backgroundColor: COLOR.WHITE,
      height: Screen_Height * 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 10,
      color: COLOR.BLACK
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      // width: Screen_Width,
      // position: 'absolute',
      // bottom: 10
    },
    button: {
      width: Screen_Width * 0.6,
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      backgroundColor: COLOR.ChartBlue,
      marginVertical: 5,
      borderRadius: 25,
      flexDirection: 'row',
    },
    buttonText: {
      color: COLOR.WHITE,
      fontWeight: 'bold',
      fontSize: 14,
    },

    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: Screen_Width * 0.8,
    },
    iconContainer: {
      backgroundColor: COLOR.ORANGECOLOR,
      borderRadius: 30,
      padding: 15,
      marginBottom: 15,
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    modalSubtitle: {
      marginBottom: 15,
      textAlign: 'center',
      color: COLOR.GRAY,
    },
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: COLOR.BLACK,
      paddingVertical: 10
    },
    writeReviewButton: {
      backgroundColor: COLOR.ORANGECOLOR,
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      width: Screen_Width * 0.6,
      marginBottom: 10,
    },
    writeReviewText: {
      color: COLOR.WHITE,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelButton: {
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      padding: 15,
      elevation: 2,
      width: Screen_Width * 0.6,
    },
    cancelText: {
      color: COLOR.ORANGECOLOR,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    bottomSheetContainer: {
      paddingHorizontal: 15,
      marginVertical: 10
    },
    bottomSheetTitle: {
      width: Screen_Width * 0.91,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    bottomSheetTitleText: {
      color: COLOR.BLACK,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    buttonText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLOR.WHITE
    }

  });

  console.log(orderData?.message?.coordinates);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: COLOR.WHITE }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15, flex: 1 }}
        scrollEnabled={false}
        data={FetchedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.Container}>
              <ScrollView
                style={styles.Container}
                contentContainerStyle={[
                  styles.ContentContainer,
                  // height > 0 && { paddingTop: height / 2 },
                ]}
                showsVerticalScrollIndicator={false}>

                <View style={styles.InnerContainer}>
                  {btnVisible &&
                    <View
                      style={[
                        {
                          elevation: 5,
                          shadowColor: COLOR.ChartBlue,
                          shadowOpacity: 1,
                          borderRadius: 15,
                          padding: 10,
                          shadowOpacity: 0.1,
                          shadowOffset: { height: 1 },
                          shadowRadius: 1,
                          backgroundColor: '#fff',
                          position: 'absolute',
                          zIndex: 100,
                          width: '100%',
                          alignSelf: 'center',
                        },
                        height > 0 && { top: -height / 2 },
                      ]}
                      onLayout={layout => {
                        setHeight(layout.nativeEvent.layout.height);
                      }}>
                      {endReq ?
                        <View style={styles.buttonContainer}>
                          <Text style={{ fontSize: 18, color: COLOR.BLACK, fontWeight: "600", }}>Request order completion</Text>
                          <TouchableOpacity onPress={onRequestToEnd} style={styles.button}>
                            <Text style={styles.buttonText}>Send request</Text>
                          </TouchableOpacity>

                        </View>
                        :

                        (
                          btnVisible &&

                          <View style={styles.buttonContainer}>
                            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: '600', color: COLOR.BLACK }}>Send request to start order</Text>
                            <TouchableOpacity
                              onPress={handleRequest}
                              style={styles.button}
                            >
                              <Text style={styles.buttonText}>
                                Request to Start order
                              </Text>

                            </TouchableOpacity>
                          </View>

                        )

                      }
                    </View>
                  }
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      top: btnVisible ? 40 : null,
                      zIndex: 1000,
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.IdText}>ID : {orderId}</Text>
                    <Text style={[styles.UserName, { textAlign: 'right' }]}>
                      {item?.createdAt}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.MapContainer,
                      height > 0 && { marginTop: height / 1.8 },
                    ]}>
                    <LiveTrackingMap
                      mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
                      onLocationChange={(data) => {
                        // console.log("Sender : ", JSON.stringify(orderData));
                        setOrderId(orderData.message.order_id)
                        socketServices.emit('order_update', {
                          recipient: orderData.sender,
                          message: {
                            type: 'Location_ChangeSP',
                            id: orderData.id,
                            order_id: orderData.order_id,
                            data,
                          },
                        });
                      }}
                      socketType={'Location_ChangeCLI'}
                      staticCoordinate={orderData?.message?.coordinates}
                      isPro
                      setVisible={setBtnVisibility}
                      Prof_distance={setProf_distance}
                      Prof_duration={setProf_duration}
                      Client_distance={setClient_distance}
                      Client_duration={setClient_duration}
                    />

                    <View
                      style={[
                        styles.BlackContainer,
                        {
                          height: 30,
                          position: 'absolute',

                          borderRadius: 0,
                          borderBottomRightRadius: 7,
                          zIndex: 100,
                          backgroundColor: COLOR.BLACK,
                        },
                      ]}>
                      <Text style={[styles.WhiteText, { fontSize: 10 }]}>3 in Queue</Text>
                    </View>
                    <View
                      style={[
                        styles.BlackContainer,
                        {
                          height: 30,
                          position: 'absolute',
                          alignSelf: 'center',
                          flexDirection: 'row',
                          gap: 5,
                          // top: 40,
                          // borderRadius: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          // borderBottomRightRadius: 7,
                          zIndex: 100,
                          backgroundColor: COLOR.ChartBlue,
                        },
                      ]}>
                      {/* <Image source={ComeToYouWhite} style={{ height: 15, width: 15 }} /> */}
                      <Image source={HomeIcon2} style={{ height: 15, width: 15 }} />
                      {/* <Text style={[styles.WhiteText, { fontSize: 10 }]}>Go to client</Text> */}
                      <Text style={[styles.WhiteText, { fontSize: 10 }]}>Meet in Salon</Text>
                    </View>
                    <View
                      style={[
                        styles.BlackContainer,
                        {
                          height: 30,
                          position: 'absolute',
                          //   top: 20,
                          borderRadius: 0,
                          borderBottomLeftRadius: 7,
                          zIndex: 100,
                          right: 0,
                          backgroundColor: COLOR.BLACK,
                        },
                      ]}>
                      <Text style={[styles.WhiteText, { fontSize: 10 }]}>{item?.status}</Text>
                    </View>
                    <View
                      style={{
                        width: '96%',
                        flex: 1,
                        borderRadius: 7,
                        position: 'absolute',
                        bottom: 5,
                        marginHorizontal: 5,
                      }}>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          flex: 1,
                          elevation: 2,
                          borderRadius: 7,
                          borderWidth: 1,
                          borderColor: '#f1f1f1',
                          paddingBottom: 34,
                          marginTop: 15,
                          flexDirection: 'row',
                          shadowOpacity: 0.2,
                          shadowOffset: { height: 2 },
                          shadowRadius: 2,
                          position: 'absolute',
                          bottom: 0,
                          marginHorizontal: 5,
                        }}>
                        <View style={styles.DistenceContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                            }}>
                            <Image style={{ height: 20, width: 20 }} source={ComeToYouBlue} resizeMode='contain' />


                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 7, color: COLOR.ChartBlue }]}>
                              {item?.professional?.user?.firstName}{' '}{item?.professional?.user?.lastName}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <FontAwesome5
                              name="map-marker-alt"
                              color={'#000'}
                              size={15}
                            />
                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                              {parseFloat(Prof_distance).toFixed(2)}km
                            </Text>
                            <Entypo
                              name="cross"
                              color={'#000'}
                              size={15}
                              style={{
                                marginHorizontal: 2,
                              }}
                            />
                            <Feather name="clock" color={'#000'} size={15} />
                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                              {parseFloat(Prof_duration).toFixed(2)}min
                            </Text>
                          </View>
                        </View>

                        <View style={styles.DistenceContainer}>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                            }}>
                            <Image style={{ height: 20, width: 20 }} source={Client} resizeMode='contain' />

                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 7, color: COLOR.ORANGECOLOR }]}>
                              {item?.client?.firstName}{' '}{item?.client?.lastName}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              flex: 1,
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <FontAwesome5
                              name="map-marker-alt"
                              color={'#000'}
                              size={15}
                            />
                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                              {parseFloat(Client_distance).toFixed(2)}km
                            </Text>
                            <Entypo
                              name="cross"
                              color={'#000'}
                              size={15}
                              style={{
                                marginHorizontal: 2,
                              }}
                            />
                            <Feather name="clock" color={'#000'} size={15} />
                            <Text
                              style={[styles.LabelText, { fontSize: 13, marginLeft: 5 }]}>
                              {parseFloat(Client_duration).toFixed(2)}min
                            </Text>
                          </View>
                        </View>
                      </View>
                      <Text
                        style={[
                          styles.LabelText,
                          { fontSize: 20, paddingBottom: 70, textAlign: 'left', marginLeft: 20, color: COLOR.ORANGECOLOR },
                        ]}>
                        Meet-up in {parseFloat(Client_duration > Prof_duration ? Client_duration === 0 ? Client_duration : Client_duration + 5 : Prof_duration === 0 ? Prof_duration : Prof_duration + 5).toFixed(2)} min
                      </Text>

                      <View style={{ position: 'absolute', right: 43, top: -5, zIndex: 2, backgroundColor: 'red', height: 15, width: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: COLOR.WHITE, fontSize: 10 }}>1</Text>
                      </View>
                      <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.InboxScreen)} style={{ position: 'absolute', right: 45, top: -5 }}>
                        <Entypo name="message" color={COLOR.BLACK} size={34} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: COLOR.GRAY,
                      borderRadius: 15,
                      padding: 10,
                      marginVertical: 10,
                    }}>
                    <View
                      style={{
                        // borderWidth: 1,
                        width: isOpen ? null : Screen_Width * 0.6,
                        borderColor: COLOR.GRAY,
                        borderRadius: 10,
                      }}>
                      <TouchableOpacity
                        onPress={toggleDropdown}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: 5,
                        }}>
                        {isOpen ? (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Image
                                source={{ uri: item?.services[0]?.photo }}

                                style={{ width: 50, height: 50, borderRadius: 5 }}
                              />
                              <Text
                                style={{
                                  color: COLOR.BLACK,
                                  fontSize: 18,
                                  fontWeight: '600',
                                }}>
                                Services ({item?.services?.length})
                              </Text>
                            </View>
                            <MaterialIcons
                              name={
                                isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
                              }
                              color={'#000'}
                              size={25}
                            />
                          </>
                        ) : (
                          <>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 10,
                              }}>
                              <Image
                                // source={{ uri: item?.services[0]?.photo }}
                                source={Hair1}
                                style={{ width: 50, height: 50, borderRadius: 5 }}
                              />
                              <View style={{}}>
                                <Text
                                  style={{
                                    color: COLOR.GRAY,
                                    fontSize: 14,
                                    fontWeight: '500',
                                  }}>
                                  Services ({item?.services?.length})
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    width: Screen_Width * 0.4,
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    borderColor: COLOR.LINECOLOR,
                                  }}>
                                  <Text
                                    style={{
                                      color: COLOR.BLACK,
                                      fontSize: 14,
                                    }}>
                                    {item?.services?.name}

                                  </Text>
                                  <MaterialIcons
                                    name={
                                      isOpen
                                        ? 'keyboard-arrow-up'
                                        : 'keyboard-arrow-down'
                                    }
                                    color={'#000'}
                                    size={25}
                                  />
                                </View>
                              </View>
                            </View>
                          </>
                        )}
                      </TouchableOpacity>
                      {isOpen && (
                        <View>
                          {item.services.map((service, index) => (
                            <View
                              key={index}
                              style={{
                                width: Screen_Width * 0.81,
                                borderRadius: 7,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#f1f2f3',
                                backgroundColor: '#fff',
                                shadowOpacity: 0.1,
                                shadowOffset: { height: 1 },
                                shadowRadius: 1,
                                marginBottom: 5,
                                padding: 5,
                              }}>
                              <Image
                                style={styles.UserImage}
                                source={{ uri: service.photo }}
                                resizeMode="cover"
                              />
                              <Text style={styles.UserName}>{service.name}</Text>
                              <View style={styles.BlackContainer}>
                                <Text style={styles.WhiteText}>
                                  ${service.price}
                                </Text>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>

                    {!isOpen && (
                      <View
                        style={{
                          backgroundColor: COLOR.ORANGECOLOR,
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 8,
                          borderRadius: 7,
                        }}>
                        <Text style={[styles.WhiteText, { height: 'auto' }]}>${item.price}</Text>
                      </View>
                    )}
                  </View>

                  {/* <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <FontAwesome5 name="user-circle" color={'#000'} size={20} />
                    <Text style={[styles.UserName, { marginLeft: 7 }]}>{item?.client?.firstName}{' '}{item?.client?.lastName}</Text>

                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Entypo name="scissors" color={'#000'} size={20} />
                    <Text style={[styles.UserName, { marginLeft: 7 }]}>{item?.professional?.user?.firstName}{' '}{item?.professional?.user?.lastName}</Text>

                    <Entypo name="message" color={'#000'} size={24} />
                  </View> */}
                </View>

              </ScrollView>


            </View>
          )
        }}
      />

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible2}
        statusBarTranslucent>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.BLACK_30,
        }}>
          <View style={{
            borderRadius: 15,
            padding: 15,
            backgroundColor: COLOR.WHITE,
            elevation: 5,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems: 'center',
          }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>Request sent successfully to compelete the order !!</Text>
            <TouchableOpacity
              style={{
                width: 50,
                marginTop: 10,
                backgroundColor: COLOR.ORANGECOLOR,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#fff',
                borderWidth: 1,
                shadowOffset: { height: 2 },
                shadowRadius: 2,
                shadowOpacity: 0.3,
              }}
              onPress={() => setModalVisible2(false)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible3}
        statusBarTranslucent>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.BLACK_30,
        }}>
          <View style={{
            borderRadius: 15,
            padding: 15,
            backgroundColor: COLOR.WHITE,
            elevation: 5,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            alignItems: 'center',
          }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>Request sent successfully to start order !!</Text>
            <TouchableOpacity
              style={{
                width: 50,
                marginTop: 10,
                backgroundColor: COLOR.ORANGECOLOR,
                padding: 10,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#fff',
                borderWidth: 1,
                shadowOffset: { height: 2 },
                shadowRadius: 2,
                shadowOpacity: 0.3,
              }}
              onPress={() => setModalVisible3(false)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <RBSheet
        ref={refRBSheet}
        height={Screen_Height * 0.3}
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

        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetTitle}>
            <Text style={styles.bottomSheetTitleText}>Professional requesting for completion order</Text>
          </View>
          <Text style={{ color: COLOR.BLACK, fontSize: 22, textAlign: 'center', marginVertical: 10 }}>{formatTime(timeLeft)}</Text>
          <TouchableOpacity onPress={onRequestToEnd} style={[styles.button, { backgroundColor: COLOR.ChartBlue }]}>
            <Text style={styles.buttonText}>Send request</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconContainer}>
              <Icon name="pencil" size={24} color="white" />
            </View>
            <Text style={styles.modalTitle}>Congrats! Service Completed 🎊</Text>
            <Text style={styles.modalSubtitle}>Please rate your experience with the client:</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={1}>
                  <Icon
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={30}
                    color={COLOR.ORANGECOLOR}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write review"
                placeholderTextColor={COLOR.GRAY}
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
            <TouchableOpacity
              onPress={HandleReview}
              style={styles.writeReviewButton}>
              <Text style={styles.writeReviewText}>Leave a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false);
                navigationToReset(navigation, NavigationScreens.ProfessionalBottomTab);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </ScrollView>
  );
};

export default ProfessionalOngoing;

const styles = StyleSheet.create({});
