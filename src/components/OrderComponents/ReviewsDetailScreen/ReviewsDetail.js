import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { reviews, starData } from '../../utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

const ReviewsDetail = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const [reviewData, setReviewData] = useState(reviews);
  const [selectedItem, setSelectedItem] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState('Very good service and satisfying results 🔥');

  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleLikePress = (id) => {
    const updatedReviews = reviewData.map(review => {
      if (review.id === id) {
        return { ...review, liked: !review.liked };
      } else {
        return review;
      }
    });
    setReviewData(updatedReviews);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{
      marginTop: 12,
      rowGap: 7,
      paddingHorizontal: 6,
      width: Screen_Width * 0.92,
      height: Screen_Height * 0.15,
    }}
      onPress={() => setModalVisible(true)}
    >
      <View style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image style={{ width: Screen_Width * 0.12, height: Screen_Height * 0.06, borderRadius: 99 }} source={item.image} />
          <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: '600' }}>{item.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ width: Screen_Width * 0.16, height: Screen_Height * 0.032, borderWidth: 2, borderColor: COLOR.ORANGECOLOR, gap: 6, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderRadius: 12 }}>
            <Entypo name="star" size={20} color={COLOR.ORANGECOLOR} />
            <Text style={{ fontSize: 16, color: COLOR.ORANGECOLOR }}>{item.rating}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ color: COLOR.BLACK_70, fontSize: 14, fontWeight: '600', paddingRight: 10 }}>{item.txt}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <TouchableOpacity onPress={() => handleLikePress(item.id)}>
          <Entypo name={item.liked ? "heart" : "heart-outlined"} size={28} color={item.liked ? "red" : COLOR.BLACK} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 16, color: COLOR.BLACK }}>{item.like2}</Text>
        </View>
      </View>


    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginHorizontal: 5,
      borderRadius: 30,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20
    },
    selectedItem: {
      backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
      fontWeight: '500',
      color: COLOR.ORANGECOLOR,
    },
    SelectedCategorytext: {
      color: COLOR.WHITE,
    },
    CardContainer: {
      elevation: 2,
      backgroundColor: COLOR.WHITE,
      borderRadius: 25,
      height: Screen_Height * 0.14,
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    CardImage: {
      width: 80,
      height: 80,
      resizeMode: 'cover',
      borderRadius: 15,
    },
    CardContain: {
      height: 90,
      width: 180,
      paddingVertical: 5,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    centeredView: {
     
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    modalView: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    subText: {
      fontSize: 14,
      textAlign: 'center',
      color: 'gray',
      marginBottom: 20,
    },
    ratingContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#f39c12',
      borderRadius: 5,
      padding: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    cancelText: {
      color: 'gray',
      marginTop: 10,
    },
  });

  const AllCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.name && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.name)}>
      <View
        style={{
          marginHorizontal: 13,
          flexDirection: 'row', gap: 10
        }}>
        <Entypo name="star" size={20} color={selectedItem === item.name ? COLOR.WHITE : COLOR.ORANGECOLOR} />
        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.name && styles.SelectedCategorytext,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10
        }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />

          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>
            Reviews
          </Text>
        </View>

        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={28}
            color={COLOR.BLACK}
          />
        </TouchableOpacity>

      </View>
      <FlatList
        data={starData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AllCategory item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
          <Text style={{ marginLeft: 10, color: COLOR.BLACK_70, fontSize: 20 }}>4.8 (3,279 reviews)</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
      <FlatList
        data={reviewData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
     
    </View>
     <Modal
     animationType="slide"
     transparent={true}
     visible={modalVisible}
     onRequestClose={()=>setModalVisible(false)}
   >
     <View style={styles.centeredView}>
       <View style={styles.modalView}>
         <FontAwesome name="pencil" size={48} color="#f39c12" />
         <Text style={styles.modalText}>You have done using barber/salon service</Text>
         <Text style={styles.subText}>Please leave your review so others people can know your opinion</Text>

         <View style={styles.ratingContainer}>
           {[1, 2, 3, 4, 5].map((star) => (
             <TouchableOpacity key={star} onPress={() => handleRating(star)}>
               <FontAwesome
                 name={star <= rating ? 'star' : 'star-o'}
                 size={32}
                 color="#f39c12"
               />
             </TouchableOpacity>
           ))}
         </View>

         <TextInput
           style={styles.input}
           value={review}
           onChangeText={setReview}
         />

         <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
           <Text style={styles.buttonText}>Write Review</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => setModalVisible(false)}>
           <Text style={styles.cancelText}>Cancel</Text>
         </TouchableOpacity>
       </View>
     </View>
   </Modal>
   </>
  )
}

export default ReviewsDetail;
