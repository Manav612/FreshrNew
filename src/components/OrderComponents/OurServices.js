import { FlatList, ScrollView, StyleSheet, Text, Image,TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Servicesdata } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import axios from 'axios';
import { BASE_API_URL } from '../../Services';
import { SetServiceData } from '../../redux/ServicesData/ServicesDataAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OurServices = ({route}) => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const dispatch = useDispatch();
    const {SelectedProf} = route.params
    console.log("==============    SelectedProf    ===    ===========",SelectedProf);
    const selectedProfId = SelectedProf._id
    console.log("==========    selectedProfId     =================",selectedProfId);
   
const [selected,setSelected] = useState([])
const [fetchedServices,setFetchedServices] = useState([])
    const navigation = useNavigation();
    useEffect(() => {
        fetchServicesData();
      }, []);
    
      const fetchServicesData = async () => {
        try {
          const token = await AsyncStorage.getItem("AuthToken");
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          const res = await axios.get(`${BASE_API_URL}/professionals/professional/${selectedProfId}`, config);
          console.log("=======   fetchhh services  == ========",res.data.data.Professional.services);
          setFetchedServices(res.data.data.Professional.services)
        } catch (error) {
          console.error("Error:", error);
        }
      };

      const handleSelect = (item) => {
        setSelected(prevSelected => {
            if (prevSelected.includes(item.id)) {
                return prevSelected.filter(id => id !== item.id);
            } else {
                return [...prevSelected, item.id];
            }
        });
    };
      
    const renderitem = ({ item }) => (
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
          onPress={() => handleSelect(item)}
          style={{
            backgroundColor: COLOR.WHITE,
            marginTop: 10,
            width: Screen_Width * 0.92,
            height: Screen_Height * 0.14,
            alignItems: 'center',
            justifyContent:'space-between',
            paddingHorizontal: 20,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: Screen_Width * 0.22,
              height: Screen_Height * 0.1,
              borderRadius: 10,
            }}
            source={{uri:item?.photo}}
          />
          <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5,width:180 }}>
            <Text
              style={{
                color: COLOR.BLACK,
                fontSize: 16,
                fontWeight: '600',
                paddingRight: 10,
              }}>
              {item.serviceType?.name}
            </Text>
            <Text
            style={{
              color: COLOR.BLACK_40,
              fontSize: 14,
              fontWeight: '600',
              paddingRight: 10,
              width: 170
            }}>
            {item.description.length > 40
              ? `${item.description.slice(0, 40)}...`
              : item.description}
          </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: Screen_Width * 0.55,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLOR.ORANGECOLOR,
                  fontSize: 16,
                  fontWeight: '600',
                  paddingRight: 10,
                }}>
                ${item?.price}
              </Text>
              {/* <TouchableOpacity style={{  height:50, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center' }} onPress={()=>navigation.navigate('Edit ProfileAppointment Screen')}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: COLOR.WHITE }}>Edit Profile Now</Text>
              </TouchableOpacity> */}
            </View>
          </View>
          
          <Fontisto name={selected.includes(item.id) ? 'checkbox-active' : 'checkbox-passive'} size={28} color={COLOR.BLACK} />
          
        </TouchableOpacity>
        </View>
    );
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10, marginHorizontal: 10 }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Select Services</Text>
                    </View>
                    {/* <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
                </TouchableOpacity> */}
                </View>
                <FlatList
                    data={fetchedServices}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderitem}
                />

                <View style={{ height: 170 }} />
            </ScrollView>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15, position: 'absolute', bottom: 90, width: Screen_Width * 0.95, marginHorizontal: 10 }} onPress={() => navigation.navigate(NavigationScreens.BookAppointmentScreen)}>
                <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Choose a time</Text>
            </TouchableOpacity>
        </>
    )
}

export default OurServices

const styles = StyleSheet.create({})
