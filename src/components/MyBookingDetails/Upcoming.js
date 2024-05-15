// import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList } from 'react-native'
// import React, { useRef, useState } from 'react'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { useSelector } from 'react-redux';
// import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
// import { OnBoard1 } from '../../constants/Icons';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import { Screen_Height, Screen_Width } from '../../constants/Constants';

// const Upcoming = () => {
//     const theme = useSelector(state => state.ThemeReducer);
//     const [resetSelected, setResetSelected] = useState(false);
//     const [applySelected, setApplySelected] = useState(false);
//     const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//     const [toggleStatus, setToggleStatus] = useState({});
//     const toggleBookmark = (sumit) => {
//         setToggleStatus(prevState => ({
//             ...prevState,
//             [sumit]: !prevState[sumit]
//         }));
//     };
//     const [upcomingData, setUpcomingData] = useState([
//         { id: 1, title: 'Dec 22, 2024 - 10:00 AM', Name: 'Lighthouse Barbers', Text: '5010 Hudson Plaza', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
//         { id: 2, title: 'Nov 20, 2024 - 13:00 pM', Name: 'Quinaatura Salon', Text: '7892 Prairieview Avenue', Avelebal: 'Services', SBT: 'Undercut Haircut, Regular Shaving,Shampoo Hair Wash' },
//         { id: 3, title: 'Oct 18, 2024 - 16:00 PM', Name: 'Luxuriate Barber', Text: '0496 8th Street', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
//         { id: 4, title: 'May 12, 2024 - 12:00 AM', Name: 'Jelly Salon', Text: 'Uma Chokadi, Baroda', Avelebal: 'Services', SBT: 'Quiff Haircut, Regular Shaving,Shampoo Hair Wash' },
//         { id: 5, title: 'Jun 26, 2024 - 11:00 pM', Name: 'Ajanta Barbers', Text: 'Rk Prime,Rajkot', Avelebal: 'Services', SBT: 'Quiff Haircut, Thin Shaving,Aloe Vera,Shampoo Hair Wash' },
//     ]);

//     const handleResetPress = (id) => {
//         setUpcomingData(prevData => prevData.map(item => {
//             if (item.id === id) {
//                 return { ...item, resetSelected: !item.resetSelected, applySelected: false };
//             }
//             return item;
//         }));
//     };

//     const handleApplyPress = (id) => {
//         setUpcomingData(prevData => prevData.map(item => {
//             if (item.id === id) {
//                 return { ...item, applySelected: !item.applySelected, resetSelected: false };
//             }
//             return item;
//         }));
//     };

//     const handleResetPress1 = () => {
//         setResetSelected(!resetSelected);
//         setApplySelected(false);
//     };

//     const handleApplyPress2 = () => {
//         setApplySelected(!applySelected);
//         setResetSelected(false);
//     };

//     const refRBSheet = useRef([]);
//     const openBottomSheet = () => {
//         refRBSheet.current[0].open();
//     };
//     const openItemBottomSheet = (index) => {
//         refRBSheet.current[index + 1].open();
//     };

//     const renderItem = ({ item }) => (
//         <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 10, paddingHorizontal: 20, marginVertical: 5 }}>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
//                 <View>
//                     <Text style={{ fontSize: 14, color: COLOR.BLACK }}>{item.title}</Text>
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10 }}>
//                     <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Remind me</Text>
//                     <TouchableOpacity onPress={() => toggleBookmark(item.id)}>
//                         <FontAwesome
//                             name={toggleStatus[item.id] ? "toggle-off" : "toggle-on"}
//                             size={25}
//                             color={COLOR.ORANGECOLOR}
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//             <View style={{ backgroundColor: COLOR.LINECOLOR, height: 2, marginVertical: 5, paddingHorizontal: 10 }} />
//             <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>

//                 <View style={{ height: 65, width: 65, backgroundColor: item.color, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
//                     <Image source={OnBoard1} style={{ width: 90, height: 100, resizeMode: 'cover', borderRadius: 10 }} />
//                 </View>
//                 <View style={{ flex: 1, marginLeft: 20 }}>
//                     <Text style={{ fontSize: 25, fontWeight: 'bold', color: COLOR.BLACK, marginVertical: 2 }}>{item.Name}</Text>
//                     <Text style={{ fontSize: 15, color: COLOR.BLACK, marginVertical: 2 }}>{item.Text}</Text>
//                     <Text style={{ fontSize: 15, color: COLOR.GRAY, marginVertical: 2 }}>{item.Avelebal}:</Text>
//                     <Text style={{ fontSize: 15, color: COLOR.ORANGECOLOR, marginVertical: 2 }}>{item.SBT}</Text>
//                 </View>
//             </View >
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
//                 <TouchableOpacity onPress={() => { handleResetPress(item.id), openBottomSheet() }} style={{ backgroundColor: item.resetSelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 140, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
//                     <Text style={{ fontSize: 18, fontWeight: '700', color: item.resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel Booking</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => handleApplyPress(item.id)} style={{ backgroundColor: item.applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 140, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
//                     <Text style={{ fontSize: 18, fontWeight: '700', color: item.applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>View E-Receipt</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );

