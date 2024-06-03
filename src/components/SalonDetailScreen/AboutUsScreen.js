import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';

const AboutUsScreen = () => {
    const [showMore, setShowMore] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const [showFullText, setShowFullText] = useState(false);
    const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec, aliquam Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis ultricies, eros nec fermentum iaculis, libero lorem rhoncus justo, sed lacinia arcu neque sit amet nisi. Vivamus id purus non erat posuere pharetra sed lacinia arcu neque.';
    const truncatedText = fullText.slice(0, 100) + '...';

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>{showFullText ? fullText : truncatedText}</Text>
            <TouchableOpacity onPress={toggleShowFullText}>
                <Text style={{ color: COLOR.ORANGECOLOR }}>{showFullText ? 'Read Less' : 'Read More'}</Text>
            </TouchableOpacity>
            <Text style={{ color: COLOR.BLACK, fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>Working Hours</Text>
            <View>
                <Text style={{ fontSize: 16, color: COLOR.BLACK, }}>Monday-Friday   : 08:00 AM - 21:00 PM</Text>
                <Text style={{ fontSize: 16, color: COLOR.BLACK, }}>Saturday-Sunday : 10:00 AM - 20:00 PM</Text>
            </View>
            <TouchableOpacity style={{ width: Screen_Width * 0.80, height: Screen_Height * 0.05, backgroundColor: COLOR.ORANGECOLOR, justifyContent: 'center', borderRadius: 35, alignSelf: 'center', marginVertical: 20 }} onPress={() => navigation.navigate('BookAppointment Screen')}>
                <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE_80 }}>Book Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({})