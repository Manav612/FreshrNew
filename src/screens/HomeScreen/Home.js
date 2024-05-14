import { ScrollView, StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { Scale, Screen_Height, Screen_Width } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { haircuts, mackup, manicure, massage } from '../../constants/Icons';
import { ProfileData } from '../../components/utils';
import { useNavigation } from '@react-navigation/native';
import Category from '../../components/Category';
const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation()


  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPage < ProfileData.length - 1) {
        flatListRef.current.scrollToIndex({ animated: true, index: currentPage + 1 });
        setCurrentPage(currentPage + 1);
      } else {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        setCurrentPage(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPage, ProfileData.length]);

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
      <View style={{ height: Screen_Height * 0.08, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('My Profile Screen')} style={{ width: 50, backgroundColor: COLOR.ORANGECOLOR, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 40 }}>F</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: COLOR.BLACK, fontSize: 20 }}>Manav</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="location-pin" size={15} color={COLOR.BLACK} />
              <Text style={{ color: COLOR.BLACK }}>Mumbai</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notification Screen')}>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=>navigation.navigate('My Book Mark Screen')}>

          <Feather name="bookmark" size={30} color="black" />
          </TouchableOpacity> */}
        </View>
      </View>
      <Text style={{ fontWeight: '900', fontSize: 30, color: COLOR.BLACK, paddingHorizontal: 15, marginVertical: 10 }}>Morning,Daniel👋</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')} style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.91, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} >
          <AntDesign name="search1" size={30} color={COLOR.GRAY} />
          <Text style={{ fontSize: 20, color: COLOR.GRAY }} >Search</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilter Screen')}>
          <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{ marginVertical: 10, borderRadius: 15 }}>
        <FlatList
          ref={flatListRef}
          data={ProfileData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.floor(offset / Screen_Width);
            setCurrentPage(index);
          }}
          renderItem={({ item }) => (
            <View style={{ borderRadius: 15, marginHorizontal: 10 }}>
              <Image
                source={item.img}
                style={{ width: Screen_Width * 0.88, height: 200, resizeMode: 'cover', borderRadius: 15 }}
              />
            </View>
          )}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', bottom: 25, borderRadius: 15 }}>
        {ProfileData.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === currentPage ? 'white' : '#FFC02D',
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Haircut Screen')} style={{ width: 60, height: 60, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={haircuts} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: COLOR.BLACK, fontSize: 14 }}>Haircuts</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Mackup Screen')} style={{ width: 60, height: 60, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={mackup} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: COLOR.BLACK, fontSize: 14 }}>Mack up</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Manicure Screen')} style={{ width: 60, height: 60, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={manicure} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: COLOR.BLACK, fontSize: 14 }}>Manicure</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Massage Screen')} style={{ width: 60, height: 60, backgroundColor: COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={massage} style={{ width: 30, height: 30, resizeMode: 'cover' }} />
          </TouchableOpacity>
          <Text style={{ fontWeight: '600', color: COLOR.BLACK, fontSize: 14 }}>Massage</Text>
        </View>
      </View>
      <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Nearby Your Location</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NearbyYourLocation Screen')} ><Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>See all</Text></TouchableOpacity>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Category />
      </View>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', marginVertical: 10 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK }}>Most Popular</Text>
        <Text style={{ color: COLOR.ORANGECOLOR }}>See all</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Category />
      </View>


    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})