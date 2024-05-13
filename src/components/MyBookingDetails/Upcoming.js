import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { OnBoard1 } from '../../constants/Icons';

const Upcoming = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [toggleStatus, setToggleStatus] = useState({});
    const toggleBookmark = (sumit) => {
        setToggleStatus(prevState => ({
            ...prevState,
            [sumit]: !prevState[sumit]
        }));
    };
    const [upcomingData, setUpcomingData] = useState ([
        { id: 1, title: 'Dec 22, 2024 - 10:00 AM', Name: 'Lighthouse Barbers', Text: '5010 Hudson Plaza', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
        { id: 2, title: 'Nov 20, 2024 - 13:00 pM', Name: 'Quinaatura Salon', Text: '7892 Prairieview Avenue', Avelebal: 'Services', SBT: 'Undercut Haircut, Regular Shaving,Shampoo Hair Wash' },
        { id: 3, title: 'Oct 18, 2024 - 16:00 PM', Name: 'Luxuriate Barber', Text: '0496 8th Street', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
        { id: 4, title: 'May 12, 2024 - 12:00 AM', Name: 'Jelly Salon', Text: 'Uma Chokadi, Baroda', Avelebal: 'Services', SBT: 'Quiff Haircut, Regular Shaving,Shampoo Hair Wash' },
        { id: 5, title: 'Jun 26, 2024 - 11:00 pM', Name: 'Ajanta Barbers', Text: 'Rk Prime,Rajkot', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
    ]);

    const handleResetPress = (id) => {
        setUpcomingData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, resetSelected: !item.resetSelected, applySelected: false };
            }
            return item;
        }));
    };

    const handleApplyPress = (id) => {
        setUpcomingData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, applySelected: !item.applySelected, resetSelected: false };
            }
            return item;
        }));
    };

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 10, paddingHorizontal: 20, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginVertical:10 }}>
                <View>
                <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item.title}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
                    <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Remind me</Text>
                    <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
                        <FontAwesome
                            name={toggleStatus[item.id] ? "toggle-off" : "toggle-on"}
                            size={25}
                            color={COLOR.ORANGECOLOR}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

                <View style={{ height: 65, width: 65, backgroundColor: item.color, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={OnBoard1} style={{ width: 90, height: 100, resizeMode: 'cover', borderRadius: 10 }} />
                </View>
                <View style={{ flex: 1, marginLeft: 20 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>{item.Name}</Text>
                    <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{item.Text}</Text>
                    <Text style={{ fontSize: 15, color: COLOR.GRAY, marginVertical: 2 }}>{item.Avelebal}:</Text>
                    <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>{item.SBT}</Text>
                </View>
            </View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                <TouchableOpacity onPress={() => handleResetPress(item.id)} style={{ backgroundColor: item.resetSelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 140, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: item.resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleApplyPress(item.id)} style={{ backgroundColor: item.applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 140, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: item.applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>View E-Receipt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 15, marginHorizontal: 15 }}
            data={upcomingData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}

        />
    )
}

export default Upcoming

const styles = StyleSheet.create({})