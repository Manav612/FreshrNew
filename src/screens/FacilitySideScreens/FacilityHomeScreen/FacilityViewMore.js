import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FacilityViewMore = () => {
  const navigation = useNavigation();
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;

  const styles = StyleSheet.create({
    HeaderView: {
      paddingHorizontal: 15,
      marginVertical: 10,

    },
    overviewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15
    },
    overviewBox: {
      width: '48%',
      height: 200,
      padding: 15,
      backgroundColor: COLOR.WHITE,
      borderRadius: 20,
      marginVertical: 5
    },
    overviewBoxTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLOR.BLACK
    },
    overviewBoxValue: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 5,
      color: COLOR.BLACK
  },
  overviewBoxSubText: {
      fontSize: 14,
      color: COLOR.GRAY,
  },
  increaseText: {
      fontSize: 16,
      color: COLOR.ChartBlue, // lime-green color for increase
  },
  });

  return (
    <ScrollView>
      <View style={styles.HeaderView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={35} color={COLOR.BLACK} />
        </TouchableOpacity>
        <View style={styles.overviewRow}>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Leader Board</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Gross Sales</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Pro Sales Details</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Analytics</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
        </View>
        <View style={styles.overviewRow}>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Commission Splits</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
          <View style={styles.overviewBox}>
            <Text style={styles.overviewBoxTitle}>Payout Schedule</Text>
            <Text style={styles.overviewBoxValue}>10289 <Text style={styles.increaseText}>+2.5% ↑</Text></Text>
            <Text style={styles.overviewBoxSubText}>Compared to 9340 last month</Text>
          </View>
        </View>

      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  )
}

export default FacilityViewMore

