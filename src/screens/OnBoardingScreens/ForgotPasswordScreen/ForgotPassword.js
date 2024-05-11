import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {forgotpassword} from '../../../constants/Icons';
import {
  COLOR_DARK,
  COLOR_LIGHT,
  GRADIENT_COLOR_DARK,
  GRADIENT_COLOR_LIGHT,
} from '../../../constants/Colors';

const ForgotPassword = ({navigation}) => {
  const BackPress = () => {
    navigation.goBack();
  };

  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
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
          <Text style={styles.HeaderText}>Forgot Password</Text>
        </View>
      </View>
      <View>
        <Image source={forgotpassword} style={{height: 270, width: '100%'}} />
      </View>
      <View style={{margin: 15}}>
        <Text style={{fontSize: 16, color: COLOR.BLACK}}>
          Select which contact details should we use to reset your password
        </Text>
      </View>
      <View>
        <View
          style={[
            styles.Container,
            {backgroundColor: COLOR.WHITE, borderColor: COLOR.BLUE},
          ]}>
          <View
            style={[styles.imageContainer, {backgroundColor: COLOR.GULABI}]}>
            <MaterialCommunityIcons
              name="android-messages"
              size={25}
              color={COLOR.ORANGECOLOR}
            />
          </View>
          <View style={{height: 43, justifyContent: 'space-between'}}>
            <Text>via SMS</Text>
            <Text
              style={{fontSize: 16, color: COLOR.BLACK, fontWeight: 'bold'}}>
              +1 111*****75
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  HeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  HeaderText: {color: '#000', fontSize: 22, fontWeight: '600', marginLeft: 10},
  Container: {
    height: 110,
    elevation: 2,
    marginHorizontal: 15,
    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 2,
  },
  imageContainer: {
    height: 65,
    width: 65,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
