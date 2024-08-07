// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Modal, StatusBar, ScrollView, FlatList } from 'react-native';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { Screen_Height, Screen_Width } from '../../constants/Constants';
// import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
// import socketServices from '../../Services/Socket';
// import { NavigationScreens } from '../../constants/Strings';
// import LiveTrackingMap from '../LiveTrackingMap';
// import MapView from 'react-native-maps';
// import { barber, Hair1 } from '../../constants/Icons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// import FastImage from 'react-native-fast-image';

// const LiveTrackingProfSide = ({ route }) => {

//   const theme = useSelector(state => state.ThemeReducer);
//   const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//   const { orderData } = route.params;
//   // console.log("==========             servicesssss         ================>", JSON.stringify(orderData.message.services));

//   const navigation = useNavigation();
//   const [btnVisible, setBtnVisibility] = useState(false);
//   const [directionModalVisible, setDirectionModalVisibility] = useState(false);
//   const [services, setServices] = useState(orderData.message.services)
//   const [Prof_distance, setProf_distance] = useState('')
//   const [Prof_duration, setProf_duration] = useState('')
//   const [Client_distance, setClient_distance] = useState('')
//   const [Client_duration, setClient_duration] = useState('')
//   const [requestCount, setRequestCount] = useState(0);
//   const [orderCancelled, setOrderCancelled] = useState(false);
//   const timeoutRef = useRef(null);
//   const [timeRemaining, setTimeRemaining] = useState(10);
//   const [isOpen, setIsOpen] = useState(false);
//   const [orderId, setOrderId] = useState('')
//   // const services = [
//   //   { name: 'Wings', price: 28.57 },
//   //   { name: 'Wings', price: 28.57 },
//   //   { name: 'Wings', price: 28.57 },
//   // ];
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   // ************************************************************

//   socketServices.on('Accept_To_Process_Order', data => {
//     navigation.navigate(NavigationScreens.OrderProcessingScreenProfSideScreen, { data, services: orderData.message.services });
//   });
//   console.log(btnVisible);
//   const handleRequest = () => {

//     socketServices.emit('order_update', {
//       recipient: orderData.sender,
//       message: {
//         type: 'Request_To_Start_Order',
//         id: orderData.id,
//         order_id: orderData.order_id,

//       },
//     });
//   }

//   // *******************************************************************
//   // ===============================================================================
//   // const onRequestToStartOrder = (isManual = true) => {
//   //   if (requestCount >= 2) {
//   //     cancelOrder();
//   //     return;
//   //   }

//   //   const newRequestCount = requestCount + 1;
//   //   setRequestCount(newRequestCount);




//   // const cancelOrder = () => {
//   //   clearTimeout(timeoutRef.current);
//   //   socketServices.emit('order_update', {
//   //     recipient: orderData.sender,
//   //     message: {
//   //       type: 'Cancel_Order',
//   //       id: orderData.id,
//   //       order_id: orderData.order_id,
//   //     },
//   //   });
//   //   setOrderCancelled(true);
//   //   Alert.alert(
//   //     "Order Cancelled",
//   //     "The order has been cancelled due to no response from the client.",
//   //     [{ text: "OK", onPress: () => navigation.navigate(NavigationScreens.ProfessionalBottomTab) }]
//   //   );
//   // }

//   // useEffect(() => {


//   //   const needMoreTimeListener = socketServices.on('Need_More_Time_To_Process_Order', data => {
//   //     Alert.alert("Client Needs More Time", "The client has requested more time before starting the order.");
//   //   });

//   //   return () => {
//   //     clearTimeout(timeoutRef.current);
//   //     socketServices.off('Accept_To_Process_Order', acceptListener);
//   //     socketServices.off('Need_More_Time_To_Process_Order', needMoreTimeListener);
//   //   };
//   // }, []);

//   // ================================================================================================

//   const styles = StyleSheet.create({
//     container: {
//       height: Screen_Height,
//     },

