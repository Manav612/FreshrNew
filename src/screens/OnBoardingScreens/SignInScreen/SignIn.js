import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../../constants/Strings';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';

const SignIn = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleEmailFocus = () => {
        setIsEmailFocused(true);
    };

    const handleEmailBlur = () => {
        setIsEmailFocused(false);
    };

    const fetchData = async (email) => {
        try {
            // Make a POST request to check the email
            const res = await axios.post(`${BASE_API_URL}/users/emailcheck`, { email: email });
            
            // Log the entire response data
            console.log("Response data:", res.status);

            // Check if the request was successful
            if (res.data.status === "success") {
                navigation.navigate(NavigationScreens.PasswordAndOtpScreen, { email: email });
            } else {
                Alert.alert(res.data.message)
            }
        } catch (error) {
            console.error("Error during email check:", error);
        }
    };

    const handleContinuePress = () => {
        fetchData(email);
    };

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderWidth: isEmailFocused ? 1 : null,
            borderColor: isEmailFocused || email ? COLOR.ORANGECOLOR : COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 5,
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
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width,paddingHorizontal:15 }}>


            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: COLOR.BLACK, fontWeight: '500' }}>Login to your Account</Text>
            </View>

            {/* Email Input */}
            <View style={{height:Screen_Height*0.87,justifyContent:'center' }}>
                <View style={styles.inputContainer}>
                    <AntDesign name="mail" size={24} color={COLOR.BLACK} style={styles.icon} />
                    <TextInput
                        style={[styles.input]}
                        placeholder="Email"
                        placeholderTextColor={COLOR.GRAY}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={handleEmailChange}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                    />
                </View>
                
                <TouchableOpacity onPress={handleContinuePress} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
                    <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Continue</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};

export default SignIn;
