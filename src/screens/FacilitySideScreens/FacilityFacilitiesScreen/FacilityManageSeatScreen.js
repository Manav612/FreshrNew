// import {
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     TouchableOpacity,
//     Modal,
//     TextInput,
//     FlatList,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';
// import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
// import { Screen_Height, Screen_Width } from '../../../constants/Constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_API_URL } from '../../../Services';
// import axios from 'axios';

// const FacilityManageSeatScreen = ({ route }) => {
//     const { data } = route.params;
//     console.log('=======        data  manage       ======>', data);
//     const navigation = useNavigation();
//     const theme = useSelector((state) => state.ThemeReducer);
//     const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//     const [isEditableFocused, setIsEditableFocused] = useState(false);
//     const [Editable, setEditable] = useState('');
//     const [fetchedProfList, setFetchedProfList] = useState([]);
//     const [fetchedProfName, setFetchedProfName] = useState([]);
//     const [fetchedProfPhone, setFetchedProfPhone] = useState([]);
//     const [isSeatFilled, setIsSeatFilled] = useState(selectedSeat?.filled || false);
//     const seatCapacity = data?.seatCapacity || [];

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const token = await AsyncStorage.getItem('AuthToken');
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             };
//             const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
//             console.log('========    Proff   ==========', res.data.professional);

//             // Extract emails from the response data
//             const emailList = res.data.professional.map((prof) => prof.user.email);
//             console.log('======     emails hkb     ===========', emailList);
//             const Name = res.data.professional.map((prof) => prof.user.firstName);
//             console.log('======     name hkb     ===========', Name);
//             setFetchedProfName(Name)
//             const Phone = res.data.professional.map((prof) => prof.user.phone);
//             console.log('======     Phone hkb     ===========', Phone);
//             setFetchedProfPhone(Phone)

