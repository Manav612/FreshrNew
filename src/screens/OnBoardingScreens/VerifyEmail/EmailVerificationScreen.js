// src/screens/EmailVerificationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';

const EmailVerificationScreen = () => {
    const navigation = useNavigation()
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSendVerificationCode = async () => {
    try {
      const response = await axios.post('https://yourapi.com/send-verification-code', { email });
      Alert.alert('Success', 'Verification code sent to your email.');
    } catch (error) {
      Alert.alert('Error', 'Failed to send verification code.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post('https://yourapi.com/verify-code', { email, code });
      if (response.data.success) {
        Alert.alert('Success', 'Email verified successfully.');
        navigation.navigate('Home'); // Navigate to home or another screen
      } else {
        Alert.alert('Error', 'Invalid verification code.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Verification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity  onPress={handleSendVerificationCode} style={{marginBottom:10,height:50,borderRadius:15,justifyContent:'center',alignItems:'center',backgroundColor:COLOR.ORANGECOLOR}}><Text>Send Verification Code</Text></TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      {/* <Button title="Verify Code" /> */}
      <TouchableOpacity onPress={()=>navigation.navigate('Home Tab')} style={{marginBottom:10,height:50,borderRadius:15,justifyContent:'center',alignItems:'center',backgroundColor:COLOR.ORANGECOLOR}}><Text>Verify Code</Text></TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default EmailVerificationScreen;
