import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { barber } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import { RemoveOneServiceData } from '../../../redux/ServicesData/ServicesDataAction';
import { NavigationScreens } from '../../../constants/Strings';

const ProfessionalViewInnerServices = ({ route }) => {
  const navigation = useNavigation();
  const { services } = route.params;
  console.log("====    services  ===>", services);
  const id = services._id
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const dispatch = useDispatch();

  const deleteServicesData = async () => {
    try {
      const token = await AsyncStorage.getItem("AuthToken");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      console.log('===============   id ==============',id);
      const res = await axios.delete(`${BASE_API_URL}/professionals/professional/services/${id}`, config);
      console.log("=======   ressss == ========", res.data);
      Alert.alert('Service deleted successfully ')
      // Refresh the fetched data after deletion
      dispatch(RemoveOneServiceData(id));
      navigation.goBack();
      // fetchServicesData();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>

          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={24}
            color={COLOR.BLACK}
          />

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 20,
            }}>
            <AntDesign name="setting" size={26} color={COLOR.BLACK} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.ChartBlue,
              height: 45,
              width: 140,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={()=>navigation.navigate(NavigationScreens.professionalEditServiceScreen,{services:services})}
            >
            <AntDesign
              onPress={() => navigation.goBack()}
              name="edit"
              size={24}
              color={COLOR.WHITE}
            />
            <Text style={{ color: COLOR.WHITE, marginLeft: 5 }}>
              Edit Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: COLOR.ORANGECOLOR,
              height: 45,
              width: 140,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => deleteServicesData(services.id)}
            >
            <AntDesign
              
              name="close"
              size={24}
              color={COLOR.ORANGECOLOR}
            />
            <Text style={{ color: COLOR.BLACK, marginLeft: 5 }}>
              Delete Service
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.89, height: 225, borderRadius: 10, marginHorizontal: 10, marginVertical: 10, alignItems: 'center' }}>
          <Image source={{ uri:services?.photo}} style={{ height: 150, width: 150, resizeMode: 'cover', margin: 10 }} />
          <View style={{ backgroundColor: COLOR.ORANGECOLOR, height: 30,paddingHorizontal:10,borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}><Text style={{ color: COLOR.WHITE, fontSize: 16 }}>{services?.serviceType?.name}</Text></View>
        </View>
        <View
          style={{
            backgroundColor: COLOR.ChartBlue,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: COLOR.WHITE, textAlign: 'center' }}>"{services?.serviceType?.category}"</Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <View style={[styles.box, { backgroundColor: COLOR.ORANGECOLOR }]}>
            <Text style={{ color: COLOR.WHITE }}>COST PER SERVICE</Text>
            <Text style={{ color: COLOR.WHITE }}>{services?.price}</Text>
          </View>
          <View style={[styles.box, { backgroundColor: COLOR.ORANGECOLOR }]}>
            <Text style={{ color: COLOR.WHITE }}>DURATION</Text>
            <Text style={{ color: COLOR.WHITE }}>{services?.serviceType?.averageDuration}min</Text>
          </View>
        </View>
        <View>
          <View style={[styles.box, { backgroundColor: COLOR.ORANGECOLOR }]}>
            <Text style={{ color: COLOR.WHITE }}>Total Profit</Text>
            <Text style={{ color: COLOR.WHITE }}>$ 0</Text>
          </View>
          <View style={[styles.box, { backgroundColor: COLOR.ORANGECOLOR }]}>
            <Text style={{ color: COLOR.WHITE }}>Service Completed</Text>
            <Text style={{ color: COLOR.WHITE }}>0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfessionalViewInnerServices;

const styles = StyleSheet.create({
  box: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 3,
  },
});
