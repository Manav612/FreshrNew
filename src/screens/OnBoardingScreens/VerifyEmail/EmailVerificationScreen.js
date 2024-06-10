import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationScreens } from '../../../constants/Strings';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';

const EmailVerificationScreen = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [code, setCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: COLOR.BLACK
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderWidth: 1,
      borderColor:COLOR.AuthField,
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
  });

  const fetchData = async (email) => {
    try {
        const res = await axios.post(`${BASE_API_URL}/users/emailcheck`, { email: email });
        console.log("Response data:", res.data);

        if (res.data) {
          Alert.alert('Verification compeleted')
            navigation.navigate(NavigationScreens.FillProfileScreen);

        }
    } catch (error) {
        console.error("Error:", error);
    }
};



  const handleEmailChange = (text) => {
    setEmail(text);
    setIsEmailValid(validateEmail(text));
  };

  const handleCodeChange = (text) => {
    setCode(text);
    setIsCodeValid(validateCode(text));
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCode = (code) => {
    return /^\d+$/.test(code) && code.length > 0;
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Email Verification</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: Screen_Height * 0.85}}>
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
        {!isEmailValid && email.length > 0 && <Text style={{ color: 'red' }}>Please enter a valid email address.</Text>}
        <TouchableOpacity 
          onPress={fetchData(email)} 
          style={{ marginBottom: 10, height: 50, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: isEmailValid ? COLOR.ORANGECOLOR : COLOR.GRAY, width: Screen_Width*0.8 }}
          disabled={!isEmailValid}
        >
          <Text style={{ color: 'white' }}>Verify Email</Text>
        </TouchableOpacity>
       
      </View>
    </ScrollView>
  );
};

export default EmailVerificationScreen;
