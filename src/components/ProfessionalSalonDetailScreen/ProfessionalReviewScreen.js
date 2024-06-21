import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { reviews } from '../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const ProfessionalReviewScreen = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
const navigation = useNavigation()
  const [reviewData, setReviewData] = useState(reviews);

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
    <View style={{
      marginTop: 12,
      rowGap: 7,
      paddingHorizontal: 6,
      width: Screen_Width * 0.92,
      height: Screen_Height * 0.15,
    }} 
    
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
    </View>
  );

  return (
    <View>
      <View style={{ justifyContent: 'space-between', marginTop: 10, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome name="star-half-empty" size={24} color={COLOR.ORANGECOLOR} />
          <Text style={{ marginLeft: 10, color: COLOR.BLACK_70, fontSize: 20 }}>4.8 (3,279 reviews)</Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '600', color: COLOR.ORANGECOLOR }} onPress={()=>navigation.navigate('ReviewsDetail Screen')}>See All</Text>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK_30, width: Screen_Width * 0.95, marginVertical: 20 }} />
      <FlatList
        data={reviewData}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  )
}

export default ProfessionalReviewScreen;

const styles = StyleSheet.create({});
