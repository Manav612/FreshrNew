import React, { useRef, useState, useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, Animated
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import Tooltip from 'react-native-walkthrough-tooltip';

const ProfessionalEditprofile = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme === 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isDobFocused, setIsDobFocused] = useState(false);
    const [distance, setDistance] = useState(50);
    const [showTip, setShowTip] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.3,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]).start(() => animate());
        };

        animate();
    }, []);

    const animatedStyle = {
        transform: [{ scale: scaleAnim }],
    };


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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={26} color={COLOR.BLACK} />
                </TouchableOpacity>
                <Text style={{ fontSize: 22, color: COLOR.BLACK, fontWeight: 'bold' }}>
                    Edit Profile
                </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        backgroundColor: COLOR.BLACK_30,
                        height: 150,
                        width: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 100,
                        marginBottom: 25
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLOR.ORANGECOLOR,
                            width: 30,
                            height: 30,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 5,
                            bottom: 0
                        }}
                    >
                        <MaterialIcons name="edit" size={26} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: Screen_Width, paddingHorizontal: 15 }}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor={COLOR.GRAY}
                            onFocus={() => setIsFirstNameFocused(true)}
                            onBlur={() => setIsFirstNameFocused(false)}
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="LastName"
                            placeholderTextColor={COLOR.GRAY}
                            onFocus={() => setIsLastNameFocused(true)}
                            onBlur={() => setIsLastNameFocused(false)}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Bio"
                            placeholderTextColor={COLOR.GRAY}
                            onFocus={() => setIsDobFocused(true)}
                            onBlur={() => setIsDobFocused(false)}
                            value={dob}
                            onChangeText={text => setDob(text)}
                        />
                    </View>

                    <View style={{ alignItems: 'center', backgroundColor: COLOR.AuthField, borderWidth: 1, borderColor: COLOR.AuthField, borderRadius: 10, marginBottom: 20, paddingHorizontal: 5 }}>

                        <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>Change max travel distance</Text>

                        <Text style={{ fontWeight: '700', color: '#000', fontSize: 18 }}>{distance} km</Text>
                        <View style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Tooltip
                                isVisible={showTip}
                                content={
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Text style={{ color: COLOR.BLACK, fontSize: 14, marginBottom: 5 }}>
                                            <Text style={{ color: COLOR.BLACK, fontWeight: '600', fontSize: 14 }}>Working distance : </Text>
                                            This allows you to select how far you're willing to travel. You are compensated (1$/km) per delivery service.
                                        </Text>
                                    </View>
                                }
                                placement="bottom"
                                onClose={() => setShowTip(false)}
                            >
                                <Animated.View style={animatedStyle}>
                                    <AntDesign
                                        onPress={() => setShowTip(true)}
                                        name="infocirlce"
                                        size={20}
                                        color={COLOR.ChartBlue}
                                    />
                                </Animated.View>
                            </Tooltip>
                        </View>
                        <Slider
                            style={{ width: '100%', marginVertical: 20 }}
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            minimumTrackTintColor="#000"
                            maximumTrackTintColor="#000"
                            thumbTintColor="#000"
                            value={distance}
                            onValueChange={(value) => setDistance(value)}
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
                            Update Info
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
};

export default ProfessionalEditprofile;