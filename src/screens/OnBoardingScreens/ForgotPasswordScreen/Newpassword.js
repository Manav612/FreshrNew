import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Loader, Successful, m3 } from '../../../constants/Icons';
import Modal from "react-native-modal";
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const Newpassword = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setTimeout(() => {
                setError('');
            }, 2000);
        } else {
            setError('');
            setModalVisible(true);
            // Close modal and navigate after timeout
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('Home Tab');
            }, 1000);
        }
    };

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row', margin: 15, gap: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="arrow-left" size={35} color="#000" />
                </TouchableOpacity>
                <Text style={{ color: COLOR.BLACK, fontSize: 22 }}>Create New Password</Text>
            </View>
            <Image source={m3} style={{ height: Screen_Height * 0.40, width: Screen_Width }} />
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, color: COLOR.BLACK_70 }}>Create Your New Password</Text>
                {/* Password Input */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLOR.AuthField, borderRadius: 10, marginVertical: 20, paddingHorizontal: 5 }}>
                    <AntDesign name="lock" size={24} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                    <TextInput
                        style={{ flex: 1, marginLeft: 10, fontSize: 16, color: COLOR.BLACK }}
                        placeholder="Password"
                        placeholderTextColor={COLOR.BLACK}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                        <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
                {/* Confirm Password Input */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 20, paddingHorizontal: 5 }}>
                    <AntDesign name="lock" size={24} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                    <TextInput
                        style={{ flex: 1, marginLeft: 10, fontSize: 16, color: COLOR.BLACK }}
                        placeholder="Confirm Password"
                        placeholderTextColor={COLOR.BLACK}
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                    />
                    <TouchableOpacity onPress={toggleShowPassword}>
                        <Entypo name={showPassword ? "eye-with-line" : "eye"} size={24} color={COLOR.BLACK} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, }} onPress={toggleRememberMe}>
                    <Fontisto name={rememberMe ? "checkbox-active" : "checkbox-passive"} size={24} color={COLOR.ORANGECOLOR} style={{ marginRight: 10 }} />
                    <Text style={{ fontFamily: "Poppins-Bold", marginLeft: 6, color: COLOR.BLACK_70 }}>Remember me</Text>
                </TouchableOpacity>
                {error ? <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text> : null}
                <TouchableOpacity
                    style={{ backgroundColor: COLOR.ORANGECOLOR, alignItems: 'center', justifyContent: 'center', width: '100%', height: 50, borderRadius: 30, marginTop: 20 }}
                    onPress={handleSubmit}>
                    <Text style={{ color: COLOR.WHITE_80, fontSize: 18 }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={isModalVisible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'white', height: Screen_Height * 0.50, width: Screen_Width * 0.80, borderRadius: 25, marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage source={Successful} style={{ height: 150, width: 150 }} resizeMode='cover' />
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: COLOR.ORANGECOLOR }}>Congratulations!</Text>
                        <Text style={{ marginVertical: 10, fontSize: 18, color: COLOR.GRAY, textAlign: 'center' }}>Your account is ready to use. You will {"\n"} be redirected to the Home page in a {"\n"} few seconds.</Text>
                        <FastImage
                            style={{ width: 50, height: 50 }}
                            source={Loader}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

export default Newpassword;
