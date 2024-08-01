

import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput, Alert, FlatList, ActivityIndicatorComponent, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';
import FastImage from 'react-native-fast-image';
import { Loader } from '../../constants/Icons';

const OrderProcessingScreenClientSide = ({ route }) => {
  const { services } = route.params
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [accept, setAccept] = useState('');
  const [orderId, setOrderId] = useState('');
  const [requestCount, setRequestCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [GetOneOrder, setGetOneOrder] = useState('')
  const [rating, setRating] = useState(4);
  const navigation = useNavigation()
  const authToken = useSelector(state => state.AuthReducer);
  const [name, setName] = useState('');
  const handleNameChange = (text) => {
    setName(text);
  };

  socketServices.on('Request_To_End_Order', data => {
    setAccept(data.sender);
    setOrderId(data.message.order_id);
    getOneOrder(data.message.order_id);
    setRequestCount(prevCount => prevCount + 1);
  });

  const onAcceptRequestEnd = () => {
    endOrder();
  }

  const onUnhappyPress = () => {
    if (requestCount >= 2) {
      // If this is the second or later request, end the order and show the review modal
      endOrder();
    } else {
      // For the first request, send the unhappy message as before
      socketServices.emit('order_update', {
        recipient: accept,
        message: {
          type: 'Unhappy_To_End_Order',
          id: accept,
          order_id: orderId,
        },
      });
    }
  }

  const endOrder = () => {
    // End the order for both client and professional
    socketServices.emit('order_update', {
      recipient: accept,
      message: {
        type: 'End_Order',
        id: accept,
        order_id: orderId,
      },
    });

    // Show review modal for client
    setModalVisible(true);
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
      setGetOneOrder(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ReviewData = async () => {
    try {
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



      if (res.data.status === 'success') {
        navigation.navigate(NavigationScreens.HomeScreen)
        Alert.alert('Review added successfully');
      } else {
        Alert.alert("technial error", res.data.message);
        navigation.navigate(NavigationScreens.HomeScreen)
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
    <View style={{ height: Screen_Height, width: Screen_Width, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: Screen_Width * 0.9, backgroundColor: COLOR.WHITE, justifyContent: 'center', alignItems: 'center', shadowColor: COLOR.BLACK_70, elevation: 2, borderRadius: 15 }}>
        <Text style={{ fontSize: 24, color: COLOR.BLACK, fontWeight: "800", marginVertical: 15, textAlign: 'center' }}>Order is Processing</Text>
        {accept ? null :
          <FastImage
            style={{ width: 50, height: 50, marginVertical: 15 }}
            source={Loader}
            resizeMode={FastImage.resizeMode.contain}
          />
        }
        <View style={{ height: Screen_Height * 0.17, marginBottom: 20, }}>
          <FlatList
            data={services}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginHorizontal: 10 }}
            // scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingHorizontal: 5 }}>
                  <View
                    //   onPress={() => handleSelect(item)}
                    style={{
                      backgroundColor: COLOR.WHITE,
                      marginVertical: 10,
                      // width: Screen_Width * 0.67,
                      height: Screen_Height * 0.15,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 10,
                      flexDirection: 'row',
                      elevation: 4,
                      shadowColor: COLOR.BLACK,
                      gap: 10

                    }}>
                    <FastImage
                      style={{
                        width: Screen_Width * 0.22,
                        height: Screen_Height * 0.15,
                        borderRadius: 10,

                      }}
                      source={{ uri: item?.photo }}
                    />
                    <View
                      style={{ flexDirection: 'column', gap: 5 }}>
                      <Text
                        style={{
                          color: COLOR.BLACK,
                          fontSize: 16,
                          fontWeight: '600',
                          paddingRight: 10,
                        }}
                        numberOfLines={1}
                      >
                        {item?.name}
                      </Text>
                      <Text
                        style={{
                          color: COLOR.BLACK,
                          fontSize: 16,
                          fontWeight: '300',
                          paddingRight: 10,
                        }}
                        numberOfLines={1}
                      >
                        {item?.category?.name}
                      </Text>
                      <Text
                        style={{
                          color: COLOR.BLACK_40,
                          fontSize: 14,
                          fontWeight: '600',
                          paddingRight: 10,
                          width: 170,
                        }}
                        numberOfLines={1}

                      >
                        {item.description.length > 40
                          ? `${item.description.slice(0, 40)}...`
                          : item.description}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: Screen_Width * 0.55,
                          alignItems: 'center',
                        }}

                      >
                        <Text
                          style={{
                            color: COLOR.ORANGECOLOR,
                            fontSize: 16,
                            fontWeight: '600',
                            paddingRight: 10,
                          }}
                          numberOfLines={1}

                        >
                          ${item?.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>



          {accept && (
            <>
              <Text style={{ fontSize: 18, color: COLOR.BLACK, fontWeight: "800", marginVertical: 15 }}>Professional requesting order completion</Text>

              <TouchableOpacity onPress={onAcceptRequestEnd} style={{ backgroundColor: COLOR.ChartBlue, height: 50, width: Screen_Width * 0.6, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.WHITE }}>Accept complete order</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onUnhappyPress} style={{ backgroundColor: COLOR.ORANGECOLOR, height: 50, width: Screen_Width * 0.6, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.WHITE }}>Not satisfied</Text>
              </TouchableOpacity>
            </>
          )}

        </View>

      </View>

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
            <Text style={styles.modalSubtitle}>Please rate your experience with the professional:</Text>
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
            <TouchableOpacity onPress={HandleReview} style={styles.writeReviewButton}>
              <Text style={styles.writeReviewText}>Leave a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => { setModalVisible(false), navigation.navigate(NavigationScreens.HomeScreen) }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={{ height: 100 }} />
    </View>
  )
}

export default OrderProcessingScreenClientSide