import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation,useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLOR_DARK, COLOR_LIGHT} from '../../../constants/Colors';
import {barber} from '../../../constants/Icons';

const ProfessionalViewServices = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const { name, image } = route.params;

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  return (
    <ScrollView>
      <View style={{marginHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View
            style={{
              backgroundColor: COLOR.BLACK,
              height: 40,
              width: 40,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              color={COLOR.WHITE}
            />
          </View>
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
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="edit"
              size={24}
              color={COLOR.WHITE}
            />
            <Text style={{color: COLOR.WHITE, marginLeft: 5}}>
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
            }}>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="close"
              size={24}
              color={COLOR.ORANGECOLOR}
            />
            <Text style={{color: COLOR.BLACK, marginLeft: 5}}>
              Delete Service
            </Text>
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={barber}
          style={{
            height: 180,
            width: '100%',
            backgroundColor: 'yellow',
            marginVertical: 10,
          }}>
          <View
            style={{
              height: 40,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLOR.ChartBlue,
              marginTop: 140,
              marginLeft: 10,
            }}>
            <Text style={{color: COLOR.WHITE}}>hello</Text>
          </View>
        </ImageBackground>
        <View
          style={{
            backgroundColor: COLOR.ORANGECOLOR,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: COLOR.WHITE}}>dxgffdg</Text>
        </View>
        <View style={{marginVertical: 20}}>
          <View style={[styles.box, {backgroundColor: COLOR.ORANGECOLOR}]}>
            <Text style={{color: COLOR.WHITE}}>COST PER SERVICE</Text>
            <Text style={{color: COLOR.WHITE}}>$ 31.00</Text>
          </View>
          <View style={[styles.box, {backgroundColor: COLOR.ORANGECOLOR}]}>
            <Text style={{color: COLOR.WHITE}}>DURATION</Text>
            <Text style={{color: COLOR.WHITE}}>70 min</Text>
          </View>
        </View>
        <View>
          <View style={[styles.box, {backgroundColor: COLOR.ORANGECOLOR}]}>
            <Text style={{color: COLOR.WHITE}}>Total Profit</Text>
            <Text style={{color: COLOR.WHITE}}>$ 0</Text>
          </View>
          <View style={[styles.box, {backgroundColor: COLOR.ORANGECOLOR}]}>
            <Text style={{color: COLOR.WHITE}}>Service Completed</Text>
            <Text style={{color: COLOR.WHITE}}>0</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfessionalViewServices;

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
