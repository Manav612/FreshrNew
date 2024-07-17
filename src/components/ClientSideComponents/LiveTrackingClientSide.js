import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import socketServices from '../../Services/Socket';
import { NavigationScreens } from '../../constants/Strings';
import LiveTrackingMap from '../LiveTrackingMap';

const LiveTrackingClientSide = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const { orderData } = route.params;
  const [orderCancelled, setOrderCancelled] = useState(false);
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const [recipientId, setRecipientId] = useState('');
  const [orderId, setOrderId] = useState('');

  const openBottomSheet = () => {
    refRBSheet?.current?.open();
  };

  const handleAccept = () => {
    navigation.navigate(NavigationScreens.OrderProcessingScreenClientSideScreen);
    refRBSheet?.current?.close();
    socketServices.emit('order_update', {
      recipient: recipientId,
      message: {
        type: 'Accept_To_Process_Order',
        id: recipientId,
        order_id: orderId,
      },
    });
  }

  const handleNeedMoreTime = () => {
    refRBSheet?.current?.close();
    socketServices.emit('order_update', {
      recipient: recipientId,
      message: {
        type: 'Need_More_Time_To_Process_Order',
        id: recipientId,
        order_id: orderId,
      },
    });
  }

  const handleCancelOrder = () => {
    refRBSheet?.current?.close();
    socketServices.emit('order_update', {
      recipient: recipientId,
      message: {
        type: 'Cancel_Order_By_Client',
        id: recipientId,
        order_id: orderId,
      },
    });
    setOrderCancelled(true);
    Alert.alert(
      "Order Cancelled",
      "You have cancelled the order. A partial refund may be processed within 24 hours.",
      [{ text: "OK", onPress: () => navigation.navigate(NavigationScreens.HomeTab) }]
    );
  }

  useEffect(() => {
    const requestListener = socketServices.on('Request_To_Start_Order', data => {
      setRecipientId(data?.sender);
      setOrderId(data.message.order_id);
      openBottomSheet();

      if (data.message.requestCount === 3) {
        Alert.alert(
          "Last Reminder",
          "This is your last chance to accept the order. If you don't accept within 5 minutes, the order will be cancelled.",
          [{ text: "OK" }]
        );
      }
    });

    const cancelListener = socketServices.on('Cancel_Order', data => {
      refRBSheet?.current?.close();
      setOrderCancelled(true);
      Alert.alert(
        "Order Cancelled",
        "Your order has been cancelled due to no response. A partial refund will be processed within 24 hours.",
        [{ text: "OK", onPress: () => navigation.navigate(NavigationScreens.HomeTab) }]
      );
    });

    return () => {
      socketServices.off('Request_To_Start_Order', requestListener);
      socketServices.off('Cancel_Order', cancelListener);
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      height: Screen_Height * 0.7,
    },
    mapStyle: {
      height: Screen_Height * 0.7
    },
    headerContainer: {
      width: Screen_Width,
      height: Screen_Height * 0.03,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingHorizontal: 10,
      marginVertical: 10
    },
    headerText: {
      fontWeight: '600',
      fontSize: 20,
      color: COLOR.BLACK
    },
    infoContainer: {
      width: Screen_Width,
      height: Screen_Height * 0.15,
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'absolute',
      bottom: Screen_Height * 0.23,
      paddingHorizontal: 15
    },
    infoBox: {
      backgroundColor: COLOR.ChartBlue,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    infoColumn: {
      width: Screen_Width * 0.45,
      height: 80,
      padding: 20
    },
    infoColumnYou: {
      backgroundColor: COLOR.ORANGECOLOR,
      borderTopLeftRadius: 15
    },
    infoColumnProfessional: {
      backgroundColor: COLOR.ChartBlue,
      borderTopRightRadius: 15
    },
    infoText: {
      color: COLOR.WHITE,
      fontSize: 16
    },
    meetupText: {
      color: COLOR.WHITE,
      fontSize: 20,
      fontWeight: '600',
      marginVertical: 15
    },
    cancelText: {
      color: COLOR.RED,
      fontWeight: 'bold',
      fontSize: 18
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
      fontWeight: 'bold'
    },
    button: {
      height: 50,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLOR.WHITE
    }
  });

  return (
    <>
      <View style={styles.headerContainer}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={28} color="black" />
        <Text style={styles.headerText}>Time and Distance</Text>
      </View>

      <View style={styles.container}>
        <LiveTrackingMap
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
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <View style={[styles.infoColumn, styles.infoColumnYou]}>
              <Text style={styles.infoText}>YOU</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>28 min</Text>
                <AntDesign name="close" size={20} color={COLOR.WHITE} />
                <Text style={styles.infoText}>11.8 min</Text>
              </View>
            </View>
            <View style={[styles.infoColumn, styles.infoColumnProfessional]}>
              <Text style={styles.infoText}>PROFESSIONAL</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>28 min</Text>
                <AntDesign name="close" size={20} color={COLOR.WHITE} />
                <Text style={styles.infoText}>10.7 min</Text>
              </View>
            </View>
          </View>
          <Text style={styles.meetupText}>You meetup at in at most 33 min</Text>
        </View>
      </View>

      {orderCancelled && (
        <View style={styles.infoContainer}>
          <Text style={styles.cancelText}>
            Order has been cancelled. A partial refund will be processed within 24 hours.
          </Text>
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        height={Screen_Height * 0.35}
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
        {!orderCancelled && (
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetTitle}>
              <Text style={styles.bottomSheetTitleText}>Professional requesting start order</Text>
            </View>
            <TouchableOpacity onPress={handleAccept} style={[styles.button, { backgroundColor: COLOR.ChartBlue }]}>
              <Text style={styles.buttonText}>Start order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancelOrder} style={[styles.button, { backgroundColor: COLOR.CANCEL_B }]}>
              <Text style={styles.buttonText}>Cancel order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNeedMoreTime} style={[styles.button, { backgroundColor: COLOR.ORANGECOLOR }]}>
              <Text style={styles.buttonText}>Need more time</Text>
            </TouchableOpacity>
          </View>
        )}
      </RBSheet>
    </>
  )
}

export default LiveTrackingClientSide;