import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { data2 } from './utils';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../constants/Colors';
import { Scale, Screen_Height, Screen_Width } from '../constants/Constants';
import { Hair1 } from '../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { BASE_API_URL } from '../Services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Category = () => {
  const [selectedItem, setSelectedItem] = useState('All');
  const [fetchedData, setFetchedData] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const navigation = useNavigation();



  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities`, config);
      setFetchedData(res.data.facilities.facility);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleBookmark = (itemId) => {
    setBookmarkStatus(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const filteredData = selectedItem === 'All' ? fetchedData : fetchedData.filter(item => item.name.toLowerCase().includes(selectedItem.toLowerCase()));

  const styles = StyleSheet.create({
    CategoryContainer: {
      borderWidth: 2,
      borderColor: COLOR.ORANGECOLOR,
      marginHorizontal: 5,
      borderRadius: 30,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
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
      elevation: 3,
      shadowColor: COLOR.BLACK,
      backgroundColor: COLOR.WHITE,
      borderRadius: 25,
      height: Screen_Height * 0.14,
      width: Screen_Width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 2,
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
      width: Screen_Width * 0.5,
      paddingVertical: 5,
      justifyContent: 'center',

    },
  });

  const Card = ({ item }) => (
    <View style={styles.CardContainer}>
      <TouchableOpacity style={{ width: Screen_Width * 0.85, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => navigation.navigate('Booking', { facilitiesData: item })}>

        <FastImage style={styles.CardImage} source={{ uri: item?.coverImage }} />
        <View style={styles.CardContain}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
            {item?.name}
          </Text>
          <Text style={{ color: COLOR.BLACK_70 }}>{item?.description}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="map-marker" size={18} color={COLOR.ORANGECOLOR} />
              <Text style={{ color: COLOR.BLACK }}>
                {item?.formattedAddress && item.formattedAddress.length > 40
                  ? `${item.formattedAddress.slice(0, 40)}...`
                  : item?.formattedAddress}
              </Text>
            </View>
            {/* <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="star-half-full" size={18} color={COLOR.ORANGECOLOR} />
                <Text style={{ color: 'black' }}>{item.rating}</Text>
              </View> */}
          </View>
        </View>
        <TouchableOpacity onPress={() => { toggleBookmark(item.id) }}>
          <View style={{ height: 90, width: 30 }}>
            <MaterialCommunityIcons
              name={bookmarkStatus[item.id] ? "bookmark" : "bookmark-outline"}
              size={25}
              color={COLOR.ORANGECOLOR}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          style={{ flex: 1 }}
          scrollEnabled={false}
          renderItem={({ item }) => <Card item={item} />}
        />
      </View>
    </View>
  );
};

export default Category;
