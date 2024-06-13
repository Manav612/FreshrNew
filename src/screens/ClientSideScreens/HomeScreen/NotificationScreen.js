import React from 'react';
import { View, Text, SectionList, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { wallet } from '../../../constants/Icons';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation()
    const notifications = [
        { title: 'Today', data: [{ message: 'Payment Successful!', description: 'You have made a salon payment', color:COLOR.ORANGECOLOR }] },
        { title: 'Yesterday', data: [{ message: 'New Services Available!', description: 'Now You can search the nearest salon', color: COLOR.PINK }] },
        { title: "Today's Special Offers", data: [{ message: 'Today\'s Special Offers', description: 'You get a special promo today!', color: COLOR.YELLOW }] },
        { title: 'December 11, 2024', data: [{ message: 'Credit Card Connected!', description: 'Credit Card has been linked!', color: COLOR.BLUE }] },
        { title: 'Account Setup Successful!', data: [{ message: 'Account Setup Successful!', description: 'Your account has been created!', color: COLOR.GREEN }] },
    ];

    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor:COLOR.WHITE,borderRadius:10}}>
            <View style={{ height: 65, width: 65, backgroundColor: item.color, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={wallet} style={{ width: 35, height: 35 }} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLOR.BLACK}}>{item.message}</Text>
                <Text style={{ fontSize: 15, color: COLOR.BLACK }}>{item.description}</Text>
            </View>
        </View>
    );

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={{ fontSize: 22, color: COLOR.BLACK, marginTop: 20, marginBottom: 10}}>{title}</Text>
    );

    return (
        <SectionList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 15,marginHorizontal:15}}
            sections={notifications}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            ListHeaderComponent={
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', marginBottom: 10}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Notification</Text>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={28} color={COLOR.BLACK} />
                    </TouchableOpacity>
                </View>
            }
        />
    );
};

export default NotificationScreen;
