import { ScrollView, StyleSheet, Text, View, TouchableOpacity,FlatList } from 'react-native'
import React, { useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AllCategoryData1 } from '../../../components/utils';
import Cancelled from '../../../components/MyBookingDetails/Cancelled';
import Completed from '../../../components/MyBookingDetails/Completed';
import Upcoming from '../../../components/MyBookingDetails/Upcoming';

const MyBooking = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  const [selectedItem, setSelectedItem] = useState('Upcoming');

  const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: COLOR_LIGHT.GRAY, 
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: COLOR_LIGHT.ORANGECOLOR, 
    },
    CategoryContainer: {
        borderWidth: 2,
        borderColor: COLOR_LIGHT.ORANGECOLOR,
        marginLeft: 10,
        borderRadius: 30,
        height: 35,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    selectedItem: {
        backgroundColor: COLOR_LIGHT.ORANGECOLOR,
    },
    Categorytext: {
        fontWeight: '600',
        color: COLOR_LIGHT.ORANGECOLOR,
    },
    SelectedCategorytext: {
        color: COLOR_LIGHT.WHITE,
    },
    CategoryContainer: {
        borderWidth: 2,
        borderColor: COLOR.ORANGECOLOR,
        marginHorizontal: 5,
        borderRadius: 30,
        height: 40,
        width: 110,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:5,
    },
    selectedItem: {
        backgroundColor: COLOR.ORANGECOLOR,
    },
    Categorytext: {
        fontWeight: '500',
        fontSize:14,
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

  const AllCategory = ({ item, setSelectedItem }) => (
    <TouchableOpacity
        style={[
            styles.CategoryContainer,
            selectedItem === item.name && styles.selectedItem,
        ]}
        onPress={() => setSelectedItem(item.name)}
    >
        <View style={{ marginHorizontal: 13 }}>
            <Text
                style={[
                    styles.Categorytext,
                    selectedItem === item.name && styles.SelectedCategorytext,
                ]}
            >
                {item.name}
            </Text>
        </View>
    </TouchableOpacity>
);

const renderScreen = () => {
    switch (selectedItem) {
        case 'Upcoming':
            return <Upcoming />;
        case 'Completed':
          return <Completed />;
        case 'Cancelled':
          return <Cancelled />;
        default:
            return null;
    }
};
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 ,backgroundColor:COLOR.WHITE}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('My Profile Screen')} style={{ width: 40, backgroundColor: COLOR.ORANGECOLOR, height: 40, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 30 }}>F</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: '800', fontSize: 25, color: COLOR.BLACK }}>My Booking</Text>
        </View>
        {/* <AntDesign name="search1" size={30} color={COLOR.GRAY} /> */}
        {/* <View style={{ flexDirection: 'row', gap: 10 }}>
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
        </View> */}
      </View>
      <View>
        <FlatList
          data={AllCategoryData1}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <AllCategory item={item} setSelectedItem={setSelectedItem} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
        <View>{renderScreen()}</View>

    </ScrollView>
  )
}

export default MyBooking

const styles = StyleSheet.create({})