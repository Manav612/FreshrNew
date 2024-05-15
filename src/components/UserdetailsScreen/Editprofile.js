import React, { useRef, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PhoneInput from 'react-native-phone-number-input';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';

const Editprofile = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();
    const [fullName, setFullName] = useState('');
    const [nickName, setNickName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const phoneInput = useRef(null);
    const [value, setValue] = useState('');
    const [isFullNameFocused, setIsFullNameFocused] = useState(false);
    const [isNickNameFocused, setIsNickNameFocused] = useState(false);
    const [isDobFocused, setIsDobFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLOR.AuthField,
            borderWidth: 1,
            borderColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 20,
            paddingHorizontal: 5
        },
        input: {
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            color: COLOR.BLACK
        },
        icon: {
            marginRight: 10
        },
        rememberContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10
        }
    });

    return (
        <ScrollView
            style={{ backgroundColor: COLOR.WHITE, height: Screen_Height, width: Screen_Width }}>
            <View style={{ margin: 20, flexDirection: 'row', gap: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('My Profile Screen')}>
                    <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: COLOR.BLACK, fontWeight: 'bold' }}>
                    Edit Profile
                </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: Screen_Width, paddingHorizontal: 15 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor={COLOR.BLACK_40}
                            onFocus={() => setIsFullNameFocused(true)}
                            onBlur={() => setIsFullNameFocused(false)}
                            value={fullName}
                            onChangeText={text => setFullName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nickname"
                            placeholderTextColor={COLOR.BLACK_40}
                            onFocus={() => setIsNickNameFocused(true)}
                            onBlur={() => setIsNickNameFocused(false)}
                            value={nickName}
                            onChangeText={text => setNickName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Date of Birth"
                            placeholderTextColor={COLOR.BLACK_40}
                            onFocus={() => setIsDobFocused(true)}
                            onBlur={() => setIsDobFocused(false)}
                            value={dob}
                            onChangeText={text => setDob(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor={COLOR.BLACK_40}
                            onFocus={() => setIsEmail(true)}
                            onBlur={() => setIsEmail(false)}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>

                    <Dropdown
                        style={{
                            paddingHorizontal: 15,
                            backgroundColor: COLOR.AuthField,
                            height: 50,
                            borderRadius: 10,
                            marginBottom: 20
                        }}
                        showsVerticalScrollIndicator={false}
                        containerStyle={[{ backgroundColor: COLOR.AuthField }, { color: COLOR.BLACK }]}
                        placeholderTextColor={COLOR.BLACK}
                        placeholderStyle={COLOR.BLACK}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            { label: 'New York', value: 'New York' },
                            { label: 'Alabama', value: 'Alabama' },
                            { label: 'Delaware', value: 'Delaware' },
                            { label: 'South Carolina', value: 'South Carolina' },
                            { label: 'Wisconsin', value: 'Wisconsin' },
                            { label: 'Washington', value: 'Washington' },
                            { label: 'Maryland', value: 'Maryland' },
                            { label: 'Virginia', value: 'Virginia' },
                            { label: 'Oklahoma', value: 'Oklahoma' },
                            { label: 'New Mexico', value: 'New Mexico' },
                            { label: 'New Jersey', value: 'New Jersey' },
                            { label: 'Hawaii', value: 'Hawaii' },
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'United States' : '...'}
                        value={gender}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setGender(item.value);
                            // setIsFocus(false);
                        }}
                    />

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="DM"
                        layout="first"
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            setFormattedValue(text);
                        }}
                        // withDarkTheme
                        // autoFocus
                        containerStyle={{ backgroundColor: COLOR.AuthField, height: 68, width: Screen_Width * 0.92, marginBottom: 20, borderRadius: 10 }}
                        // textInputStyle={{color:COLOR.BLACK,backgroundColor:'yellow'}}
                        // codeTextStyle={{color:COLOR.BLACK}}
                        textContainerStyle={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
                        textInputProps={{ fontSize: 12 }}
                        codeTextStyle={{ fontSize: 12 }}
                    />
                    <Dropdown
                        style={{
                            paddingHorizontal: 15,
                            backgroundColor: COLOR.AuthField,
                            height: 50,
                            borderRadius: 10,
                            marginBottom: 20,

                        }}
                        containerStyle={[{ backgroundColor: COLOR.AuthField }, { color: COLOR.BLACK }]}
                        placeholderTextColor={COLOR.BLACK}
                        placeholderStyle={COLOR.BLACK}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' }
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Gender' : '...'}
                        value={gender}
                        // onFocus={() => setIsFocus(true)}
                        // onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setGender(item.value);
                            // setIsFocus(false);
                        }}
                    />

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            placeholderTextColor={COLOR.BLACK_40}
                            onFocus={() => setIsNickNameFocused(true)}
                            onBlur={() => setIsNickNameFocused(false)}
                            value={nickName}
                            onChangeText={text => setNickName(text)}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            borderRadius: 35,
                            backgroundColor: COLOR.ORANGECOLOR,
                            
                        }}
                    >
                        <Text style={{ color: COLOR.WHITE, fontSize: 16, fontWeight: '500' }}>
                            Update
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Editprofile;
