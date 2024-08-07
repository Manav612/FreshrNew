import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { Screen_Width } from '../constants/Constants';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { ComeToYouWhite, Hair1 } from '../constants/Icons';
import ActiveLine from '../components/Story/Story/ActiveLine';
import LiveTrackingMap from '../components/LiveTrackingMap';

const MapScreen2 = () => {
  const [directionModalVisible, setDirectionModalVisibility] = useState(false);
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [Prof_distance, setProf_distance] = useState('')
  const [Prof_duration, setProf_duration] = useState('')
  const [Client_distance, setClient_distance] = useState('')
  const [Client_duration, setClient_duration] = useState('')
  const toggleDropdown = ({ services }) => {
    setIsOpen(!isOpen);
  };

  const services = [
    { name: 'Wings', price: 28.57 },
    { name: 'Wings', price: 28.57 },
    { name: 'Wings', price: 28.57 },
  ];

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      backgroundColor: '#fff',
      // paddingHorizontal: 15
    },
    ContentContainer: {
      padding: 10,
      paddingTop: 60,
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
  });

  return (
    <View style={[styles.Container, { paddingHorizontal: 10 }]}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'#00000000'}
      />

      <ScrollView
        style={styles.Container}
        contentContainerStyle={[
          styles.ContentContainer,
          // height > 0 && { paddingTop: height / 2 },
        ]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.InnerContainer}>
          <View
            style={[
              {
                borderWidth: 1,
                borderColor: '#e1e1e1',
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

            <View style={[styles.IdContainer, { marginVertical: 10 }]}>
              <Text style={[styles.UserName, { textAlign: 'center' }]}>
                Time remaining: 1:52
              </Text>
            </View>

            <ActiveLine
              duration={1000 * 30}
              width={200}
              isActive={true}
              onLayout={() => { }}
              bgColor={COLOR.ORANGECOLOR}
              progressColor={COLOR.BLACK}
            />


            <TouchableOpacity
              style={{
                flex: 1,
                padding: 7,
                backgroundColor: COLOR.ORANGECOLOR,
                borderRadius: 7,
                marginVertical: 5,
              }}>
              <Text style={[styles.LabelText, { color: COLOR.WHITE }]}>
                please wait for approval
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 1000,
              top: 60,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.IdText}>ID : 75fdgdgd4545645</Text>
            <Text style={[styles.UserName, { textAlign: 'right' }]}>
              22-07-2024
            </Text>
          </View>
          <View
            style={[
              styles.MapContainer,
              height > 0 && { marginTop: height / 1.8 },
            ]}>
            <MapView
              style={{
                width: '100%',
                height: '100%',
              }}
              initialRegion={{
                latitude: 20.5937,
                longitude: 78.9629,
                latitudeDelta: 0.225,
                longitudeDelta: 0.225,
              }}
              provider="google"
            />
            {/* <LiveTrackingMap
                mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
                onLocationChange={(data) => {
                  socketServices.emit('order_update', {
                    recipient: orderData.sender,
                    message: {
                      type: 'Location_ChangeCLI',
                      id: orderData.message.id,
                      order_id: orderData.message.order_id,
                      data,
                    },
                  });
                }}
                socketType={'Location_ChangeSP'}
                staticCoordinate={orderData?.message?.coordinates}
                Prof_distance={setProf_distance}
                Prof_duration={setProf_duration}
                Client_distance={setClient_distance}
                Client_duration={setClient_duration}
              /> */}
            <View
              style={[
                styles.BlackContainer,
                {
                  height: 30,
                  position: 'absolute',
                  //   top: 20,
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
                  // borderBottomRightRadius: 7,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  zIndex: 100,
                  backgroundColor: COLOR.ChartBlue,
                },
              ]}>
              <Image source={ComeToYouWhite} style={{ height: 15, width: 15 }} />
              <Text style={[styles.WhiteText, { fontSize: 10 }]}>Comes to you</Text>
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
              <Text style={[styles.WhiteText, { fontSize: 10 }]}>Pending</Text>
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
                    <FontAwesome5 name="user" color={'#000'} size={15} />
                    <Text
                      style={[styles.LabelText, { fontSize: 13, marginLeft: 7 }]}>
                      Professional
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
                      0.2Km
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
                      0.7Min
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
                    <FontAwesome5 name="user" color={'#000'} size={15} />
                    <Text
                      style={[styles.LabelText, { fontSize: 13, marginLeft: 7 }]}>
                      Client
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
                      0.2Km
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
                      0.7Min
                    </Text>
                  </View>
                </View>
              </View>
              <Text
                style={[
                  styles.LabelText,
                  { fontSize: 20, paddingBottom: 70, color: COLOR.ORANGECOLOR },
                ]}>
                Meet-up in 2:20 min
              </Text>
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
                        source={Hair1}
                        style={{ width: 50, height: 50, borderRadius: 5 }}
                      />
                      <Text
                        style={{
                          color: COLOR.BLACK,
                          fontSize: 18,
                          fontWeight: '600',
                        }}>
                        Services ({services.length})
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
                          Services ({services.length})
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
                            Wings
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
                  {services.map((service, index) => (
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
                        source={Hair1}
                        resizeMode="cover"
                      />
                      <Text style={styles.UserName}>{service.name}</Text>
                      <View style={styles.BlackContainer}>
                        <Text style={styles.WhiteText}>
                          ${service.price.toFixed(2)}
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
                <Text style={[styles.WhiteText, { height: 'auto' }]}>$8000</Text>
              </View>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <FontAwesome5 name="user-circle" color={'#000'} size={20} />
            <Text style={[styles.UserName, { marginLeft: 7 }]}>Elon Musk</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Entypo name="scissors" color={'#000'} size={20} />
            <Text style={[styles.UserName, { marginLeft: 7 }]}>Jk Jk</Text>
            <Entypo name="message" color={'#000'} size={24} />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={directionModalVisible}
        statusBarTranslucent>
        <View style={styles.ViewWrapper}>
          <View style={styles.ModalContainer}>
            <Text
              style={
                styles.LabelText
              }>{`Please head to\ndesignated location`}</Text>
            <Text style={styles.DescText}>
              Once arrived please come back here{' '}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 30,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(241,148,54,1)',
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
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
              <View style={{ width: 10 }} />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#000',
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
                onPress={() => setDirectionModalVisibility(false)}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '700',
                  }}>
                  Direction
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MapScreen2;
