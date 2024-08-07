// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import React, { useState } from 'react';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import {
//   COLOR_DARK,
//   COLOR_LIGHT,
//   GRADIENT_COLOR_DARK,
//   GRADIENT_COLOR_LIGHT,
// } from '../../../constants/Colors';
// import { Screen_Height, Screen_Width } from '../../../constants/Constants';
// import Modal from 'react-native-modal';
// import FastImage from 'react-native-fast-image';
// import { Successful } from '../../../constants/Icons';
// import { BASE_API_URL } from '../../../Services';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import socketServices from '../../../Services/Socket';
// import { NavigationScreens } from '../../../constants/Strings';

// const ReviewSummary = ({ route }) => {
//   const navigation = useNavigation();
//   const [services, setServices] = useState([])
//   const theme = useSelector(state => state.ThemeReducer);
//   const { address, OrderData } = route.params;
//   console.log(
//     '===========  OrderData    ==========',
//     JSON.stringify(OrderData.message.orderData.order.services),
//   );
//   setServices(OrderData.message.orderData.order.services)

//   const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//   const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
//   const [isModalVisible, setModalVisible] = useState(false);
//   console.log("Order INFO : ", OrderData.message);
//   const handleConfirmPayment = () => {
//     socketServices.emit('order_update', {
//       recipient: OrderData.sender,
//       message: {
//         type: 'payment_Done',
//         id: OrderData.message.orderDetail,
//         order_id: OrderData.message.order_id,
//         coordinates: OrderData.message.coordinates,
//         orderData: OrderData.message.orderData,
//         services: OrderData.message.orderData.order.services
//       },
//     });
//     socketServices.emit('order_update', {
//       recipient: OrderData.sender,
//       message: {
//         type: 'payment_Done_close',
//         id: OrderData,
//         services: OrderData.message.orderData.order.services
//         // order_id: OrderData.mesage.orsder_id,
//         // coordinates: OrderData.message.coordinates,
//         // orderData: OrderData.message.orderData,
//       },
//     });
//     navigation.navigate(NavigationScreens.LiveTrackingClientSideScreen, { orderData: OrderData, services: services });
//   };

//   return (
//     <ScrollView
//       style={{
//         width: Screen_Width,
//         height: Screen_Height,
//         paddingHorizontal: 15,
//       }}>
//       <View
//         style={{
//           width: Screen_Width,
//           height: Screen_Height * 0.05,
//           flexDirection: 'row',
//           alignItems: 'center',
//           gap: 15,
//           marginVertical: 10,
//         }}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <AntDesign name="arrowleft" size={30} color="black" />
//         </TouchableOpacity>
//         <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>
//           Review Summary
//         </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 15,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Barber/Salon</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           Barbarella lnova
//         </Text>
//       </View>

//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Name</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           Daniel Austin
//         </Text>
//       </View>

//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Date</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           December 23, 2024
//         </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Hours</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           10:00 AM
//         </Text>
//       </View>
//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Professional</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           Nathan Alexander
//         </Text>
//       </View>

//       <View style={{ marginTop: '15%' }}>
//         <View
//           style={{
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: 'row',
//             marginBottom: 10,
//           }}>
//           <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Haircut (Quiff)</Text>
//           <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//             $6.00
//           </Text>
//         </View>
//         <View
//           style={{
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: 'row',
//             marginVertical: 10,
//           }}>
//           <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>
//             Hair Wash (Aloe Vera Shampoo)
//           </Text>
//           <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//             $5.50
//           </Text>
//         </View>
//         <View
//           style={{
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: 'row',
//             marginVertical: 10,
//           }}>
//           <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>
//             Shaving (Thin Shaving)
//           </Text>
//           <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//             $4.50
//           </Text>
//         </View>
//       </View>