//     return (
//         <>
//             <FlatList
//                 showsVerticalScrollIndicator={false}
//                 style={{ marginTop: 15, marginHorizontal: 15 }}
//                 data={upcomingData}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={renderItem}
//             />
//             <View style={{}}>
//                 <RBSheet
//                     ref={(ref) => (refRBSheet.current[0] = ref)}

//                     height={Screen_Height * 0.30}
//                     customStyles={{

//                         wrapper: {
//                             backgroundColor: 'transparent',
//                         },
//                         container: {
//                             backgroundColor: COLOR.WHITE,
//                             borderRadius: 40,
//                             borderBottomRightRadius: 0,
//                             borderBottomLeftRadius: 0,
//                             elevation: 10,
//                             shadowColor: COLOR.BLACK,
//                         },
//                         draggableIcon: {
//                             backgroundColor: COLOR.BLACK,
//                         },
//                     }}
//                     customModalProps={{
//                         animationType: 'slide',
//                         statusBarTranslucent: true,
//                     }}
//                     customAvoidingViewProps={{
//                         enabled: false,
//                     }}>
//                     <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
//                         <View style={{ justifyContent: 'center', alignItems: 'center', }}>
//                             <Text style={{ fontWeight: '600', fontSize: 25,color:COLOR.CANCEL_B }}>Cancel Booking</Text>
//                         </View>
//                         <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
//                         <View style={{justifyContent:'center',marginVertical:10,paddingHorizontal:30,gap:10}}>
//                             <Text style={{color:COLOR.BLACK,textAlign:'center',fontSize:18,fontWeight:'800'}}>Are you sure want to cancel your barber/salon booking?</Text>
//                             <Text style={{color:COLOR.GRAY,textAlign:'center',fontSize:15}}>Only 80% of the money you can refund from your payment according to our policy</Text>
//                         </View>
//                         <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
//                             <TouchableOpacity onPress={handleResetPress1} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
//                                 <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={handleApplyPress2} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
//                                 <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes, Cancel Booking</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>    
//                 </RBSheet>
//             </View>
//         </>
//     )
// }

// export default Upcoming

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import { OnBoard1 } from '../../constants/Icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';

const Upcoming = () => {
    const theme = useSelector(state => state.ThemeReducer);
    const [resetSelected, setResetSelected] = useState(false);
    const [applySelected, setApplySelected] = useState(false);
    const navigation = useNavigation()
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [toggleStatus, setToggleStatus] = useState({});
    const toggleBookmark = (sumit) => {
        setToggleStatus(prevState => ({
            ...prevState,
            [sumit]: !prevState[sumit]
        }));
    };
    const [upcomingData, setUpcomingData] = useState([
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

    const handleResetPress1 = () => {
        setResetSelected(!resetSelected);
        setApplySelected(false);
    };

    const handleApplyPress2 = () => {
        setApplySelected(!applySelected);
        setResetSelected(false);
    };

    const refRBSheet = useRef([]);
    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };
    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: COLOR.WHITE, borderRadius: 10, paddingHorizontal: 20, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
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
                <TouchableOpacity onPress={() => { handleResetPress(item.id), openBottomSheet() }} style={{ backgroundColor: item.resetSelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 130, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontWeight: '700', color: item.resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel Booking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleApplyPress(item.id)} style={{ backgroundColor: item.applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 45, borderRadius: 30, width: 130, alignItems: 'center', justifyContent: 'center', borderColor: COLOR.ORANGECOLOR, borderWidth: 2 }}>
                    <Text style={{ fontWeight: '700', color: item.applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>View E-Receipt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15, marginHorizontal: 15 }}
                data={upcomingData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <View style={{}}>
                <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}

                    height={Screen_Height * 0.30}
                    customStyles={{

                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        container: {
                            backgroundColor: COLOR.WHITE,
                            borderRadius: 40,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 0,
                            elevation: 10,
                            shadowColor: COLOR.BLACK,
                        },
                        draggableIcon: {
                            backgroundColor: COLOR.BLACK,
                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>
                    <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ fontWeight: '600', fontSize: 25,color:COLOR.CANCEL_B }}>Cancel Booking</Text>
                        </View>
                        <View style={{ backgroundColor: COLOR.LINECOLOR, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
                        <View style={{justifyContent:'center',marginVertical:10,paddingHorizontal:30,gap:10}}>
                            <Text style={{color:COLOR.BLACK,textAlign:'center',fontSize:18,fontWeight:'800'}}>Are you sure want to cancel your barber/salon booking?</Text>
                            <Text style={{color:COLOR.GRAY,textAlign:'center',fontSize:15}}>Only 80% of the money you can refund from your payment according to our policy</Text>
                        </View>
                        <View style={{ width: Screen_Width * 0.91, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                            <TouchableOpacity onPress={() => {handleResetPress1(); refRBSheet.current[0].close()}} style={{ backgroundColor: resetSelected ? COLOR.ORANGECOLOR : COLOR.GULABI, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: resetSelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{handleApplyPress2(); navigation.navigate('Cancelbooking Screen'); refRBSheet.current[0].close()}} style={{ backgroundColor: applySelected ? COLOR.ORANGECOLOR : COLOR.WHITE, height: 50, borderRadius: 30, width: 170, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: '700', color: applySelected ? COLOR.WHITE : COLOR.ORANGECOLOR }}>Yes, Cancel Booking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                </RBSheet>
            </View>
        </>
    )
}

export default Upcoming

const styles = StyleSheet.create({})
