import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import { Apple, Facebook, Google } from '../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import OtpTextInput from 'react-native-otp-textinput';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationScreens } from '../../../constants/Strings';
import { StoreAuthToken } from '../../../constants/AsyncStorage';
import socketServices from '../../../Services/Socket';
import { SetAuthToken } from '../../../redux/AuthAction';
const PasswordAndOtp = ({ route }) => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [password, setPassword] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(0);
    const [sessionId, setSessionId] = useState('');
    const [otpRequested, setOtpRequested] = useState(false);
    const dispatch =useDispatch();
    const handleOtpChange = (newOtp) => {
        setOtp(newOtp);
    };

    const handleOtpSubmit = () => {
        getOTP()
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
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

    const { email } = route.params;
    // console.log("===============>>>", email);
    // console.log("========  otp =======>>>", otp);

    const getOTP = async () => {
        try {
            const res = await axios.post(`${BASE_API_URL}/users/otpsend`, { email: email });
            console.log("Response data:", res.data);

            if (res.data) {
                await AsyncStorage.setItem("Session_Id", res.data.data.sessionId.toString());
                setSessionId(res.data.data.sessionId);
                setTimer(60); // Reset the timer
                setOtpRequested(true); // Set OTP requested to true
                Alert.alert('OTP Sent Successfully');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleSignIn = async () => {
        console.log("adsadss");
        // try {
            let res;
            // if (otp) {

            //     res = await axios.post(`${BASE_API_URL}/users/logIn/otp`, { email: email, otp: otp, sessionId: sessionId });
            //     console.log("adsadss");
            // } else {

                res = await axios.post(`${BASE_API_URL}/users/logIn/Passwprd`, { email: "vimalnavadiya2705@gmail.com", password: "123456" });
                console.log("adsadss");
            // }
            console.log("Response data ======:", res.data.data);

            if (res.data) {
                Alert.alert('Sign In  Successfully')
                // await AsyncStorage.setItem("Auth", res.data.data.sessionId.toString());
                await StoreAuthToken(res.data.data.token)
               dispatch(SetAuthToken(res.data.data.token));
                socketServices.initializeSocket(res.data.data.token);
                navigation.navigate(NavigationScreens.HomeTab);

            }
        // } catch (error) {
        //     console.error("Error:", error);
        // }
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
    return (
        <ScrollView style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width, backgroundColor: COLOR.WHITE, paddingHorizontal: 15 }}>

            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: COLOR.BLACK, fontWeight: '500' }}>Login to Account</Text>
            </View>

            {/* Email Input */}
            <View style={{ height: Screen_Height * 0.86, justifyContent: 'center' }}>
                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <AntDesign name="lock" size={24} color={COLOR.BLACK} style={styles.icon} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Password"
                        placeholderTextColor={COLOR.GRAY}
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
                <TouchableOpacity onPress={handleSignIn} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
                    <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Sign in</Text>
                </TouchableOpacity>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <View style={{ height: 1, backgroundColor: COLOR.BLACK, width: Screen_Width * 0.3 }} />
                    <Text style={{ color: COLOR.BLACK, fontSize: 20 }}>OR</Text>
                    <View style={{ height: 1, backgroundColor: COLOR.BLACK, width: Screen_Width * 0.3 }} />
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: Screen_Width * 0.9 }}>
                        <Text style={{ color: COLOR.BLACK, fontSize: 20, marginBottom: 10 }}>Enter access code</Text>
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
                            {otpRequested ? (timer === 0 ? 'Resend access code' : 'Get access code') : 'Get  access code'}

                        </Text>
                        <View />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={handleSignIn} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
                    <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Verify access code</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Forgot Password Screen')} style={{ marginVertical: 15 }}>
                    <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 16, fontWeight: '500', textAlign: 'center' }}>Forgot the password?</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: COLOR.BLACK }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Sign Up Screen')}><Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '500' }}>Sign up</Text></TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
};

export default PasswordAndOtp;


