import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OtpTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';
import { BASE_API_URL } from '../../../Services';
import socketServices from '../../../Services/Socket';
import { StoreAuthToken } from '../../../constants/AsyncStorage';

const EmailVerificationScreen = ({ route }) => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);

  const { email } = route.params;

  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: COLOR.BLACK,
    },
    inputContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      height: 50,
      borderRadius: 15,
      justifyContent: 'flex-start',
      gap: 20,
      paddingHorizontal: 10,
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      width: Screen_Width * 0.9,
    },
    otpContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    otpInput: {
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 5,
      fontSize: 20,
      padding: 10,
      marginHorizontal: 5,
    },
  });

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
  };

  const fetchData = async (email) => {
    try {
      const res = await axios.post(`${BASE_API_URL}/users/emailcheck`, { email: email });
      console.log("Response data:", res.data);

      if (res.data) {
        Alert.alert('Verification completed');
        await StoreAuthToken(res.data.data.token)
    socketServices.initializeSocket(res.data.data.token);
        
        navigation.navigate(NavigationScreens.HomeTab);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/users/logIn/otp`, { email: email, otp: otp, sessionId: sessionId });
      console.log("Response data ======:", res.data.data);

      if (res.data) {
        Alert.alert('Verification completed');
        await AsyncStorage.setItem("AuthToken", res.data.data.token.toString());
        navigation.navigate(NavigationScreens.HomeTab);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOtpSubmit = () => {
    getOTP();
  };

  const getOTP = async () => {
    try {
      const res = await axios.post(`${BASE_API_URL}/users/otpsend`, { email: email });
      console.log("Response data:", res.data);

      if (res.data) {
        await AsyncStorage.setItem("Session_Id", res.data.data.sessionId.toString());
        setSessionId(res.data.data.sessionId);
        setTimer(60); // Reset the timer
        setOtpRequested(true); // Set OTP requested to true
        Alert.alert('Otp Sent Successfully');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
      <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
        <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
        <Text style={{ fontWeight: '600', fontSize: 25, color: COLOR.BLACK }}>Email Verification</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: Screen_Height * 0.85 }}>
        <Text style={{ fontWeight: '600', fontSize: 20, color: COLOR.BLACK, marginBottom: 25 }}>Please check email for verification</Text>
        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} color={COLOR.BLACK} style={styles.icon} />
          <Text style={{ color: COLOR.BLACK, fontSize: 18 }}>{email}</Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Screen_Width * 0.9 }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 20, marginBottom: 10 }}>Enter Otp</Text>
            <Text style={{ color: COLOR.GRAY, fontSize: 16, marginLeft: 10 }}>{formatTime(timer)}</Text>
          </View>

          <OtpTextInput
            handleTextChange={handleOtpChange}
            handleSubmit={handleOtpSubmit}
            tintColor={COLOR.ORANGECOLOR}
            offTintColor={COLOR.LIGHTGRAY}
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
            inputCount={6}
          />
          <TouchableOpacity
            onPress={handleOtpSubmit}
            style={{ alignSelf: 'flex-end', marginVertical: 15, paddingHorizontal: 5, height: 25, backgroundColor: COLOR.ORANGECOLOR, borderRadius: 5 }}
            disabled={timer > 0}
          >
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>
              {otpRequested ? (timer === 0 ? 'Resend OTP' : 'Get OTP') : 'Get OTP'}
            </Text>
            <View />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSignIn}
          style={{ marginBottom: 10, height: 50, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginVertical: 15, backgroundColor: COLOR.ORANGECOLOR, width: Screen_Width * 0.8 }}
        >
          <Text style={{ color: COLOR.WHITE, fontWeight: '600' }}>Verify Email</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EmailVerificationScreen;
