import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Hair1, barber } from '../../../constants/Icons';
import { FacilityData } from '../../../components/utils';
import { Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';
import FacilitySettingScreen from '../../../components/FacilityComponents/FacilitySettingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';

const FacilityFacilitiesScreen = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [fetchedData, setFetchedData] = useState([]);
console.log("===========   fetchedData      =============",fetchedData);
    useEffect(() => {

        fetchData();
      }, []);
 
    
      const fetchData = async () => {
        try {
          const token = await AsyncStorage.getItem("AuthToken");
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const res = await axios.get(`${BASE_API_URL}/users/facilities/`, config);
          console.log('========  user facilty   ============', res.data.data);
          setFetchedData(res.data.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,

        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            marginRight: 15,
        },
        name: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        role: {
            fontSize: 14,
            color: COLOR.GRAY,
        },
        menuIcon: {
            marginLeft: 'auto',
        },
        menuText: {
            fontSize: 24,
        },
        earningsContainer: {
            marginVertical: 20,
            padding: 20,
            backgroundColor: COLOR.BLACK,
            borderRadius: 10,
            alignItems: 'center',
        },
        earningsText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        earningsSubText: {
            fontSize: 16,
            color: COLOR.GRAY,
        },

    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:COLOR.WHITE}}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Image style={styles.avatar} source={barber} />
                        <View>
                            <Text style={styles.name}>Nathan Alexander</Text>
                            <Text style={styles.role}>Senior Barber</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilityOnBoardingScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <Ionicons name="add-outline" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilityProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15 }}
                data={fetchedData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity style={{
                        marginVertical: 10,
                        padding: 20,
                        backgroundColor: COLOR.WHITE,
                        borderRadius: 20,
                        marginHorizontal:2,
                        elevation: 2,
                        shadowColor: COLOR.BLACK,
                        alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'
                    }}
                    onPress={() => navigation.navigate(NavigationScreens.FacilityDetalisScreen,{data:item})}
                    >
                        <Image source={Hair1} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 10 }} />
                        <View style={{ width: Screen_Width * 0.5 }}>
                            <Text style={styles.earningsText}>{item.name}</Text>
                            <Text style={styles.earningsSubText}>{item?.description}</Text>
                        </View>
                        <TouchableOpacity  style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                            <AntDesign name="right" size={28} color={COLOR.ChartBlue} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                    )
                }}
            />
            <View style={{ height: 100 }} />
        </ScrollView>
    )
}

export default FacilityFacilitiesScreen