//       <View
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 15,
//         }}>
//         <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Total</Text>
//         <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
//           $16.00
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={{
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexDirection: 'row',
//           marginVertical: 10,
//         }}>
//         <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
//           <FontAwesome name="cc-mastercard" size={30} color="black" />
//           <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>
//             ... ... ... ... 7682
//           </Text>
//         </View>
//         <Text
//           style={{ color: COLOR.ORANGECOLOR, fontSize: 17, fontWeight: 'bold' }}>
//           Change
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: 50,
//           borderRadius: 35,
//           backgroundColor: COLOR.ORANGECOLOR,
//           marginVertical: 10,
//         }}
//         onPress={handleConfirmPayment}>
//         <Text style={{ color: COLOR.WHITE, fontSize: 20, fontWeight: '500' }}>
//           Confirm Payment
//         </Text>
//       </TouchableOpacity>
//       <Modal isVisible={isModalVisible}>
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <View
//             style={{
//               backgroundColor: 'white',
//               height: Screen_Height * 0.5,
//               width: Screen_Width * 0.8,
//               borderRadius: 25,
//               marginVertical: 10,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <FastImage
//               source={Successful}
//               style={{ height: 150, width: 150 }}
//               resizeMode="cover"
//             />
//             <Text
//               style={{
//                 fontWeight: 'bold',
//                 fontSize: 20,
//                 color: COLOR.ORANGECOLOR,
//               }}>
//               Successful!
//             </Text>
//             <Text
//               style={{
//                 marginVertical: 10,
//                 fontSize: 18,
//                 color: COLOR.GRAY,
//                 textAlign: 'center',
//               }}>
//               Your Booking has been {'\n'} successfully done
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate('EReceiptScreen'), setModalVisible(false);
//               }}
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: 50,
//                 borderRadius: 35,
//                 backgroundColor: COLOR.ORANGECOLOR,
//                 marginVertical: 15,
//                 width: Screen_Width * 0.7,
//               }}>
//               <Text
//                 style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>
//                 View E-Recepit
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate('Home Screen', setModalVisible(false))
//               }
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: 50,
//                 borderRadius: 35,
//                 backgroundColor: COLOR.GULABI,
//                 marginVertical: 15,
//                 width: Screen_Width * 0.7,
//               }}>
//               <Text
//                 style={{
//                   color: COLOR.ORANGECOLOR,
//                   fontSize: 16,
//                   fontWeight: '800',
//                 }}>
//                 Home
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <View style={{ height: 90 }} />
//     </ScrollView>
//   );
// };

// export default ReviewSummary;

// const styles = StyleSheet.create({});

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import { Successful } from '../../../constants/Icons';
import socketServices from '../../../Services/Socket';
import { NavigationScreens } from '../../../constants/Strings';

const ReviewSummary = ({ route }) => {
  const navigation = useNavigation();
  const [services, setServices] = useState([]);
  const theme = useSelector(state => state.ThemeReducer);
  const { address, OrderData } = route.params;

  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (OrderData?.message?.orderData?.order?.services) {
      setServices(OrderData.message.orderData.order.services);
      console.log(
        '===========  OrderData    ==========',
        JSON.stringify(OrderData.message.orderData.order.services),
      );
    }
    console.log("Order INFO : ", OrderData.message);
  }, [OrderData]);

  const handleConfirmPayment = () => {
    navigation.navigate(NavigationScreens.LiveTrackingClientSideScreen, { orderData: OrderData, services: services });
  };

  return (
    <ScrollView
      style={{
        width: Screen_Width,
        height: Screen_Height,
        paddingHorizontal: 15,
      }}>
      <View
        style={{
          width: Screen_Width,
          height: Screen_Height * 0.05,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
          marginVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>
          Review Summary
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 15,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Barber/Salon</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          Barbarella lnova
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Name</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          Daniel Austin
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Date</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          December 23, 2024
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Booking Hours</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          10:00 AM
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Professional</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          Nathan Alexander
        </Text>
      </View>

      <View style={{ marginTop: '15%' }}>
        {services.map((service, index) => (
          <View
            key={index}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>{service.name}</Text>
            <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
              ${service.price.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 15,
        }}>
        <Text style={{ color: COLOR.GRAY, fontSize: 18 }}>Total</Text>
        <Text style={{ color: COLOR.BLACK, fontWeight: 'bold', fontSize: 18 }}>
          ${services.reduce((sum, service) => sum + service.price, 0).toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20 }}>
          <FontAwesome name="cc-mastercard" size={30} color="black" />
          <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>
            ... ... ... ... 7682
          </Text>
        </View>
        <Text
          style={{ color: COLOR.ORANGECOLOR, fontSize: 17, fontWeight: 'bold' }}>
          Change
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 35,
          backgroundColor: COLOR.ORANGECOLOR,
          marginVertical: 10,
        }}
        onPress={handleConfirmPayment}>
        <Text style={{ color: COLOR.WHITE, fontSize: 20, fontWeight: '500' }}>
          Confirm Payment
        </Text>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              backgroundColor: 'white',
              height: Screen_Height * 0.5,
              width: Screen_Width * 0.8,
              borderRadius: 25,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              source={Successful}
              style={{ height: 150, width: 150 }}
              resizeMode="cover"
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                color: COLOR.ORANGECOLOR,
              }}>
              Successful!
            </Text>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 18,
                color: COLOR.GRAY,
                textAlign: 'center',
              }}>
              Your Booking has been {'\n'} successfully done
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EReceiptScreen');
                setModalVisible(false);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 35,
                backgroundColor: COLOR.ORANGECOLOR,
                marginVertical: 15,
                width: Screen_Width * 0.7,
              }}>
              <Text
                style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '800' }}>
                View E-Receipt
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home Screen');
                setModalVisible(false);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 35,
                backgroundColor: COLOR.GULABI,
                marginVertical: 15,
                width: Screen_Width * 0.7,
              }}>
              <Text
                style={{
                  color: COLOR.ORANGECOLOR,
                  fontSize: 16,
                  fontWeight: '800',
                }}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default ReviewSummary;

const styles = StyleSheet.create({});