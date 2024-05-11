import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../constants/Colors';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import RBSheet from 'react-native-raw-bottom-sheet';

const SearchFilter = () => {
    const refRBSheet = useRef([]); // Initialize refRBSheet as an array

    const openBottomSheet = () => {
        refRBSheet.current[0].open();
    };

    const openItemBottomSheet = (index) => {
        refRBSheet.current[index + 1].open();
    };

    const [searchText, setSearchText] = useState('');
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

    return (
        <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15 }}>
            <View style={{ backgroundColor: COLOR.LIGHTGRAY, width: Screen_Width * 0.91, height: 50, paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <AntDesign name="search1" size={30} color={COLOR.GRAY} />
                    <TextInput
                        placeholder='Search'
                        placeholderTextColor={COLOR.GRAY}
                        style={{ fontSize: 20, color: COLOR.GRAY }}
                        onChangeText={text => setSearchText(text)}
                    />
                </View>
                <TouchableOpacity>
                    <Ionicons name="filter" size={30} color={COLOR.ORANGECOLOR} />
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: COLOR.BLACK_30, width: Screen_Width, height: 2, marginVertical: 10, paddingHorizontal: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: COLOR.BLACK, fontSize: 20, fontWeight: '600' }}>
                    {searchText ? (
                        <Text>
                            Result "<Text style={{ color: COLOR.ORANGECOLOR }}>{searchText}</Text>"
                        </Text>
                    ) : (
                        'Recent'
                    )}
                </Text>
                {searchText &&
                    <Text style={{ color: COLOR.ORANGECOLOR, fontSize: 20 }}>12,289 founds</Text>}
            </View>

            <View style={{}}>
                <Button
                    title="OPEN BOTTOM SHEET"
                    onPress={openBottomSheet}
                />
                <RBSheet
                    ref={(ref) => (refRBSheet.current[0] = ref)}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent',
                        },
                        draggableIcon: {
                            backgroundColor: '#000',
                        },
                    }}
                    customModalProps={{
                        animationType: 'slide',
                        statusBarTranslucent: true,
                    }}
                    customAvoidingViewProps={{
                        enabled: false,
                    }}>

                </RBSheet>
            </View>
        </ScrollView>
    )
}

export default SearchFilter;

const styles = StyleSheet.create({});
