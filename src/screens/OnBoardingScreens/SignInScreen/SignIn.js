import React, { useState, useCallback, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { debounce } from 'lodash';
import NetInfo from '@react-native-community/netinfo';

import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { NavigationScreens } from '../../../constants/Strings';
import { BASE_API_URL } from '../../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [networkStatus, setNetworkStatus] = useState(null);


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("================>", state.isConnected);
            setNetworkStatus(state.isConnected);

        });
        return () => unsubscribe();
    }, []);



    const fetchData = async () => {
        console.log("=======  clickkkkk    ============");
        try {
            const response = await axios.post(
                `${BASE_API_URL}/users/emailcheck`,
                { email },
                // { timeout: 5000 } // 5 second timeout
            );
            // setLoader(true);
            console.log("=========   res data   ======", response.data);
            if (response.data.status === 'success') {

                navigation.navigate(NavigationScreens.PasswordAndOtpScreen, { email: email });
            }

        } catch (error) {
            console.error("Error during email check:", error);
            if (error.code === 'ECONNABORTED') {
                setErrorMessage("Request timed out. Please check your internet connection and try again.");
            } else {
                setErrorMessage(error.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
        }
    }

    const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

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
        errorText: {
            color: 'red',
            marginBottom: 10,
        },
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            borderRadius: 35,
            backgroundColor: COLOR.ORANGECOLOR,
            marginVertical: 15,
        },
        buttonText: {
            color: COLOR.WHITE,
            fontSize: 16,
            fontWeight: '500',
        },
        loadingText: {
            marginTop: 10,
            color: COLOR.BLACK,
        },
    });


    const handleEmailFocus = () => setIsEmailFocused(true);
    const handleEmailBlur = () => setIsEmailFocused(false);


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: COLOR.WHITE,
                height: Screen_Height,
                width: Screen_Width,
                paddingHorizontal: 15,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10,
                }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, color: COLOR.BLACK, fontWeight: '500' }}>
                    Login to your Account
                </Text>
            </View>

            <View style={{ height: Screen_Height * 0.87, justifyContent: 'center' }}>
                <View style={styles.inputContainer}>
                    <AntDesign
                        name="mail"
                        size={24}
                        color={COLOR.BLACK}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={COLOR.GRAY}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                    />
                </View>

                {errorMessage ? (
                    <Text style={styles.errorText}>{errorMessage}</Text>
                ) : null}

                {loader ? (
                    <View style={{ alignItems: 'center' }}>
                        <ActivityIndicator size="large" color={COLOR.ORANGECOLOR} />
                        <Text style={styles.loadingText}>Checking email...</Text>
                    </View>
                ) : (
                    <TouchableOpacity onPress={fetchData} style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

export default SignIn;