//             setFetchedProfList(emailList);
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     const styles = StyleSheet.create({
//         HeaderView: {
//             marginVertical: 10,
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: 'row',
//         },
//         input: {
//             flex: 1,
//             alignSelf: 'center',
//             fontSize: 16,
//             color: COLOR.BLACK,
//         },
//         seatContainer: {
//             height: 100,
//             width: 80,
//             marginHorizontal: 5,
//             marginVertical: 5,
//             backgroundColor: COLOR.LIGHTGRAY,
//             borderRadius: 15,
//         },
//         seatHeader: {
//             height: 30,
//             backgroundColor: COLOR.ORANGECOLOR,
//             borderTopRightRadius: 15,
//             borderTopLeftRadius: 15,
//         },
//         seatHeaderText: {
//             color: COLOR.BLACK,
//             fontSize: 18,
//             textAlign: 'center',
//         },
//         seatBody: {
//             height: 90,
//             alignItems: 'center',
//             justifyContent: 'center',
//         },
//         modalOverlay: {
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//         modalContent: {
//             width: 300,
//             padding: 20,
//             backgroundColor: COLOR.WHITE,
//             borderRadius: 10,
//         },
//         modalTitle: {
//             fontSize: 18,
//             fontWeight: 'bold',
//             marginBottom: 10,
//         },
//         input2: {
//             height: 40,
//             backgroundColor: COLOR.AuthField,
//             borderRadius: 10,
//             marginBottom: 10,
//             paddingHorizontal: 10,
//         },
//     });

//     const [seats, setSeats] = useState(
//         Array.from({ length: seatCapacity }, (_, i) => ({ id: i + 1, filled: i < data.seatassign.length, name: '', phone: '', email: '', commission: '' }))
//     );
//     const [selectedSeat, setSelectedSeat] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);

//     // New states for email search
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleSeatPress = (seat) => {
//         setSelectedSeat(seat);
//         setModalVisible(true);
//         setIsSeatFilled(seat.filled);
//     };

//     const handleSave = () => {
//         setSeats(seats.map((seat) => (seat.id === selectedSeat.id ? selectedSeat : seat)));
//         setModalVisible(false);
//     };

//     const renderSeat = ({ item, index }) => (
//         <View style={styles.seatContainer}>
//             <View style={styles.seatHeader}>
//                 <Text style={styles.seatHeaderText}>{index + 1}</Text>
//             </View>
//             <TouchableOpacity style={styles.seatBody} onPress={() => handleSeatPress(item)}>
//                 <MaterialCommunityIcons
//                     name={item.filled ? 'sofa-single':'sofa-single-outline'}
//                     size={40}
//                     color={COLOR.ORANGECOLOR}
//                 />
//             </TouchableOpacity>
//         </View>
//     );

//     const handleSearch = (text) => {
//         setSearchQuery(text);
//         setFetchedProfList(fetchedProfList.filter((email) => email.toLowerCase().includes(text.toLowerCase())));
//     };

//     const handleEmailSelect = (email) => {
//         setSelectedSeat({ ...selectedSeat, email });
//         setSearchQuery(email);
//         setFetchedProfList([]);
//     };

//     return (
//         <ScrollView
//             showsVerticalScrollIndicator={false}
//             style={{
//                 width: Screen_Width,
//                 height: Screen_Height,
//                 paddingHorizontal: 15,
//                 backgroundColor: COLOR.WHITE,
//             }}
//         >
//             <View style={styles.HeaderView}>
//                 <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
//                     </TouchableOpacity>
//                     <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Manage Seat</Text>
//                 </View>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)}
//                     style={{
//                         backgroundColor: COLOR.WHITE,
//                         elevation: 20,
//                         shadowColor: COLOR.ChartBlue,
//                         height: 40,
//                         width: 40,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         borderRadius: 5,
//                     }}
//                 >
//                     <AntDesign name="setting" size={28} color={COLOR.BLACK} />
//                 </TouchableOpacity>
//             </View>
//             <View
//                 style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     marginVertical: 15,
//                 }}
//             >
//                 <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Set a charges for freelancer</Text>
//                 <View style={{ backgroundColor: COLOR.ORANGECOLOR, width: 120, borderRadius: 10 }}>
//                     <TextInput
//                         style={[styles.input, { color: COLOR.BLACK }]}
//                         placeholderTextColor={COLOR.BLACK}
//                         placeholder="Editable Filed"
//                         onFocus={() => setIsEditableFocused(true)}
//                         onBlur={() => setIsEditableFocused(false)}
//                         value={Editable}
//                         onChangeText={(text) => setEditable(text)}
//                     />
//                 </View>
//             </View>
//             <View
//                 style={{
//                     justifyContent: 'space-between',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginVertical: 10,
//                 }}
//             >
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <MaterialCommunityIcons name="sofa-single-outline" size={28} color={COLOR.ORANGECOLOR} />
//                     <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Available</Text>
//                 </View>
//                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                     <MaterialCommunityIcons name="sofa-single" size={28} color={COLOR.ORANGECOLOR} />
//                     <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Assigned</Text>
//                 </View>
//             </View>
//             <View style={{ width: Screen_Width, alignSelf: 'center' }}>
//                 <FlatList
//                     showsVerticalScrollIndicator={false}
//                     style={{ marginTop: 15, marginHorizontal: 15 }}
//                     data={seats.slice(0, seatCapacity)} // Ensure to show only the number of seats based on seatCapacity
//                     keyExtractor={(item) => item.id.toString()}
//                     numColumns={4}
//                     renderItem={renderSeat}
//                 />

//                 {selectedSeat && (
//                     <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
//                         <View style={styles.modalOverlay}>
//                             <View style={styles.modalContent}>
//                                 <Text style={styles.modalTitle}>Seat {selectedSeat.id} Details</Text>
//                                 <View style={{justifyContent:'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10}}>
//                                 <Text style={{color:COLOR.BLACK}}>{fetchedProfName}</Text>
//                                 </View>
//                                 <View style={{justifyContent:'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10}}>
//                                 <Text style={{color:COLOR.BLACK}}>{fetchedProfPhone}</Text>
//                                 </View>
                               
//                                 <TextInput
//                                     style={[styles.input2, { color: COLOR.BLACK }]}
//                                     placeholder="Email"
//                                     placeholderTextColor={COLOR.BLACK}
//                                     value={searchQuery}
//                                     onChangeText={handleSearch}
//                                 />
//                                 <FlatList
//                                     data={fetchedProfList}
//                                     keyExtractor={(item, index) => index.toString()}
//                                     renderItem={({ item }) => (
//                                         <TouchableOpacity onPress={() => handleEmailSelect(item)}>
//                                             <Text
//                                                 style={{
//                                                     padding: 10,
//                                                     backgroundColor: COLOR.LIGHTGRAY,
//                                                     borderBottomColor: COLOR.DARKGRAY,
//                                                     borderBottomWidth: 1,
//                                                 }}
//                                             >
//                                                 {item}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     )}
//                                     style={{ maxHeight: 150, marginBottom: 10 }}
//                                 />
//                                 <TextInput
//                                     style={[styles.input2, { color: COLOR.BLACK }]}
//                                     placeholder="Commission Split"
//                                     placeholderTextColor={COLOR.BLACK}
//                                     value={selectedSeat.commission}
//                                     onChangeText={(text) => setSelectedSeat({ ...selectedSeat, commission: text })}
//                                 />
//                                 <TouchableOpacity
//                                     onPress={handleSave}
//                                     style={{
//                                         width: 255,
//                                         backgroundColor: COLOR.ORANGECOLOR,
//                                         height: 40,
//                                         borderRadius: 10,
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                         marginVertical: 10,
//                                     }}
//                                 >
//                                     <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>{isSeatFilled ? 'Update' : 'Save'}</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => setModalVisible(false)}
//                                     style={{
//                                         width: 255,
//                                         backgroundColor: COLOR.ORANGECOLOR,
//                                         height: 40,
//                                         borderRadius: 10,
//                                         justifyContent: 'center',
//                                         alignItems: 'center',
//                                     }}
//                                 >
//                                     <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Cancel</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </Modal>
//                 )}
//             </View>
//             <View style={{ height: 100 }} />
//         </ScrollView>
//     );
// };

// export default FacilityManageSeatScreen;


import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API_URL } from '../../../Services';
import axios from 'axios';

const FacilityManageSeatScreen = ({ route }) => {
    const { data } = route.params;
    const facilityId = data.id
    console.log('=======        data  manage       ======>',data);
    const navigation = useNavigation();
    const theme = useSelector((state) => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [isEditableFocused, setIsEditableFocused] = useState(false);
    const [Editable, setEditable] = useState('');
    const [fetchedProfList, setFetchedProfList] = useState([]);
    const [fetchedProfName, setFetchedProfName] = useState();
    const [ profEmail,setProfEmail] = useState()
    const [fetchedProfPhone, setFetchedProfPhone] = useState();
    const [ProfId, setProfID] = useState();
    const [isSeatFilled, setIsSeatFilled] = useState(false);
    const [ assignedseats,setassignedseat] = useState([])
    const [ proflist,setProflist] = useState([])
    const seatCapacity = data?.seatCapacity || [];

    useEffect(() => {
        console.log("Asssss",seatCapacity);
        fetchData();
        fetchseatdata()
    }, []);

    const fetchseatdata =async()=>{
        try {
            const token = await AsyncStorage.getItem("AuthToken");
            const config = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
            const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/assignPro/${facilityId}`, config);
            console.log('========   use =============', res.data.facility.seatassign);
            // setFetchedData(res.data.data);
            setassignedseat(res.data.facility.seatassign)
          } catch (error) {
            console.error("Error:", error);
          }
       
      }
    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('AuthToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const res = await axios.get(`${BASE_API_URL}/hosts/host/facilities/professionals`, config);
            console.log('========    Proff   ==========', res.data.professional);
        
    
            const emailList = res.data.professional.map((prof) => prof.user.email);
            console.log('======     emails hkb     ===========', emailList);
         
 
            setProflist(res.data.professional);
            console.log('======     name hkb     ===========', fetchedProfName);


            setFetchedProfList(emailList);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    console.log();

    const styles = StyleSheet.create({
        HeaderView: {
            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
        },
        input: {
            flex: 1,
            alignSelf: 'center',
            fontSize: 16,
            color: COLOR.BLACK,
        },
        seatContainer: {
            height: 100,
            width: 80,
            marginHorizontal: 5,
            marginVertical: 5,
            backgroundColor: COLOR.LIGHTGRAY,
            borderRadius: 15,
        },
        seatHeader: {
            height: 30,
            backgroundColor: COLOR.ORANGECOLOR,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
        },
        seatHeaderText: {
            color: COLOR.BLACK,
            fontSize: 18,
            textAlign: 'center',
        },
        seatBody: {
            height: 90,
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            width: 300,
            padding: 20,
            backgroundColor: COLOR.WHITE,
            borderRadius: 10,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        input2: {
            height: 40,
            backgroundColor: COLOR.AuthField,
            borderRadius: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
            color:COLOR.BLACK,
        },
    });

    const [seats, setSeats] = useState(
        Array.from({ length: seatCapacity }, (_, i) => ( { id: i + 1, filled: i < data.seatassign.length, firstName: '', phone: '', email: '', commission: '' }))
    );
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const handleSeatPress = (seat) => {
        console.log("Asdasdas",seat);
        if (seat.filled) {
            setProfEmail(seat.email)
            setFetchedProfPhone(seat.phone)
            setFetchedProfName(seat.firstName)
            setProfID(seat._id)
        }
        setSelectedSeat(seat);
        setModalVisible(true);
        setIsSeatFilled(seat.filled);
    };
 

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('AuthToken');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const { commission } = selectedSeat;
            
            const data = JSON.stringify({
                facilityId,
                proId:ProfId,
                split: commission,
                
            });

            console.log("===========   res data     =============",data);

            const response = await axios.patch(`${BASE_API_URL}/hosts/host/facilities/assignPro/${facilityId}`, data, config);
            console.log('Response:', response.data);
            setSeats(seats.map((seat) => (seat.id === selectedSeat.id ? { ...selectedSeat, filled: true } : seat)));
            setModalVisible(false);
           {seats.length === 0 &&
            (
            setProfEmail(),
        setFetchedProfPhone(),
        setFetchedProfName(),
        setProfID()
            )
           }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderSeat = ({ item, index }) => (
 
        <View style={styles.seatContainer}>
            <View style={styles.seatHeader}>
                <Text style={styles.seatHeaderText}>{index + 1}</Text>
            </View>
            <TouchableOpacity style={styles.seatBody} onPress={() => handleSeatPress(item)}>
                <MaterialCommunityIcons
                    name={item.filled ? 'sofa-single':'sofa-single-outline'}
                    size={40}
                    color={COLOR.ORANGECOLOR}
                />
            </TouchableOpacity>
        </View>
    );

    const handleSearch = (text) => {
        setSearchQuery(text);
        setFetchedProfList(proflist.filter((email) => email.toLowerCase().includes(text.toLowerCase())));
    };

    const handleEmailSelect = (email,firstName,phone) => {
        setSelectedSeat({ ...selectedSeat, email,firstName,phone });
        setSearchQuery(email);
        setFetchedProfList([]);
    };
    const handleselectprofessional =(data)=>{
        handleEmailSelect(data.email,data.firstName,data.phone)
        setProfEmail(data.email)
        setFetchedProfPhone(data.phone)
        setFetchedProfName(data.firstName)
        setProfID(data._id)


    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                width: Screen_Width,
                height: Screen_Height,
                paddingHorizontal: 15,
                backgroundColor: COLOR.WHITE,
            }}
        >
            <View style={styles.HeaderView}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Manage Seat</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)}
                    style={{
                        backgroundColor: COLOR.WHITE,
                        elevation: 20,
                        shadowColor: COLOR.ChartBlue,
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                >
                    <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 15,
                }}
            >
                <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Set a charges for freelancer</Text>
                <View style={{ backgroundColor: COLOR.ORANGECOLOR, width: 120, borderRadius: 10 }}>
                    <TextInput
                        style={[styles.input, { color: COLOR.BLACK }]}
                        placeholderTextColor={COLOR.GRAY}
                        placeholder="Editable Filed"
                        onFocus={() => setIsEditableFocused(true)}
                        onBlur={() => setIsEditableFocused(false)}
                        value={Editable}
                        onChangeText={(text) => setEditable(text)}
                    />
                </View>
            </View>
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                }}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="sofa-single-outline" size={28} color={COLOR.ORANGECOLOR} />
                    <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Available</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="sofa-single" size={28} color={COLOR.ORANGECOLOR} />
                    <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: 'bold' }}>Assigned</Text>
                </View>
            </View>
            <View style={{ width: Screen_Width, alignSelf: 'center' }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 15, marginHorizontal: 15 }}
                    data={seats.slice(0, seatCapacity)}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={4}
                    renderItem={renderSeat}
                />

                {selectedSeat && (
                    <Modal transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Seat {selectedSeat.id} Details</Text>
                                <View style={{ justifyContent: 'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 }}>
                                    <Text style={{ color: COLOR.BLACK }}>Name : {fetchedProfName}</Text>
                                </View>
                                <View style={{ justifyContent: 'center', height: 40, backgroundColor: COLOR.AuthField, borderRadius: 10, marginBottom: 10, paddingHorizontal: 10 }}>
                                    <Text style={{ color: COLOR.BLACK }}>Phone : {fetchedProfPhone}</Text>
                                </View>
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Email"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                />
                                <FlatList
                                    data={proflist}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleselectprofessional(item.user)}>
                                            <Text
                                                style={{
                                                    padding: 10,
                                                    backgroundColor: COLOR.LIGHTGRAY,
                                                    borderBottomColor: COLOR.DARKGRAY,
                                                    borderBottomWidth: 1,
                                                }}
                                            >
                                                {item.user.email}
                                            </Text>
                                        </TouchableOpacity>
                                        
                                    )}
                                    style={{ maxHeight: 150, marginBottom: 10 }}
                                />
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Commission Split"
                                    placeholderTextColor={COLOR.GRAY}
                                    value={selectedSeat.commission}
                                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, commission: text })}
                                />
                                <TouchableOpacity
                                    onPress={handleSave}
                                    style={{
                                        width: 255,
                                        backgroundColor: COLOR.ORANGECOLOR,
                                        height: 40,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>{isSeatFilled ? 'Update' : 'Save'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{
                                        width: 255,
                                        backgroundColor: COLOR.ORANGECOLOR,
                                        height: 40,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

export default FacilityManageSeatScreen;

