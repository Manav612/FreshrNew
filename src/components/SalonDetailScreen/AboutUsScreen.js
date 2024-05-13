import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Screen_Height, Screen_Width } from '../../constants/Constants';

const AboutUsScreen = () => {
    const [showMore, setShowMore] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 15, color: COLOR.BLACK }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
                laoreet ex. Nulla facilisi. In eget ex tincidunt, suscipit arcu nec,
                aliquam justo.{' '}
                {showMore && (
                    <Text>
                        Donec et nunc non felis rutrum semper. Duis eu tellus vel turpis
                        varius rhoncus eget nec neque. Aenean ac placerat tortor. Duis
                        ultricies, eros nec fermentum iaculis, libero lorem rhoncus justo,
                        sed lacinia arcu neque sit amet nisi. Vivamus id purus non erat
                        posuere pharetra.
                    </Text>
                )}
                {!showMore ? (
                    <TouchableOpacity onPress={() => setShowMore(true)} style={{ marginTop: 10 }}>
                        <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 16, fontWeight: '600' }}>Read more...</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setShowMore(false)}>
                        <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 16, fontWeight: '600' }}>Read less...</Text>
                    </TouchableOpacity>
                )}
            </Text>
            <Text style={{ color: COLOR.BLACK, fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>Working Hours</Text>
            <View>
                <Text style={{fontSize:16}}>Monday-Friday   : 08:00 AM - 21:00 PM</Text>
                <Text style={{fontSize:16}}>Saturday-Sunday : 10:00 AM - 20:00 PM</Text>
            </View>
            <Text style={{ color: COLOR.BLACK, fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>Contact us</Text>
            <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 18 }}>(406) 555-0120</Text>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' ,marginVertical:10}}>
                <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Our Address</Text>
                <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 16, fontWeight: 'bold' }}>See on Maps</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Fontisto name="map-marker-alt" size={24} color={COLOR.ORANGECOLOR} />
                <Text style={{ marginLeft: 10, color: COLOR.GRAY ,fontSize:16}}>6993 Meadow Vally Terrace, New York</Text>
            </View>
            <TouchableOpacity style={{width:Screen_Width*0.80,height:Screen_Height*0.05,backgroundColor:COLOR.ORANGECOLOR,justifyContent:'center',borderRadius:35,alignSelf:'center'}}>
                <Text style={{textAlign:'center',fontSize:18,color:COLOR.WHITE_80}}>Book Now</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AboutUsScreen

const styles = StyleSheet.create({})