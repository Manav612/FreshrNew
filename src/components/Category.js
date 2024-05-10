import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Scale, Screen_Height, Screen_Width} from '../constants/Constants';
  import {Hair1} from '../constants/Icons';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {
    COLOR_DARK,
    COLOR_LIGHT,
    GRADIENT_COLOR_DARK,
    GRADIENT_COLOR_LIGHT,
  } from '../constants/Colors';
  import {useSelector} from 'react-redux';
  
  const Category = () => {
    const [selectedItem, setSelectedItem] = useState(null);
  
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
    const data = [
      {id: '1', text: 'All'},
      {id: '2', text: 'Haircuts'},
      {id: '3', text: 'Make up'},
      {id: '4', text: 'Manicure'},
      {id: '5', text: 'Make up'},
    ];
    const data2 = [
      {
        id: '1',
        text: 'Belle curls',
        address: '0993 novick parkway',
        km: '12 km',
        rating: '4.8',
      },
      {
        id: '2',
        text: 'Haircuts',
        address: '88 commercial plaza',
        km: '12 km',
        rating: '4.8',
      },
      {
        id: '3',
        text: 'Make up',
        address: '9 Evergreen drive',
        km: '12 km',
        rating: '4.8',
      },
      {
        id: '4',
        text: 'Manicure',
        address: '65220 Holy Cross pass',
        km: '12 km',
        rating: '4.8',
      },
      {
        id: '5',
        text: 'Make up',
        address: '9 Evergreen drive',
        km: '12 km',
        rating: '4.8',
      },
      {
        id: '6',
        text: 'Make up',
        address: '9 Evergreen drive',
        km: '12 km',
        rating: '4.8',
      },
    ];
    const filteredData = selectedItem ? data2.filter(item => item.text === 'Haircuts') : data2;
    const styles = StyleSheet.create({
        CategoryContainer: {
          borderWidth: 2,
          borderColor:COLOR.ORANGECOLOR,
          marginLeft: 10,
          borderRadius: 30,
          height: 35,
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
        },
        selectedItem: {
          backgroundColor:COLOR.ORANGECOLOR,
        },
        Categorytext: {
          fontWeight: '500',
          color:COLOR.ORANGECOLOR,
        },
        SelectedCategorytext: {
          color:COLOR.WHITE,
        },
        CardContainer: {
          elevation: 2,
          backgroundColor:COLOR.WHITE,
          marginLeft: 10,
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
          selectedItem === item.id && styles.selectedItem,
        ]}
        onPress={() => setSelectedItem(item.id)}>
        <View
          style={{
            marginHorizontal: 13,
          }}>
          <Text
            style={[
              styles.Categorytext,
              selectedItem === item.id && styles.SelectedCategorytext,
            ]}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
    const Card = ({item}) => (
      <View style={styles.CardContainer}>
        <TouchableOpacity
          style={{
            marginHorizontal: 13,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.CardImage} source={Hair1} />
            <View style={styles.CardContain}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
                {item.text}
              </Text>
              <Text style={{color: 'gray'}}>{item.address}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: 110,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={18}
                    color={COLOR.PRIMARYMANGO}
                  />
                  <Text style={{color: 'black'}}>{item.km}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <MaterialCommunityIcons
                    name="star-half-full"
                    size={18}
                    color={COLOR.PRIMARYMANGO}
                  />
                  <Text style={{color: 'black'}}>{item.rating}</Text>
                </View>
              </View>
            </View>
            <View style={{height: 90, width: 30}}>
              <MaterialCommunityIcons
                name="bookmark"
                size={25}
                color={COLOR.PRIMARYMANGO}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
    return (
      <View>
        <View style={{marginHorizontal: 10}}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={AllCategory}
            horizontal
          />
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={Card}
          />
        </View>
      </View>
    );
  };
  
  export default Category;
  

