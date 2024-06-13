import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { data, data2 } from './utils';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../constants/Colors';
import { Scale, Screen_Height, Screen_Width } from '../constants/Constants';
import { Hair1 } from '../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import FastImage from 'react-native-fast-image';

const Category = () => {
    const [selectedItem, setSelectedItem] = useState('All');
    const [selectedBookmarkItem, setSelectedBookmarkItem] = useState(null); // State to hold selected bookmark item

    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const navigation = useNavigation();
    const [bookmarkStatus, setBookmarkStatus] = useState({});
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const refRBSheet = useRef([]);

    

    const toggleBookmark = (itemId) => {
        setBookmarkStatus(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));
    };

    const filteredData = selectedItem === 'All' ? data2 : data2.filter(item => item.text.toLowerCase().includes(selectedItem.toLowerCase()));


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

  const AllCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.CategoryContainer,
        selectedItem === item.text && styles.selectedItem,
      ]}
      onPress={() => setSelectedItem(item.text)}>
      <View
        style={{
          marginHorizontal: 13,
        }}>
        <Text
          style={[
            styles.Categorytext,
            selectedItem === item.text && styles.SelectedCategorytext,
          ]}>
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );


    const Card = ({ item }) => (
        <View style={styles.CardContainer}>
            <TouchableOpacity
                style={{
                    marginHorizontal: 13,
                }} onPress={() => navigation.navigate('Booking')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage style={styles.CardImage} source={Hair1} />
                    <View style={styles.CardContain}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
                            {item.text}
                        </Text>
                        <Text style={{ color: 'gray' }}>{item.address}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: 110,
                                justifyContent: 'space-between',
                            }}>
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
                    <TouchableOpacity onPress={() => { toggleBookmark(item.id)}}>
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
        <View>
            {/* <View>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <AllCategory item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View> */}
            <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
                <FlatList
                    data={filteredData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Card item={item} />}
                />
            </View>
        </View>
    );
};

export default Category;
