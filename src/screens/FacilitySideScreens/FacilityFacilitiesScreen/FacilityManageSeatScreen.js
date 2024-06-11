import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { ManageSeat, Nextpayout } from '../../../components/utils';

const FacilityManageSeatScreen = () => {
    const navigation = useNavigation();
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const [isEditableFocused, setIsEditableFocused] = useState(false);
    const [Editable, setEditable] = useState('');
    const [isSeatFilled, setIsSeatFilled] = useState(selectedSeat?.filled || false);

    const styles = StyleSheet.create({
        HeaderView: {
            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row'
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
        },
    });
    const [seats, setSeats] = useState(
        Array.from({ length: 20 }, (_, i) => ({ id: i + 1, filled: i < 10, name: '', phone: '', email: '', commission: '' }))
    );
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSeatPress = (seat) => {
        setSelectedSeat(seat);
        setModalVisible(true);
        setIsSeatFilled(seat.filled);
    };

    const handleSave = () => {
        setSeats(seats.map(seat => seat.id === selectedSeat.id ? selectedSeat : seat));
        setModalVisible(false);
    };

    const renderSeat = ({ item, index }) => (

        <View style={styles.seatContainer}>
            <View style={styles.seatHeader}><Text style={styles.seatHeaderText}>{index + 1}</Text></View>
            <TouchableOpacity style={styles.seatBody} onPress={() => handleSeatPress(item)}>
                <MaterialCommunityIcons name={item.filled ? "sofa-single" : "sofa-single-outline"} size={40} color={COLOR.ORANGECOLOR} />
            </TouchableOpacity>
        </View>

    );
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15, backgroundColor: COLOR.WHITE }}>
            <View style={styles.HeaderView}>
                <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, color: COLOR.BLACK }}>Manage Seat</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilitySettingScreen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <AntDesign name="setting" size={28} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 15 }}>Set a charges for freelancer</Text>
                <View style={{ backgroundColor: COLOR.ORANGECOLOR, width: 120, borderRadius: 10 }}>
                    <TextInput
                        style={[styles.input, { color: COLOR.BLACK }]}
                        placeholderTextColor={COLOR.BLACK}
                        placeholder="Editable Filed"
                        onFocus={() => setIsEditableFocused(true)}
                        onBlur={() => setIsEditableFocused(false)}
                        value={Editable}
                        onChangeText={text => setEditable(text)}
                    />
                </View>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
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
                    data={seats}
                    keyExtractor={item => item.id.toString()}
                    numColumns={4}
                    renderItem={renderSeat}
                />

                {selectedSeat && (
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Seat {selectedSeat.id} Details</Text>
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Name"
                                    placeholderTextColor={COLOR.BLACK}
                                    value={selectedSeat.name}
                                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, name: text })}
                                />
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Phone"
                                    placeholderTextColor={COLOR.BLACK}
                                    value={selectedSeat.phone}
                                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, phone: text })}
                                />
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Email"
                                    placeholderTextColor={COLOR.BLACK}
                                    value={selectedSeat.email}
                                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, email: text })}
                                />
                                <TextInput
                                    style={[styles.input2, { color: COLOR.BLACK }]}
                                    placeholder="Commission Split"
                                    placeholderTextColor={COLOR.BLACK}
                                    value={selectedSeat.commission}
                                    onChangeText={(text) => setSelectedSeat({ ...selectedSeat, commission: text })}
                                />
                                {isSeatFilled ? (
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
                                        <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Update</Text>
                                    </TouchableOpacity>
                                ) : (
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
                                        <Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Save</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ width: 255, backgroundColor: COLOR.ORANGECOLOR, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: COLOR.WHITE, fontSize: 18 }}>Cancel</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
            </View>
            <View style={{ height: 100 }} />
        </ScrollView>
    )
}

export default FacilityManageSeatScreen

