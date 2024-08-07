import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { barber, OnBoard1 } from '../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MapScreen2 from '../../screens/MapScreen2';

const Pending = () => {
  const [timeLeft, setTimeLeft] = useState(120);
  const [visible, setVisible] = useState(true);
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const [directionModalVisible, setDirectionModalVisibility] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const styles = StyleSheet.create({
    container: {
      height: Screen_Height,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: Screen_Width * 0.9,
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      width: Screen_Width * 0.32,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 12,
    },
    timerText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    Container: {
      margin: 20,
      borderRadius: 15,
      backgroundColor: '#fff',
    },
    ContentContainer: {
      padding: 15,
      paddingTop: 60,
    },
    IdContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    IdText: {
      fontSize: 14,
      color: '#000',
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
      padding: 15,
      borderWidth: 1,
      borderColor: COLOR.BLACK,
      borderRadius: 15,
      marginTop: 15,
      backgroundColor: COLOR.WHITE,
      shadowOpacity: 0.1,
      shadowOffset: { height: 2 },
      shadowRadius: 2,
    },
    MapContainer: {
      width: '100%',
      height: Screen_Height * 0.4,
      borderRadius: 10,
      overflow: 'hidden',
      marginVertical: 10,
    },
    DateTimeContainer: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#f1f1f1',
    },
    BlackContainer: {
      backgroundColor: 'rgba(241,148,54,1)',
      flexDirection: 'row',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 7,
      alignItems: 'center',
      height: 45,
      shadowOpacity: 0.1,
      shadowOffset: { height: 1 },
      shadowRadius: 1,
    },
    WhiteText: {
      color: COLOR.WHITE,
      fontSize: 9,
      fontWeight: 'bold',
      textTransform: 'uppercase',
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
      width: 60,
      height: 60,
      aspectRatio: 1 / 1,
      borderRadius: 7,
    },
    UserName: {
      flex: 1,
      marginLeft: 10,
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
      color: '#000',
      textAlign: 'center',
      fontWeight: '600',
    },
    DescText: {
      fontSize: 14,
      color: '#929292',
      marginTop: 15,
    },
  });

  useEffect(() => {
    // if (!visible) {
    //     setTimeLeft(120); // Reset timer when modal is closed
    //     return;
    // }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 120; // Reset to 2 minutes
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


  return (
    <View style={styles.modalContainer}>
      <MapScreen2 />

      <View style={{ height: 100 }} />
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
              }>{`Please head to \n designated location`}</Text>
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
                  backgroundColor: COLOR.ORANGECOLOR,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLOR.WHITE,
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

export default Pending;

const styles = StyleSheet.create({});
