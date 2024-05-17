
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { Servicesdata2 } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const Ourpackages = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();

  const BackPress = () => {
    navigation.goBack();
  };

  const renderitem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: COLOR.WHITE,
        marginTop: 10,
        width: Screen_Width * 0.92,
        height: Screen_Height * 0.14,
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        marginHorizontal: 15,
      }}
      onPress={() => navigation.navigate('OurPackageDetail Screen', { name: item.name, image: item.image })}
    >
      <Image
        style={{
          width: Screen_Width * 0.22,
          height: Screen_Height * 0.1,
          borderRadius: 10,
        }}
        source={item.image}
      />
      <View style={{ flexDirection: 'column', marginLeft: 15, gap: 5 }}>
        <Text
          style={{
            color: COLOR.BLACK,
            fontSize: 16,
            fontWeight: '600',
            paddingRight: 10,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: COLOR.BLACK_40,
            fontSize: 14,
            fontWeight: '600',
            paddingRight: 10,
          }}>
          {item.type}
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
            {item.price}
          </Text>
          <TouchableOpacity
            style={{
              width: Screen_Width * 0.2,
              height: Screen_Height * 0.04,
              backgroundColor: COLOR.ORANGECOLOR,
              justifyContent: 'center',
              borderRadius: 35,
              alignSelf: 'center',
            }}
            onPress={()=>navigation.navigate('BookAppointment Screen')}
            >
            <Text
              style={{ textAlign: 'center', fontSize: 14, color: COLOR.WHITE }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 15,
          alignItems: 'center',
        }}>
        <View style={styles.HeaderView}>
          <TouchableOpacity onPress={BackPress}>
            <MaterialCommunityIcons name="arrow-left" size={35} color="#000" />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Our Package</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal-circle-outline"
            size={30}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={Servicesdata2}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderitem}
      />
    </View>
  );
};

export default Ourpackages;

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: { color: '#000', fontSize: 22, fontWeight: '600', marginLeft: 10 },
});