//     Container: {
//       flex: 1,
//       backgroundColor: '#fff',
//     },
//     ContentContainer: {
//       padding: 15,
//       paddingTop: 60,
//     },
//     IdContainer: {
//       width: '100%',
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//     },
//     IdText: {
//       fontSize: 14,
//       color: '#000',
//       textTransform: 'uppercase',
//     },
//     IdCopyButton: {
//       height: 30,
//       aspectRatio: 1 / 1,
//       borderWidth: 1,
//       borderColor: '#717273',
//       borderRadius: 5,
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     InnerContainer: {
//       width: '100%',
//       padding: 15,
//       borderWidth: 1,
//       borderColor: COLOR.BLACK,
//       borderRadius: 15,
//       marginTop: 15,
//       backgroundColor: '#fff',
//       shadowOpacity: 0.1,
//       shadowOffset: { height: 2 },
//       shadowRadius: 2,
//     },
//     MapContainer: {
//       width: '100%',
//       height: Screen_Height * 0.5,
//       borderRadius: 10,
//       overflow: 'hidden',
//       marginVertical: 10,
//     },
//     DateTimeContainer: {
//       width: '100%',
//       height: 60,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginTop: 15,
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: '#f1f1f1',
//     },
//     BlackContainer: {
//       backgroundColor: 'rgba(241,148,54,1)',
//       flexDirection: 'row',
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       borderRadius: 7,
//       alignItems: 'center',
//       height: 45,
//       shadowOpacity: 0.1,
//       shadowOffset: { height: 1 },
//       shadowRadius: 1,
//     },
//     WhiteText: {
//       color: COLOR.WHITE,
//       fontSize: 13,
//       fontWeight: 'bold',
//       textTransform: 'uppercase',
//     },
//     UserDetailsContainer: {
//       padding: 7,
//       borderRadius: 7,
//       marginTop: 7,
//       flexDirection: 'row',
//       alignItems: 'center',
//       borderWidth: 1,
//       borderColor: '#f1f2f3',
//       backgroundColor: '#fff',
//       shadowOpacity: 0.1,
//       shadowOffset: { height: 1 },
//       shadowRadius: 1,
//       marginBottom: 5,
//     },
//     UserImage: {
//       width: 60,
//       height: 60,
//       aspectRatio: 1 / 1,
//       borderRadius: 7,
//     },
//     UserName: {
//       flex: 1,
//       marginLeft: 10,
//       color: '#000',
//       fontWeight: '600',
//     },
//     ViewWrapper: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#00000050',
//       paddingBottom: '30%',
//     },
//     ModalContainer: {
//       width: '85%',
//       borderRadius: 15,
//       padding: 30,
//       backgroundColor: '#fff',
//       elevation: 5,
//       shadowOffset: { width: 0, height: 5 },
//       shadowOpacity: 0.3,
//       shadowRadius: 5,
//       alignItems: 'center',
//     },
//     LabelText: {
//       fontSize: 16,
//       color: '#000',
//       textAlign: 'center',
//       fontWeight: '600',
//     },
//     DescText: {
//       fontSize: 14,
//       color: '#929292',
//       marginTop: 15,
//     },
//     infoContainer: {
//       alignItems: 'center',
//     },
//     infoBox: {
//       backgroundColor: COLOR.ChartBlue,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 15,
//       width: Screen_Width * 0.85,
//     },
//     infoRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       alignItems: 'center',
//     },
//     infoColumn: {
//       width: Screen_Width * 0.41,
//       height: 60,
//       padding: 10,
//     },
//     infoColumnYou: {
//       backgroundColor: COLOR.ORANGECOLOR,
//       borderTopLeftRadius: 10,
//     },
//     infoColumnClient: {
//       backgroundColor: COLOR.ChartBlue,
//       borderTopRightRadius: 15,
//       width: Screen_Width * 0.44,
//     },
//     infoText2: {
//       color: COLOR.BLACK,
//       fontSize: 14,
//       fontWeight: '600'
//     },
//     infoText: {
//       color: COLOR.BLACK,
//       fontSize: 14,
//     },
//     meetupText: {
//       color: COLOR.BLACK,
//       fontSize: 16,
//       marginTop: 10,
//       textAlign: 'center',
//       fontWeight: '600',
//     },
//     buttonContainer: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: Screen_Width,
//       position: 'absolute',
//     },
//     button: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: 50,
//       backgroundColor: COLOR.ChartBlue,
//       marginVertical: 5,
//       borderRadius: 15,
//       flexDirection: 'row',
//     },
//     buttonText: {
//       color: COLOR.WHITE,
//       fontWeight: 'bold',
//       fontSize: 18,
//       marginRight: 10,
//     },
//     cancelText: {
//       color: COLOR.RED,
//       fontWeight: 'bold',
//       fontSize: 18,
//     },


//     mapStyle: {
//       height: Screen_Height * 0.7
//     },
//     headerContainer: {
//       width: Screen_Width,
//       height: Screen_Height * 0.03,
//       flexDirection: 'row',
//       alignItems: 'center',
//       gap: 15,
//       paddingHorizontal: 10,
//       marginVertical: 10
//     },
//     headerText: {
//       fontWeight: '600',
//       fontSize: 20,
//       color: COLOR.BLACK
//     },

//     buttonContainer: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: Screen_Width,
//       position: 'absolute',
//       bottom: 10
//     },
//     button: {
//       width: Screen_Width * 0.9,
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: 50,
//       backgroundColor: COLOR.ChartBlue,
//       marginVertical: 5,
//       borderRadius: 15,
//       flexDirection: 'row',
//     },
//     buttonText: {
//       color: COLOR.WHITE,
//       fontWeight: 'bold',
//       fontSize: 18,
//       marginRight: 10
//     },
//     cancelText: {
//       color: COLOR.RED,
//       fontWeight: 'bold',
//       fontSize: 18
//     }
//   });

//   return (
//     <>
//       {/* <View style={styles.headerContainer}>
//         <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={28} color="black" />
//         <Text style={styles.headerText}>Time and Distance</Text>
//       </View> */}

//       <View style={styles.Container}>
//         <StatusBar
//           translucent
//           barStyle={'dark-content'}
//           backgroundColor={'#00000000'}
//         />

//         <ScrollView
//           style={styles.Container}
//           contentContainerStyle={styles.ContentContainer}
//           showsVerticalScrollIndicator={false}>
//           <View style={styles.IdContainer}>
//             <Text style={styles.IdText}>ID : {orderId}</Text>
//             <Text style={[styles.UserName, { textAlign: 'right' }]}>
//               22-07-2024
//             </Text>
//           </View>

//           <View style={styles.InnerContainer}>
//             <View style={styles.MapContainer}>

//               <LiveTrackingMap
//                 mapApiKey={'AIzaSyDjksmogYn7mFtMJFw-eNFsoCuHGM87-j8'}
//                 onLocationChange={(data) => {
//                   console.log("Sender : ", JSON.stringify(orderData));
//                   setOrderId(orderData.message.id.message.order_id)
//                   socketServices.emit('order_update', {
//                     recipient: orderData.sender,
//                     message: {
//                       type: 'Location_ChangeSP',
//                       id: orderData.id,
//                       order_id: orderData.order_id,
//                       data,
//                     },
//                   });
//                 }}
//                 socketType={'Location_ChangeCLI'}
//                 staticCoordinate={orderData?.message?.id?.message?.coordinates}
//                 isPro
//                 setVisible={setBtnVisibility}
//                 Prof_distance={setProf_distance}
//                 Prof_duration={setProf_duration}
//                 Client_distance={setClient_distance}
//                 Client_duration={setClient_duration}
//               />

//               <View
//                 style={[
//                   styles.BlackContainer,
//                   {
//                     height: 35,
//                     position: 'absolute',
//                     borderRadius: 0,
//                     borderBottomRightRadius: 7,
//                     zIndex: 100,
//                   },
//                 ]}>
//                 <Text style={[styles.WhiteText, { fontSize: 10 }]}>3 in Queue</Text>
//               </View>
//               <View
//                 style={[
//                   styles.BlackContainer,
//                   {
//                     height: 35,
//                     position: 'absolute',
//                     borderRadius: 0,
//                     borderBottomLeftRadius: 7,
//                     zIndex: 100,
//                     right: 0,
//                   },
//                 ]}>
//                 <Text style={[styles.WhiteText, { fontSize: 10 }]}>PENDING</Text>
//               </View>
//             </View>

//             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//               <View style={{ width: Screen_Width * 0.4 }}>
//                 <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
//                   <AntDesign name="user" size={15} color={COLOR.BLACK} />
//                   <Text style={styles.infoText2}>Professional</Text>
//                 </View>
//                 <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
//                     <MaterialIcons name="location-on" size={16} color={COLOR.BLACK} />
//                     <Text style={styles.infoText}>{parseFloat(Prof_distance).toFixed(2)}km</Text>
//                   </View>
//                   <AntDesign name="close" size={15} color={COLOR.BLACK} />
//                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
//                     <MaterialIcons name="access-time" size={16} color={COLOR.BLACK} />
//                     <Text style={styles.infoText}>{parseFloat(Prof_duration).toFixed(2)}min</Text>
//                   </View>
//                 </View>
//               </View>

//               <View style={{ width: Screen_Width * 0.4 }}>
//                 <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', gap: 5, marginBottom: 10 }}>
//                   <AntDesign name="user" size={15} color={COLOR.BLACK} />
//                   <Text style={styles.infoText2}>Client</Text>
//                 </View>
//                 <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
//                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
//                     <MaterialIcons name="location-on" size={16} color={COLOR.BLACK} />
//                     <Text style={styles.infoText}>{parseFloat(Client_distance).toFixed(2)}km</Text>
//                   </View>
//                   <AntDesign name="close" size={15} color={COLOR.BLACK} />
//                   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
//                     <MaterialIcons name="access-time" size={16} color={COLOR.BLACK} />
//                     <Text style={styles.infoText}>{parseFloat(Client_duration).toFixed(2)}min</Text>
//                   </View>
//                 </View>
//               </View>

//             </View>
//             <Text style={styles.meetupText}>You meetup at in atmost {parseFloat(Client_duration > Prof_duration ? Client_duration === 0 ? Client_duration : Client_duration + 5 : Prof_duration === 0 ? Prof_duration : Prof_duration + 5).toFixed(2)} min</Text>


//             <View
//               style={{
//                 borderWidth: 1,
//                 padding: 10,
//                 marginTop: 15,
//                 borderColor: COLOR.BLACK,
//                 borderRadius: 10,
//               }}>
//               <TouchableOpacity
//                 onPress={toggleDropdown}
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   padding: 5,
//                 }}>
//                 <Text style={{ color: COLOR.BLACK }}>
//                   Services
//                 </Text>
//                 <MaterialIcons
//                   name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//                   color={'#000'}
//                   size={25}
//                 />
//               </TouchableOpacity>
//               {isOpen && (
//                 <FlatList
//                   data={services}
//                   showsVerticalScrollIndicator={false}
//                   style={{ flex: 1 }}
//                   scrollEnabled={false}
//                   renderItem={({ item }) => {
//                     return (
//                       <View style={{ paddingHorizontal: 5 }}>
//                         <View
//                           //   onPress={() => handleSelect(item)}
//                           style={{
//                             backgroundColor: COLOR.WHITE,
//                             marginVertical: 10,
//                             // width: Screen_Width * 0.67,
//                             height: Screen_Height * 0.15,
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             borderRadius: 10,
//                             flexDirection: 'row',
//                             elevation: 4,
//                             shadowColor: COLOR.BLACK,
//                             gap: 10

//                           }}>
//                           <FastImage
//                             style={{
//                               width: Screen_Width * 0.22,
//                               height: Screen_Height * 0.15,
//                               borderRadius: 10,

//                             }}
//                             source={{ uri: item?.photo }}
//                           />
//                           <View
//                             style={{ flexDirection: 'column', gap: 5 }}>
//                             <Text
//                               style={{
//                                 color: COLOR.BLACK,
//                                 fontSize: 16,
//                                 fontWeight: '600',
//                                 paddingRight: 10,
//                               }}
//                               numberOfLines={1}
//                             >
//                               {item?.name}
//                             </Text>
//                             <Text
//                               style={{
//                                 color: COLOR.BLACK,
//                                 fontSize: 16,
//                                 fontWeight: '300',
//                                 paddingRight: 10,
//                               }}
//                               numberOfLines={1}
//                             >
//                               {item?.category?.name}
//                             </Text>
//                             <Text
//                               style={{
//                                 color: COLOR.BLACK_40,
//                                 fontSize: 14,
//                                 fontWeight: '600',
//                                 paddingRight: 10,
//                                 width: 170,
//                               }}
//                               numberOfLines={1}

//                             >
//                               {item.description.length > 40
//                                 ? `${item.description.slice(0, 40)}...`
//                                 : item.description}
//                             </Text>
//                             <View
//                               style={{
//                                 flexDirection: 'row',
//                                 justifyContent: 'space-between',
//                                 width: Screen_Width * 0.55,
//                                 alignItems: 'center',
//                               }}

//                             >
//                               <Text
//                                 style={{
//                                   color: COLOR.ORANGECOLOR,
//                                   fontSize: 16,
//                                   fontWeight: '600',
//                                   paddingRight: 10,
//                                 }}
//                                 numberOfLines={1}

//                               >
//                                 ${item?.price}
//                               </Text>
//                             </View>
//                           </View>
//                         </View>
//                       </View>
//                     )
//                   }}
//                 />
//               )}
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}>
//               <FontAwesome5 name="user-circle" color={'#000'} size={20} />
//               <Text style={[styles.UserName, { marginLeft: 7 }]}>Elon Musk</Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}>
//               <Entypo name="scissors" color={'#000'} size={20} />
//               <Text style={[styles.UserName, { marginLeft: 7 }]}>Jk Jk</Text>
//               <Entypo name="message" color={'#000'} size={24} />
//             </View>

