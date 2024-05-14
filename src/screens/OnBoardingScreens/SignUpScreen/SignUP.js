import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import { Apple, Facebook, Google } from '../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';

const SignUP = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderWidth: isEmailFocused || isPasswordFocused ? 1 : null,
      borderColor: (isEmailFocused || isPasswordFocused) || (email || password) ? COLOR.ORANGECOLOR : COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 5
    },
    input: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: COLOR.BLACK,
    },
    icon: {
      marginRight: 10,
    },
    rememberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
    },
  });
  return (
    <ScrollView style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width }}>
      <View style={{ margin: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{ fontSize: 40, color: COLOR.BLACK, fontWeight: '500', marginVertical: '10%' }}>Create your Account</Text>

        {/* Email Input */}
        <View style={{ marginTop: Screen_Height * 0.1 }}>

          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={24} color={COLOR.BLACK} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Email"
              placeholderTextColor={COLOR.BLACK}
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={24} color={COLOR.BLACK} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Password"
              placeholderTextColor={COLOR.BLACK}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color={COLOR.BLACK} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.rememberContainer} onPress={toggleRememberMe}>
            <Fontisto name={rememberMe ? "checkbox-active" : "checkbox-passive"} size={24} color={COLOR.ORANGECOLOR} style={styles.icon} />
            <Text style={{ fontFamily:"Poppins-Bold",marginLeft: 10, color: COLOR.BLACK }}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Fill Profile Screen')} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>
          {/* <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20, marginTop: 60 }}>
          <View style={{ width: 100, height: 1, backgroundColor: COLOR.BLACK_30 }} />
          <Text style={{ color: COLOR.BLACK }}>or continue with</Text>
          <View style={{ width: 100, height: 1, backgroundColor: COLOR.BLACK_30 }} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20, marginTop: 30 }}>
          <TouchableOpacity style={{ borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: COLOR.BLACK_30, width: 100, height: 80 }}>
            <FastImage source={Facebook} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: COLOR.BLACK_30, width: 100, height: 80 }}>
            <FastImage source={Google} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: COLOR.BLACK_30, width: 100, height: 80 }}>
            <FastImage source={Apple} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text style={{ alignSelf: 'center', color: COLOR.BLACK }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In Screen')}><Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '500' }}>Sign in</Text></TouchableOpacity>
          </View>
        </View>
      </View>

    </ScrollView>
  );
};

export default SignUP;


