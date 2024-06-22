import { ScrollView,StyleSheet, Text, View,TextInput,TouchableOpacity,FlatList,Image } from 'react-native'
import React, { useState } from 'react'
import {Screen_Height,Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { data2 } from '../../../components/utils';
import { Hair1 } from '../../../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Mackup = () => {
  const navigation = useNavigation()
  const [searchText, setSearchText] = useState('');
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

  const [bookmarkStatus, setBookmarkStatus] = useState({});

  const toggleBookmark = (itemId) => {
    setBookmarkStatus(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleSearch = () => {
        const newData = data2.filter(item => {
            const itemData = `${item.text.toUpperCase()}`;
            const searchTextData = searchText.toUpperCase();
            return itemData.indexOf(searchTextData) > -1;
        });
        setFilteredData(newData);
    };


  const styles = StyleSheet.create({
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
  });

  const Card = ({ item }) => (
    <View style={styles.CardContainer}>
      <TouchableOpacity
                style={{
                    marginHorizontal: 13,
                }} onPress={()=>navigation.navigate('Booking')}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.CardImage} source={Hair1} />
          <View style={styles.CardContain}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
              {item.text}
            </Text>
            <Text style={{ color: 'gray' }}>{item.address}</Text>
            <View style={{ flexDirection: 'row', width: 110, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={18}
                  color={COLOR.ORANGECOLOR}
                />
                <Text style={{ color: 'black' }}>{item.km}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons
                  name="star-half-full"
                  size={18}
                  color={COLOR.ORANGECOLOR}
                />
                <Text style={{ color: 'black' }}>{item.rating}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
            <View style={{ height: 90, width: 30 }}>
              <MaterialCommunityIcons
                name={bookmarkStatus[item.id] ? "bookmark" : "bookmark-outline"}
                size={25}
                color={COLOR.ORANGECOLOR}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
      <ScrollView style={{ width: Screen_Width, height: Screen_Height,paddingHorizontal:15,backgroundColor:COLOR.WHITE }}>
      <View style={{width:Screen_Width,height:Screen_Height*0.05,flexDirection:'row',alignItems:'center',gap:15,marginVertical:10}}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{fontWeight:'600',fontSize:25,color:COLOR.BLACK}}>Mack Up</Text>
      </View>  
      <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.91, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10 }}>
        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <AntDesign name="search1" size={30} color={COLOR.GRAY} />
          <TextInput
            placeholder='Search'
            placeholderTextColor={COLOR.GRAY}
            style={{ fontSize: 20, color: COLOR.BLACK,width:250 }}
            onChangeText={text => { setSearchText(text)
              handleSearch();
            }}  
          />
        </View>
        <TouchableOpacity>
          <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={searchText ? filteredData : data2}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Card item={item} />}
        />
      </View>
      
    </ScrollView>
  )
}

export default Mackup

const styles = StyleSheet.create({})