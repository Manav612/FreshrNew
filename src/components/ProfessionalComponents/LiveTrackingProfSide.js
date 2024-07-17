import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import socketServices from '../../Services/Socket';
import { NavigationScreens } from '../../constants/Strings';
import LiveTrackingMap from '../LiveTrackingMap';

const LiveTrackingProfSide = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const { orderData } = route.params;
  const navigation = useNavigation();
  const [requestCount, setRequestCount] = useState(0);
  const [orderCancelled, setOrderCancelled] = useState(false);
  const timeoutRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const onRequestToStartOrder = (isManual = true) => {
    if (requestCount >= 2) {
      cancelOrder();
      return;
    }

    const newRequestCount = requestCount + 1;
    setRequestCount(newRequestCount);

    socketServices.emit('order_update', {
      recipient: orderData.sender,
      message: {
        type: 'Request_To_Start_Order',
        id: orderData.id,
        order_id: orderData.order_id,
        requestCount: newRequestCount,
      },
    });

    if (!isManual) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!orderCancelled) {
        onRequestToStartOrder(false);
      }
    }, 15000);

    setTimeRemaining(10);
  }

  const cancelOrder = () => {
    clearTimeout(timeoutRef.current);
    socketServices.emit('order_update', {
      recipient: orderData.sender,
      message: {
        type: 'Cancel_Order',
        id: orderData.id,
        order_id: orderData.order_id,
      },
    });
    setOrderCancelled(true);
    Alert.alert(
      "Order Cancelled",
      "The order has been cancelled due to no response from the client.",
      [{ text: "OK", onPress: () => navigation.navigate(NavigationScreens.ProfessionalBottomTab) }]
    );
  }

  useEffect(() => {
    const acceptListener = socketServices.on('Accept_To_Process_Order', data => {
      navigation.navigate(NavigationScreens.OrderProcessingScreenProfSideScreen, { data });
    });

    const needMoreTimeListener = socketServices.on('Need_More_Time_To_Process_Order', data => {
      Alert.alert("Client Needs More Time", "The client has requested more time before starting the order.");
    });

    return () => {
      clearTimeout(timeoutRef.current);
      socketServices.off('Accept_To_Process_Order', acceptListener);
      socketServices.off('Need_More_Time_To_Process_Order', needMoreTimeListener);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (timeRemaining > 0 && !orderCancelled) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (!orderCancelled) {
      setTimeRemaining(10);
    }

    return () => clearInterval(timer);
  }, [timeRemaining, orderCancelled]);

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
    infoColumnClient: {
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
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: Screen_Width,
      position: 'absolute',
      bottom: Screen_Height * 0.11
    },
    button: {
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: COLOR.ChartBlue,
      marginVertical: 5,
      borderRadius: 15,
      flexDirection: 'row',
    },
    buttonText: {
      color: COLOR.WHITE,
      fontWeight: 'bold',
      fontSize: 18,
      marginRight: 10
    },
    cancelText: {
      color: COLOR.RED,
      fontWeight: 'bold',
      fontSize: 18
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
                type: 'Location_ChangeSP',
                id: orderData.id,
                order_id: orderData.order_id,
                data,
              },
            });
          }}
          socketType={'Location_ChangeCLI'}
          staticCoordinate={orderData?.coordinates}
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
            <View style={[styles.infoColumn, styles.infoColumnClient]}>
              <Text style={styles.infoText}>Client</Text>
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

      {!orderCancelled && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => onRequestToStartOrder(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {requestCount === 2 ? "Last reminder: Request to Start order" :
                requestCount === 1 ? "Re-send Request to Start order" :
                  "Request to Start order"}
            </Text>
            <Text style={styles.buttonText}>
              ({timeRemaining}s)
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {orderCancelled && (
        <View style={styles.buttonContainer}>
          <Text style={styles.cancelText}>
            Order has been cancelled due to no response from the client.
          </Text>
        </View>
      )}
    </>
  )
}

export default LiveTrackingProfSide;