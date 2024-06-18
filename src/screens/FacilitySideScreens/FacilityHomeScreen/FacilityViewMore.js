import { StyleSheet, Text, View, TouchableOpacity, ScrollView,FlatList, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationScreens } from '../../../constants/Strings';
import { ProfileData2 } from '../../../components/utils';
import { Screen_Height, Screen_Width } from '../../../constants/Constants';
import { screenWidth } from 'react-native-gifted-charts/src/utils';

const FacilityViewMore = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const styles = StyleSheet.create({
    HeaderView: {
      marginVertical: 10,
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row'
    },
  });

  return (
    <ScrollView style={{width:Screen_Width,height:Screen_Height,paddingHorizontal:15,backgroundColor:COLOR.WHITE}}>
      <View style={styles.HeaderView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(NavigationScreens.FacilityProfile2Screen)} style={{ backgroundColor: COLOR.WHITE, elevation: 20, shadowColor: COLOR.ChartBlue, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
          <AntDesign name="setting" size={28} color={COLOR.BLACK} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={ProfileData2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={{
            marginVertical: 10,
            padding: 20,
            backgroundColor: COLOR.WHITE,
            borderRadius: 20,
            elevation: 2,
            shadowColor: COLOR.BLACK,
            alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}
            onPress={() => {
              switch (item.name) {
                case 'Leader Board':
                  navigation.navigate(NavigationScreens.FacilityLeaderboardScreen);
                  break;
                case 'Gross Sales':
                  navigation.navigate(NavigationScreens.FacilityGrossSalesScreen);
                  break;
                case 'Pro Sales Details':
                  navigation.navigate(NavigationScreens.FacilityProsaledetailsScreen);
                  break;
                case 'Commission Splits':
                  navigation.navigate(NavigationScreens.FacilityCommissionsplitsScreen);
                  break;
                case 'Next Payout':
                  navigation.navigate(NavigationScreens.FacilityNextpayoutScreen);
                  break;
                default:
                  break;
              }
            }}
          >
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <Text style={{ fontWeight: '800', fontSize: 18, color: COLOR.BLACK }}>{item.text}</Text>
            </View>
            <Image source={item.img} style={{height:25,width:25}}/>
          </TouchableOpacity>
        )}
      />
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default FacilityViewMore