//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 marginTop: 10,
//               }}
//               onPress={() => setDirectionModalVisibility(true)}>
//               <FontAwesome5 name="directions" color="#000" size={20} />
//               <Text
//                 style={[
//                   styles.UserName,
//                   {
//                     marginLeft: 7,
//                     textDecorationLine: 'underline',
//                     color: '#000',
//                   },
//                 ]}>
//                 Ahmedabad Nikol Circle
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View style={{ height: 50 }} />
//         </ScrollView>

//         <Modal
//           animationType="fade"
//           transparent
//           visible={directionModalVisible}
//           statusBarTranslucent>
//           <View style={styles.ViewWrapper}>
//             <View style={styles.ModalContainer}>
//               <Text
//                 style={
//                   styles.LabelText
//                 }>{`Please head to \n designated location`}</Text>
//               <Text style={styles.DescText}>
//                 Once arrived please come back here{' '}
//               </Text>

//               <View
//                 style={{
//                   flexDirection: 'row',
//                   width: '100%',
//                   marginTop: 30,
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     flex: 1,
//                     backgroundColor: 'rgba(241,148,54,1)',
//                     padding: 10,
//                     borderRadius: 10,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderColor: '#fff',
//                     borderWidth: 1,
//                     shadowOffset: { height: 2 },
//                     shadowRadius: 2,
//                     shadowOpacity: 0.3,
//                   }}
//                   onPress={() => setDirectionModalVisibility(false)}>
//                   <Text
//                     style={{
//                       color: '#fff',
//                       fontSize: 14,
//                       fontWeight: '700',
//                     }}>
//                     OK
//                   </Text>
//                 </TouchableOpacity>
//                 <View style={{ width: 10 }} />
//                 <TouchableOpacity
//                   style={{
//                     flex: 1,
//                     backgroundColor: '#000',
//                     padding: 10,
//                     borderRadius: 10,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderColor: '#fff',
//                     borderWidth: 1,
//                     shadowOffset: { height: 2 },
//                     shadowRadius: 2,
//                     shadowOpacity: 0.3,
//                   }}
//                   onPress={() => setDirectionModalVisibility(false)}>
//                   <Text
//                     style={{
//                       color: '#fff',
//                       fontSize: 14,
//                       fontWeight: '700',
//                     }}>
//                     Direction
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>

//       <View style={styles.buttonContainer}>
//         {btnVisible &&
//           <TouchableOpacity
//             onPress={handleRequest}
//             style={styles.button}
//           >
//             <Text style={styles.buttonText}>

//               Request to Start order
//             </Text>
//             <Text style={styles.buttonText}>

//             </Text>
//           </TouchableOpacity>
//         }
//       </View>

//       {/* {orderCancelled && (
//         <View style={styles.buttonContainer}>
//           <Text style={styles.cancelText}>
//             Order has been cancelled due to no response from the client.
//           </Text>
//         </View>
//       )} */}
//     </>
//   )
// }

// export default LiveTrackingProfSide;



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LiveTrackingProfSide = () => {
  return (
    <View>
      <Text>LiveTrackingProfSide</Text>
    </View>
  )
}

export default LiveTrackingProfSide

const styles = StyleSheet.create({})