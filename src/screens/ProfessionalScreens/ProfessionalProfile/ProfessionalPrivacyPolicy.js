import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Screen_Height, Screen_Width } from '../../../constants/Constants'
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const ProfessionalPrivacyPolicy = () => {
  const navigation = useNavigation()
  const theme = useSelector(state => state.ThemeReducer);
  const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
  const COLOR1 = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;
  return (
    <ScrollView style={{ width: Screen_Width, height: Screen_Height, paddingHorizontal: 15,backgroundColor:COLOR.WHITE }}>
    <View style={{ width: Screen_Width, height: Screen_Height * 0.05, flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10 }}>
      <AntDesign onPress={() => navigation.goBack()} name="arrowleft" size={30} color="black" />
      <Text style={{ fontWeight: '600', fontSize: 25, color:COLOR.BLACK }}>Privacy Policy</Text>
    </View>
    <View style={{justifyContent:'center',alignContent:'center',marginVertical:10}}>
        <Text style={{color:COLOR.BLACK,fontSize:18,fontWeight:'900',marginVertical:5}}> 1. Type of Data We Collect</Text>
        <Text style={{color:COLOR.GRAY,fontSize:15,marginVertical:5}}>This privacy policy governs your use of the software applications (“Applications”) for mobile devices that was hosted at NIC e-Gov Mobile App Store in Google Play. The Applications mainly provide eGovernance Services delivery and intends to provide better citizen services by the government. The contents published on these Applications were provided by the concerned Ministries/Departments of Government of India or the allied government establishment. This information provided through these applications may not have any legal sanctity and are for general reference only, unless otherwise specified.</Text>
    </View>
    <View style={{justifyContent:'center',alignContent:'center',marginVertical:8}}>
        <Text style={{color:COLOR.BLACK,fontSize:18,fontWeight:'900',marginVertical:5}}> 2. Use of Your Personal Data</Text>
        <Text style={{color:COLOR.GRAY,fontSize:15,marginVertical:5}}>If you do not want the app to use your location for the purposes set forth above, you should turn off the location services for the mobile application located in your account settings or in your mobile phone settings and/or within the mobile application. However, if the service provided by the Application requires the location services using GPS technology, such services offered by the application will not be available for you.</Text>
    </View>
    <View style={{justifyContent:'center',alignContent:'center',marginVertical:8}}>
        <Text style={{color:COLOR.BLACK,fontSize:18,fontWeight:'900',marginVertical:5}}> 3. Disclosure of your personal Data</Text>
        <Text style={{color:COLOR.GRAY,fontSize:15,marginVertical:5}}>We are concerned about safeguarding the confidentiality of your information. We provide physical, electronic, and procedural safeguards to protect information we process and maintain. For example, we limit access to this information to authorized employees and contractors who need to know that information in order to operate, develop or improve our Application. Please be aware that, although we endeavour to provide reasonable security for information we process and maintain.</Text>
    </View>
    <View style={{height:90}}/>
    </ScrollView>
  )
}

export default ProfessionalPrivacyPolicy

const styles = StyleSheet.create({})