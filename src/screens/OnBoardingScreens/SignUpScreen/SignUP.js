import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useRef } from 'react';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FastImage from 'react-native-fast-image';
import { Apple, Facebook, Google, UserIcon } from '../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_API_URL } from '../../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import { NavigationScreens } from '../../../constants/Strings';
import Snackbar from 'react-native-snackbar'


const SignUP = () => {
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showpasswordConfirm, setShowpasswordConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [ispasswordConfirmFocused, setIspasswordConfirmFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setpasswordConfirmError] = useState('');
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef(null);
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchStylesFor, setGender] = useState('');
  const [pushToken, setPushToken] = useState('test');
  const [isFocus, setIsFocus] = useState(false);

  const [errorMsg, setErrorMessage] = useState('')


  const handleEmailChange = (text) => {
    setEmail(text);
    setEmailError('');

  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordError('');
    setpasswordConfirmError('');
  };

  const handlepasswordConfirmChange = (text) => {
    setpasswordConfirm(text);
    setpasswordConfirmError('');
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

  const handlepasswordConfirmFocus = () => {
    setIspasswordConfirmFocused(true);
  };

  const handlepasswordConfirmBlur = () => {
    setIspasswordConfirmFocused(false);
  };

  const toggleShowpasswordConfirm = () => {
    setShowpasswordConfirm(!showpasswordConfirm);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    if (password !== passwordConfirm) {
      setpasswordConfirmError('Passwords do not match');
      return false;
    }
    return true;
  };

  const fetchData = async (firstName, lastName, email, password, passwordConfirm, searchStylesFor, phone, pushToken) => {
    try {
      console.log("==============  sign up clickkkkk   ================");
      const res = await axios.post(
        `${BASE_API_URL}/users/signUp`,
        { firstName, lastName, email, password, passwordConfirm, searchStylesFor, phone, pushToken }
      );

      console.log("Response data:", res.status);

      // Check if the request was successful
      if (res.data.status === "success") {
        navigation.navigate(NavigationScreens.EmailVerificationScreen, { email: email });

      } else {
        Alert.alert(res.data.message)
      }

    } catch (error) {
      console.log("error", error);
      // setErrorMessage(error,)
    }
  };



  const handleSignUp = () => {
    const isEmailValid = validateEmail();
    const arePasswordsValid = validatePasswords();
    if (isEmailValid && arePasswordsValid) {
      fetchData(firstName, lastName, email, password, passwordConfirm, searchStylesFor, phone, pushToken);
    }
  };

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLOR.AuthField,
      borderWidth: isEmailFocused || isPasswordFocused || ispasswordConfirmFocused ? 1 : null,
      borderColor: (isEmailFocused || isPasswordFocused || ispasswordConfirmFocused) || (email || password || passwordConfirm) ? COLOR.ORANGECOLOR : COLOR.AuthField,
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
    dropdownContainer: {
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLOR.AuthField,
      padding: 10
    },
    dropdown: {
      height: 50,
      backgroundColor: COLOR.AuthField,
      borderRadius: 10,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
      color: COLOR.BLACK_40
    },
    selectedTextStyle: {
      fontSize: 16,
      color: COLOR.BLACK
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    icon: {
      marginRight: 10
    },
    dropdownItem: {
      padding: 10,
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    dropdownItemSelected: {
      backgroundColor: COLOR.AuthField,
      color: COLOR.BLACK
    },
    ImageText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLOR.BLACK,
      textAlign: 'center'
    },
    imageContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15 },
    imageInnerContainer: {
      height: 100,
      width: 100,
      borderRadius: 50,
      backgroundColor: COLOR.ORANGECOLOR,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3,
      shadowColor: COLOR.ORANGECOLOR,
      position: 'relative',
      marginBottom: 20
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    cameraButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLOR.BLACK,
      borderRadius: 25,
      height: 30,
      width: 30,
      position: 'absolute',
      right: 1,
      bottom: 1,
    },

    modalContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      // backgroundColor: COLOR.ROYALBLUE,

    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '20%',
      width: '80%',
      backgroundColor: COLOR.ORANGECOLOR,
      borderRadius: 15,
    },
    closeButton: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 30,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: COLOR.BLACK,
      fontSize: 18,
      fontWeight: '700',
    },

    iconStyle: {
      width: 20,
      height: 20,
    },
    errorText: {
      color: COLOR.ROYALGOLDEN
    }
  });

  return (
    <ScrollView style={{ backgroundColor: COLOR.WHITE }}>
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10, paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: COLOR.BLACK, fontWeight: '500' }}>Create your Account</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', height: Screen_Height * 0.9, paddingHorizontal: 15 }}>

        <View style={{}}>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={22} color={COLOR.BLACK} style={styles.icon} />


            <TextInput
              style={[styles.input, { color: COLOR.BLACK }]}
              placeholderTextColor={COLOR.GRAY}
              placeholder="First Name"
              onFocus={() => setIsFirstNameFocused(true)}
              onBlur={() => setIsFirstNameFocused(false)}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={22} color={COLOR.BLACK} style={styles.icon} />

            <TextInput
              style={[styles.input]}
              placeholderTextColor={COLOR.GRAY}
              placeholder="Last Name"
              onFocus={() => setIsLastNameFocused(true)}
              onBlur={() => setIsLastNameFocused(false)}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <AntDesign name="mail" size={22} color={COLOR.BLACK} style={styles.icon} />
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
          {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}

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
          {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}

          <View style={styles.inputContainer}>
            <AntDesign name="lock" size={24} color={COLOR.BLACK} style={styles.icon} />
            <TextInput
              style={[styles.input]}
              placeholder="Confirm Password"
              placeholderTextColor={COLOR.GRAY}
              secureTextEntry={!showpasswordConfirm}
              value={passwordConfirm}
              onChangeText={handlepasswordConfirmChange}
              onFocus={handlepasswordConfirmFocus}
              onBlur={handlepasswordConfirmBlur}
            />
            <TouchableOpacity onPress={toggleShowpasswordConfirm}>
              <Entypo name={showpasswordConfirm ? "eye-with-line" : "eye"} size={24} color={COLOR.BLACK} style={styles.icon} />
            </TouchableOpacity>
          </View>
          {passwordConfirmError ? <Text style={{ color: 'red' }}>{passwordConfirmError}</Text> : null}

          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              itemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
              selectedItemTextStyle={theme === 1 ? { color: COLOR_LIGHT.BLACK } : { color: COLOR_DARK.WHITE }}
              data={[
                { label: 'Masculine', value: 'masculine' },
                { label: 'Feminine', value: 'feminine' }
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Style"
              value={searchStylesFor}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGender(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <PhoneInput
            ref={phoneInput}
            defaultValue={formattedValue}
            defaultCode="DM"
            layout="first"
            onChangeText={(text) => {
              setFormattedValue(text);
            }}
            onChangeFormattedText={(text) => {
              setPhone(text);
              console.log(text);
            }}
            containerStyle={{
              backgroundColor: COLOR.AuthField,
              height: 68,
              width: Screen_Width * 0.92,
              marginBottom: 20,
              borderRadius: 10
            }}
            textContainerStyle={{
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10
            }}
            textInputProps={{ fontSize: 12 }}
            codeTextStyle={{ fontSize: 12 }}
          />

          {/* <TouchableOpacity style={styles.rememberContainer} onPress={toggleRememberMe}>
            <Fontisto name={rememberMe ? "checkbox-active" : "checkbox-passive"} size={24} color={COLOR.ORANGECOLOR} style={styles.icon} />
            <Text style={{ fontFamily: "Poppins-Bold", marginLeft: 10, color: COLOR.BLACK }}>Remember me</Text>
          </TouchableOpacity> */}

          <TouchableOpacity onPress={handleSignUp} style={{ justifyContent: 'center', alignItems: 'center', height: 50, borderRadius: 35, backgroundColor: COLOR.ORANGECOLOR, marginVertical: 15 }}>
            <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>

          {/* <Text style={{ alignSelf: 'center', color: COLOR.CANCEL_B }}>{errorMsg}</Text> */}



          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ alignSelf: 'center', color: COLOR.BLACK }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sign In Screen')}><Text style={{ color: COLOR.ORANGECOLOR, fontWeight: '500', fontSize: 18 }}>Sign in</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUP;

