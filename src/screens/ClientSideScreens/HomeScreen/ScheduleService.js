import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {COLOR_DARK, COLOR_LIGHT} from '../../../constants/Colors';
import {Screen_Height, Screen_Width} from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {BASE_API_URL} from '../../../Services';
import {NavigationScreens} from '../../../constants/Strings';

const ScheduleService = ({route}) => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const dispatch = useDispatch();
  const {ProfDetail} = route.params;
  console.log('====cdvds===', ProfDetail._id);
  const selectedProfId = ProfDetail._id;
  const [selected, setSelected] = useState([]);
  const [fetchedServices, setFetchedServices] = useState([]);
  const navigation = useNavigation();

  const authToken = useSelector(state => state.AuthReducer);

  useEffect(() => {
    fetchServicesData();
  }, []);

  const fetchServicesData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const res = await axios.get(
        `${BASE_API_URL}/professionals/professional/${selectedProfId}`,
        config,
      );
      console.log(
        '=======   fetchhh services  == ========',
        res.data.data.Professional.services,
      );
      setFetchedServices(res.data.data.Professional.services);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelect = item => {
    setSelected(prevSelected => {
      const isItemSelected = prevSelected.some(
        service => service.id === item.id,
      );
      if (isItemSelected) {
        return prevSelected.filter(service => service.id !== item.id);
      } else {
        return [...prevSelected, item];
      }
    });
  };

  const renderitem = ({item}) => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => handleSelect(item)}
        style={{
          backgroundColor: COLOR.WHITE,
          marginTop: 10,
          width: Screen_Width * 0.92,
          height: Screen_Height * 0.16,
          alignItems: 'center',
          justifyContent: 'space-between',
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
          source={{uri: item?.photo}}
        />
        <View
          style={{flexDirection: 'column', marginLeft: 15, gap: 5, width: 180}}>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '600',
              paddingRight: 10,
            }}>
            {item?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK,
              fontSize: 16,
              fontWeight: '600',
              paddingRight: 10,
            }}>
            {item?.category?.name}
          </Text>
          <Text
            style={{
              color: COLOR.BLACK_40,
              fontSize: 14,
              fontWeight: '600',
              paddingRight: 10,
              width: 170,
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
          </View>
        </View>

        <Fontisto
          name={
            selected.some(service => service.id === item.id)
              ? 'checkbox-active'
              : 'checkbox-passive'
          }
          size={28}
          color={COLOR.BLACK}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
            </TouchableOpacity>
            <Text style={{fontSize: 24, color: COLOR.BLACK}}>
              Select Services
            </Text>
          </View>
        </View>
        <FlatList
          data={fetchedServices}
          showsVerticalScrollIndicator={false}
          renderItem={renderitem}
          style={{flex: 1}}
          scrollEnabled={false}
        />

        <View style={{height: 170}} />
      </ScrollView>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 35,
          backgroundColor: COLOR.ORANGECOLOR,
          marginVertical: 15,
          position: 'absolute',
          bottom: 90,
          width: Screen_Width * 0.95,
          marginHorizontal: 10,
        }}
        onPress={() =>
          navigation.navigate(NavigationScreens.ScheduleCalenderScreen)
        }>
        <Text style={{color: COLOR.WHITE, fontSize: 16, fontWeight: '500'}}>
          Book Appointment
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default ScheduleService;

const styles = StyleSheet.create({});
