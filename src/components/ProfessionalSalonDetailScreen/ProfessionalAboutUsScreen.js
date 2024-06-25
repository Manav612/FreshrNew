// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
// import { useSelector } from 'react-redux';
// import { Screen_Height, Screen_Width } from '../../constants/Constants';
// import { useNavigation } from '@react-navigation/native';

// const AboutUsScreen = ({ facilitiesData }) => {
//     const [showMore, setShowMore] = useState(false);
//     const theme = useSelector(state => state.ThemeReducer);
//     const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
//     const navigation = useNavigation();
//     const [showFullText, setShowFullText] = useState(false);
//     const fullText = facilitiesData.description;
//     const truncatedText = fullText.slice(0, 30) + '...';

//     const toggleShowFullText = () => {
//         setShowFullText(!showFullText);
//     };

//     const formatTime = (time) => {
//         const [hours, minutes] = time.split(':');
//         const period = hours >= 12 ? 'PM' : 'AM';
//         const formattedHours = hours % 12 || 12;
//         return `${formattedHours}:${minutes} ${period}`;
//     };

//     const renderTimings = () => {
//         return Object.entries(facilitiesData.timing).map(([day, time]) => (
//             <Text style={{ fontSize: 16, color: COLOR.BLACK }} key={day}>
//                 {`${day} : ${formatTime(time.start)} - ${formatTime(time.end)}`}
//             </Text>
//         ));
//     };

//     return (
//         <View style={{ marginTop: 20 }}>
//             <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
//                 {showFullText ? fullText : truncatedText}
//             </Text>
//             <TouchableOpacity onPress={toggleShowFullText}>
//                 <Text style={{ color: COLOR.ORANGECOLOR }}>
//                     {showFullText ? 'Read Less' : 'Read More'}
//                 </Text>
//             </TouchableOpacity>
//             <Text style={{ color: COLOR.BLACK, fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>
//                 Working Hours
//             </Text>
//             <View>
//                 {renderTimings()}
//             </View>
//             <TouchableOpacity
//                 style={{
//                     width: Screen_Width * 0.80,
//                     height: Screen_Height * 0.05,
//                     backgroundColor: COLOR.ORANGECOLOR,
//                     justifyContent: 'center',
//                     borderRadius: 35,
//                     alignSelf: 'center',
//                     marginVertical: 20
//                 }}
//                 onPress={() => navigation.navigate('BookAppointment Screen')}
//             >
//                 <Text style={{ textAlign: 'center', fontSize: 18, color: COLOR.WHITE_80 }}>
//                     Book Now
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default AboutUsScreen;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Screen_Height, Screen_Width } from '../../constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR_DARK, COLOR_LIGHT } from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfessionalAboutUsScreen = ({ facilitiesData,ProfData }) => {
    const [showMore, setShowMore] = useState(false);
    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const navigation = useNavigation();
    const [showFullText, setShowFullText] = useState(false);
    const fullText = facilitiesData?.description;
    const truncatedText = fullText.slice(0, 30) + '...';

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        // const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes}`;
    };

    const getCurrentDay = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        return days[today.getDay()];
    };

    const currentDay = getCurrentDay();

    const renderTimings = () => {
        if (showMore) {
            return Object.entries(facilitiesData.timing).map(([day, time]) => (
                <Text style={{ fontSize: 16, color: COLOR.BLACK }} key={day}>
                    {`${day} : ${formatTime(time.start)} - ${formatTime(time.end)}`}
                </Text>
            ));
        } else {
            const currentDayTiming = facilitiesData.timing[currentDay];
            return (
                <Text style={{ fontSize: 16, color: COLOR.BLACK }}>
                    {`${currentDay} : ${formatTime(currentDayTiming.start)} - ${formatTime(currentDayTiming.end)}`}
                </Text>
            );
        }
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
        <View style={{ }}>
            <Text style={{ color: COLOR.BLACK, fontSize: 14 }}>
                {showFullText ? fullText : truncatedText}
            </Text>
            <TouchableOpacity onPress={toggleShowFullText}>
                <Text style={{ color: COLOR.ORANGECOLOR }}>
                    {showFullText ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
            <Text style={{ color: COLOR.BLACK, fontSize: 20, marginVertical: 10, fontWeight: 'bold' }}>
                Working Hours
            </Text>
            <View>
                {renderTimings()}
            </View>
            <TouchableOpacity onPress={toggleShowMore}>
                <Text style={{ color: COLOR.ORANGECOLOR,marginBottom:20 }}>
                    {showMore ? 'Read Less' : 'Read More'}
                </Text>
            </TouchableOpacity>
            
        </View>
        
    </>
    );
};

export default ProfessionalAboutUsScreen;

const styles = StyleSheet.create({});

