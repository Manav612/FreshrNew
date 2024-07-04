import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ConformLocation = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
        setText(newText);
    };

    const styles = StyleSheet.create({
        container: {
            width: Screen_Width,
            height: Screen_Height,
            paddingHorizontal: 15,
            backgroundColor: COLOR.WHITE
        },
        header: {
            marginVertical: 10,marginBottom:30
        },
        locationContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 1,
            marginBottom: 20
        },
        locationText: {
            marginLeft: 5,
            flex: 1
        },
        locationTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        locationSubtitle: {
            fontSize: 14,
            color: COLOR.GRAY,
            marginTop: 4
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth:1,
            borderBottomColor:COLOR.GRAY,
            paddingHorizontal: 10,
            marginBottom: 20
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: COLOR.BLACK,
            paddingVertical: 10
        },
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={26} color={COLOR.BLACK} />
            </View>
            <View style={styles.locationContainer}>
                <MaterialIcons
                    name="location-on"
                    size={24}
                    color={COLOR.ORANGECOLOR}
                />
                <View style={styles.locationText}>
                    <Text style={styles.locationTitle}>
                        New India Colony
                    </Text>
                    <Text style={styles.locationSubtitle}>
                        Ankur Tenament, Nikol, Ahmedabad, Gujarat 380038, India (New India
                        Colony)
                    </Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="HOUSE/FLAT/BLOCK NO."
                    placeholderTextColor={COLOR.GRAY}
                    value={text}
                    onChangeText={handleTextChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="APARTMENT/ROAD/AREA"
                    placeholderTextColor={COLOR.GRAY}
                    value={text}
                    onChangeText={handleTextChange}
                />
            </View>
            <TouchableOpacity
            style={{
                justifyContent: 'center',
                borderRadius: 10,
                alignItems: 'center',
                height: Screen_Height * 0.05,
                backgroundColor: COLOR.ORANGECOLOR,
                marginHorizontal: 15,
                marginVertical:10,
              
              }}>
                <Text style={{color:COLOR.WHITE,fontSize:16}}>SAVE AND PROCEED</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ConformLocation