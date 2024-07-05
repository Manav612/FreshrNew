import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Width } from '../../constants/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';

const OrderProcessingScreenClientSide = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [accept, setAccept] = useState('');  
  const [orderId, setOrderId] = useState('');

  const [applySelected, setApplySelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [GetOneOrder,setGetOneOrder]=useState('')
  const [rating, setRating] = useState(4);
  const navigation = useNavigation()
  const authToken = useSelector(state=>state.AuthReducer);
  const [name, setName] = useState('');
  const handleNameChange = (text) => {
    setName(text);
  };

  socketServices.on('Request_To_End_Order', data => {
    console.log("END ORDER Calllllllllllllll: ", data);
    
    setAccept(data.sender);
    
setOrderId(data.message.order_id);
getOneOrder(data.message.order_id);
  });

  const onAcceptRequestEnd = () => {
    setModalVisible(true);
    setApplySelected('Accept request to end order')


    socketServices.emit('order_update', {
      recipient: accept,
      message: {
        type: 'Accept_To_End_Order',
        id: accept,
        order_id :orderId,
      },
    });
  }

  const onUnhappyPress = () => {
    setApplySelected('unhappy')
    socketServices.emit('order_update', {
      recipient: accept,
      message: {
        type: 'Unhappy_To_End_Order',
        id: accept,
        order_id :orderId,
      },
    });
  }

  const HandleReview = () => {
    ReviewData();
  }

  const getOneOrder = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
        const res = await axios.get(`${BASE_API_URL}/orders/${id}`, config);
        console.log('===========  our orderrrrr  ==========', res.data.data)
        setGetOneOrder(res.data.data);
    } catch (error) {
        console.error("Error:", error);
    }
};

  const ReviewData = async () => {
    try {
      console.log('==========>', authToken);
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      let data = {};

      data['professional'] = GetOneOrder.professional;   
      data['service'] = GetOneOrder.services;    
      data['facility'] = GetOneOrder.facility || null;
      data['description'] = name;
      data['rating'] = rating;
      data['reviewType'] = 'client';     

      const res = await axios.post(
        `${BASE_API_URL}/review/`,
        data,
        config,
      );

      console.log('Response data:', res.data);
      console.log('Response status:', res.status);

      if (res.data.status === 'success') {
        navigation.navigate(NavigationScreens.HomeScreen)
        Alert.alert('review added successfull');
      } else {
        Alert.alert(res.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred', error.message);
    }
  };

  const styles = StyleSheet.create({
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
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Order is Processing</Text>

      <Text>loading.......</Text>
      {accept && (
        <>
          <TouchableOpacity onPress={onAcceptRequestEnd}>
            <Text>Accept request to end order</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onUnhappyPress}>
            <Text>unhappy</Text>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>

            <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>

              <TouchableOpacity onPress={onAcceptRequestEnd} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Accept request to end order</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onUnhappyPress} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>unhappy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )
      }
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
            <Text style={styles.modalSubtitle}>Please rate your experience with the following Pros/Locations:</Text>
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
                placeholder="Right Review"
                placeholderTextColor={COLOR.GRAY}
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
            <TouchableOpacity onPress={HandleReview} style={styles.writeReviewButton}>
              <Text style={styles.writeReviewText}>Leave a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {setModalVisible(false), navigation.navigate(NavigationScreens.HomeScreen)}}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default OrderProcessingScreenClientSide

const styles = StyleSheet.create({})
