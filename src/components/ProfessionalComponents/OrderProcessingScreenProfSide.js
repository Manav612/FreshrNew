import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import socketServices from '../../Services/Socket';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { navigationToReset } from '../../constants/NavigationController';
import FastImage from 'react-native-fast-image';
import { Loader } from '../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderProcessingScreenProfSide = ({ route }) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const { data } = route.params
  const [applySelected, setApplySelected] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [GetOneOrder, setGetOneOrder] = useState('')
  const [rating, setRating] = useState(4);

  const navigation = useNavigation()
  const [name, setName] = useState('');
  const handleNameChange = (text) => {
    setName(text);
  };
  const onRequestToEnd = () => {
    console.log("===========   endddddd orderr   hiiii =========");
    const id = data.sender;
    socketServices.emit('order_update', {
      recipient: id,
      message: {
        type: 'Request_To_End_Order',
        id: id,
        order_id: data.message.order_id,
      },
    });
  }

  socketServices.on('Accept_To_End_Order', data => {
    console.log("ACCEPT END ORDER Calllllllllllllll : ", data);
    setModalVisible(true);
  });

  socketServices.on('Unhappy_To_End_Order', data => {
    console.log("Unhappy to end order : ", data);
  });

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
      <View style={{ height: Screen_Height * 0.5, width: Screen_Width * 0.8, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, shadowColor: COLOR.BLACK_70, elevation: 2, borderRadius: 15 }}>
        <Text style={{ fontSize: 24, color: COLOR.BLACK, fontWeight: "800", marginVertical: 15 }}>Order is Processing</Text>
        <FastImage
          style={{ width: 50, height: 50, marginVertical: 15 }}
          source={Loader}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{ fontSize: 20, color: COLOR.BLACK, fontWeight: "800", marginVertical: 15 }}>Request order completion</Text>
        <TouchableOpacity onPress={onRequestToEnd} style={{ backgroundColor: COLOR.ChartBlue, height: 50, width: Screen_Width * 0.6, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: COLOR.WHITE }}>Send request</Text>
        </TouchableOpacity>
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
                placeholder="Write review"
                placeholderTextColor={COLOR.GRAY}
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
            <TouchableOpacity
              // onPress={HandleReview}
              onPress={() => {
                setModalVisible(false), navigationToReset(navigation, NavigationScreens.ProfessionalBottomTab)
              }}
              style={styles.writeReviewButton}>
              <Text style={styles.writeReviewText}>Leave a Review</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setModalVisible(false), navigationToReset(navigation, NavigationScreens.ProfessionalBottomTab)
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default OrderProcessingScreenProfSide

