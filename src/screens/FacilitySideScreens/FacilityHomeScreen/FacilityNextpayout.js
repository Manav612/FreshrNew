import { StyleSheet, Text, View, TouchableOpacity, ScrollView,FlatList,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationScreens } from '../../../constants/Strings';
import { Hair1 } from '../../../constants/Icons';
import { Screen_Width } from '../../../constants/Constants';
import { Nextpayout } from '../../../components/utils';

const FacilityNextpayout = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    

    const styles = StyleSheet.create({
        HeaderView: {
            
            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
        },
        earningsText: {
            fontSize: 22,
            fontWeight: 'bold',
            color: COLOR.BLACK
        },
        earningsSubText: {
            fontSize: 16,
            color: COLOR.GRAY,
        },
    });
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15,backgroundColor:COLOR.WHITE}}>
            <View style={styles.HeaderView}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Next Payout</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15 }}
                data={Nextpayout}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    return (
                    <TouchableOpacity style={{
                        marginVertical: 10,
                        padding: 15,
                        backgroundColor: COLOR.WHITE,
                        borderRadius: 20,
                        elevation: 2,
                        shadowColor: COLOR.BLACK,
                        alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between',gap:10
                    }}
                    >
                        <Image source={Hair1} style={{ height: 60, width: 60, resizeMode: 'cover', borderRadius: 30 }} />
                        <View style={{ width: Screen_Width * 0.5 }}>
                            <Text style={styles.earningsText}>{item.name}</Text>
                            <Text style={styles.earningsSubText}>{item.title}</Text>
                        </View>
                        <View style={{backgroundColor:'#6BE6D2',width:60,height:30,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                        <Text style={{color:'#000'}}>{item.price}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />
        </ScrollView>
    )
}

export default FacilityNextpayout

