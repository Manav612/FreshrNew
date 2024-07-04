import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreens } from '../../../constants/Strings';

const ConformLocation = ({route}) => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [house, setHouse] = useState('');
    const [apartment, setApartment] = useState('');
    const {CurrentAddress}= route.params
    const handleHouseChange = (text) => {
        setHouse(text);
      };
    
    const handleApartmentChange = (text) => {
        setApartment(text);
      };
    


    const styles = StyleSheet.create({
        container: {
            width: Screen_Width,
            height: Screen_Height,
            paddingHorizontal: 15,
            backgroundColor: COLOR.WHITE
        },
        header: {
            marginVertical: 10,marginBottom:30
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 1,
            marginBottom: 20
        },
        locationText: {
            marginLeft: 5,
            flex: 1
        },
        locationTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        locationSubtitle: {
            fontSize: 14,
            color: COLOR.GRAY,
            marginTop: 4
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth:1,
            borderBottomColor:COLOR.GRAY,
            paddingHorizontal: 10,
            marginBottom: 20
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: COLOR.BLACK,
            paddingVertical: 10
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={26} color={COLOR.BLACK} />
            </View>
            <View style={styles.locationContainer}>
                <MaterialIcons
                    name="location-on"
                    size={24}
                    color={COLOR.ORANGECOLOR}
                />
                <Text style={{ color: COLOR.BLACK, fontSize: 16,flex:1 }} numberOfLines={3}>
                {CurrentAddress}
              </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="HOUSE/FLAT/BLOCK NO."
                    placeholderTextColor={COLOR.GRAY}
                    value={house}
                    onChangeText={handleHouseChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="APARTMENT/ROAD/AREA"
                    placeholderTextColor={COLOR.GRAY}
                    value={apartment}
                    onChangeText={handleApartmentChange}
                />
            </View>
            <TouchableOpacity
            style={{
                justifyContent: 'center',
                borderRadius: 10,
                alignItems: 'center',
                height: Screen_Height * 0.05,
                backgroundColor: COLOR.ORANGECOLOR,
                marginHorizontal: 15,
                marginVertical:10,
              
              }}
              onPress={()=>navigation.navigate(NavigationScreens.HomeScreen)}
              >
                <Text style={{color:COLOR.WHITE,fontSize:16}}>SAVE AND PROCEED</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ConformLocation