import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, FlatList, Image, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState,useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Category from '../../../components/Category';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Filter, barber } from '../../../constants/Icons';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileData } from '../../../components/utils';
const MyBookMarkScreen = () => {
  const navigation = useNavigation()
  const [activeTab, setActiveTab] = useState('Delivery');
  const [FetchDataOfFav, setFetchDataOfFav] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const theme = useSelector(state => state.ThemeReducer);

  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [searchText, setSearchText] = useState('');
  const styles = StyleSheet.create({
    HeaderView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    HeaderText: { color: COLOR.BLACK, fontSize: 22, fontWeight: '600', marginLeft: 10 },
  });
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    DeleteDataForFav(),fetchDataForFav().then(() => setRefreshing(false));
  }, []);

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
  useEffect(() => {
    fetchDataForFav()
  
  }, [])
  const fetchDataForFav = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      const res = await axios.get(`${BASE_API_URL}/users/favorites/professionals`, config);
      console.log('========    list of fav  ============', res.data.data.user);
      setFetchDataOfFav(res.data.data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const DeleteDataForFav = async (_id) => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      console.log("toerkm",token);
      const res = await axios.delete(`${BASE_API_URL}/users/favorites`,{
        data:{professional: _id},headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(res.status == 200){
        Alert.alert("Success", "Professional Deleted from Favorites");
        fetchDataForFav()
      }
      // console.log('========    list of fav  ============', res.data.data.user);
    } catch (error) {
      console.error("Erroxr:", error.message);
    }
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }} 
    
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}


    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
          alignItems: 'center',
        }}>
        <View style={styles.HeaderView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Following</Text>
        </View>
        <TouchableOpacity>
          <FastImage source={Filter} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={30}
            color={COLOR.BLACK}
          />
        </TouchableOpacity> */}
      </View>
      <View style={{ borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: COLOR.WHITE, marginVertical: 10, marginHorizontal: 10, padding: 10, elevation: 2, shadowColor: COLOR.BLACK }}>
        <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 16 }}>Delivery Options</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'center', gap: 30, marginVertical: 5 }}>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Delivery' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Delivery') }}>
            <Text style={{ color: activeTab === 'Delivery' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>Comes to You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 150, height: 50, backgroundColor: activeTab === 'Salon' ? COLOR.ORANGECOLOR : COLOR.GULABI, borderRadius: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLOR.ORANGECOLOR }} onPress={() => { setActiveTab('Salon') }}>
            <Text style={{ color: activeTab === 'Salon' ? COLOR.WHITE : COLOR.ORANGECOLOR, fontWeight: '600' }}>In Salon</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(NavigationScreens.ScheduledeliveryScreen)}
        style={{
          width: Screen_Width * 0.92,
          height: 40,
          backgroundColor: COLOR.ORANGECOLOR,
          justifyContent: 'center',
          borderRadius: 35,
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20
        }}
      >
       
        <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE, fontWeight: 'bold' }}>
          Schedule
        </Text>
        <AntDesign name="calendar" size={20} color={COLOR.WHITE} />
      </TouchableOpacity>

      <View style={{ marginVertical: 5, borderRadius: 15 }}>
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
            <View style={{ borderRadius: 15, marginHorizontal: 5 }}>
              <FastImage
                source={item.img}
                style={{ width: Screen_Width * 0.9, height: 200, resizeMode: 'cover', borderRadius: 15 }}
              />
            </View>
          )}
        />
      </View>
  
        <FlatList
        data={FetchDataOfFav}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        style={{ flex: 1 }}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (

            <TouchableOpacity onPress={() => DeleteDataForFav(item.professional._id)} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, backgroundColor: COLOR.WHITE, height: Screen_Height * 0.15, borderRadius: 15, shadowColor: COLOR.BLACK, elevation: 3, marginHorizontal: 15 }}>
              <View style={{ paddingHorizontal: 15, marginHorizontal: 5, flexDirection: "row", justifyContent: 'flex-start', gap: 30, alignItems: 'center' }}>
                <FastImage source={barber} style={{ width: Screen_Width * 0.20, height: Screen_Height * 0.09, borderRadius: 10 }} />
                <View>
                  <Text style={{ color: COLOR.BLACK, fontSize: 16, fontWeight: '600' }}>{item?.professional?.user.firstName}{" "}{item?.user?.lastName}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => DeleteDataForFav(item.professional._id)}>
                <View style={{ height: 90, width: 30 }}>
                  <MaterialCommunityIcons
                    name="bookmark"
                    size={25}
                    color={COLOR.ORANGECOLOR}
                  />
                </View>
              </TouchableOpacity>

            </TouchableOpacity>
          )
        }}
      />
      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

export default MyBookMarkScreen;



