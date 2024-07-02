// ProfessionalBottomTab.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';
import ProfessionalHome from '../../screens/ProfessionalScreens/ProfessionalHome/ProfessionalHome';
import ProfessionalServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalServices';
import { BookingIcon, HomeIcon, InboxIcon, ScissorIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import ProfessionalBooking from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalBooking';
import ProfessionalInbox from '../../screens/ProfessionalScreens/ProfessionalInboxScreen/ProfessionalInbox';
import ProfessionalChatScreen from '../../screens/ProfessionalScreens/ProfessionalInboxScreen/ProfessionalChatScreen';
import ProfessionalCancelbooking from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalCancelbooking';
import ProfessionalCancelled from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalCancelled';
import ProfessionalCompleted from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalCompleted';
import ProfessionalUpcoming from '../../screens/ProfessionalScreens/ProfessionalBookingScreen/ProfessionalUpcoming';
import ProfessionalProfile from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalProfile';
import ProfessionalEditprofile from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalEditprofile';
import ProfessionalSecurity from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalSecurity';
import ProfessionalPrivacyPolicy from '../../screens/ProfessionalScreens/ProfessionalProfile/ProfessionalPrivacyPolicy';
import TransactionHistoryScreen from '../../screens/ProfessionalScreens/ProfessionalHome/TranscationHistoryScreen';
import ProfessionalScheduleScreen from '../../components/ProfessionalComponents/ProfessionalScheduleScreen';
import ProfessionalSettingScreen from '../../components/ProfessionalComponents/ProfessionalSettingScreen';
import ProfessionalViewServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalViewInnerServices';
import ProfessionalInnerServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalInnerServices';
import ProfessionalViewInnerServices from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalViewInnerServices';
import ProfessionalProfile2 from '../../screens/ProfessionalScreens/ProfessionalProfile2/ProfessionalProfile2';
import profselectservice from '../../screens/ProfessionalScreens/ProfessionalServices/profselectservice';
import profselectedDetailservice from '../../screens/ProfessionalScreens/ProfessionalServices/profselectedDetailservice';
import ProfessionalEditService from '../../screens/ProfessionalScreens/ProfessionalServices/ProfessionalEditService';
import LiveTrackingProfSide from '../../components/ProfessionalComponents/LiveTrackingProfSide';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalHomeScreen} component={ProfessionalHome} />
            <Stack.Screen name={NavigationScreens.TransactionHistoryScreen} component={TransactionHistoryScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />
           
        </Stack.Navigator>
    );
};

const ServicesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalServicesScreen} component={ProfessionalServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalInnerServicesScreen} component={ProfessionalInnerServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewInnerServicesScreen} component={ProfessionalViewInnerServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />
            <Stack.Screen name={NavigationScreens.profselectserviceScreen} component={profselectservice} />
            <Stack.Screen name={NavigationScreens.profselectedDetailserviceScreen} component={profselectedDetailservice} />
            <Stack.Screen name={NavigationScreens.professionalEditServiceScreen} component={ProfessionalEditService} />



        </Stack.Navigator>
    );
};

const MyBookingStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalBookingScreen} component={ProfessionalBooking} />
            <Stack.Screen name={NavigationScreens.ProfessionalCancelbookingScreen} component={ProfessionalCancelbooking} />
            <Stack.Screen name={NavigationScreens.ProfessionalCancelledScreen} component={ProfessionalCancelled} />
            <Stack.Screen name={NavigationScreens.ProfessionalCompletedScreen} component={ProfessionalCompleted} />
            <Stack.Screen name={NavigationScreens.ProfessionalUpcomingScreen} component={ProfessionalUpcoming} />
            <Stack.Screen name={NavigationScreens.ProfessionalScheduleScreen} component={ProfessionalScheduleScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalSettingScreen} component={ProfessionalSettingScreen} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewServicesScreen} component={ProfessionalViewServices} />
            <Stack.Screen name={NavigationScreens.ProfessionalProfile2Screen} component={ProfessionalProfile2} />
            <Stack.Screen name={NavigationScreens.LiveTrackingProfSideScreen} component={LiveTrackingProfSide} />




        </Stack.Navigator>
    );
};
const InboxStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalInboxScreen} component={ProfessionalInbox} />
            <Stack.Screen name={NavigationScreens.ProfessionalChatScreen} component={ProfessionalChatScreen} />
        </Stack.Navigator>
    );
};
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalProfileScreen} component={ProfessionalProfile} />
            <Stack.Screen name={NavigationScreens.ProfessionalEditProfileScreen} component={ProfessionalEditprofile} />
            <Stack.Screen name={NavigationScreens.ProfessionalSecurityScreen} component={ProfessionalSecurity} />
            <Stack.Screen name={NavigationScreens.ProfessionalPrivacyPolicyScreen} component={ProfessionalPrivacyPolicy} />
            <Stack.Screen name={NavigationScreens.ProfessionalViewInnerServicesScreen} component={ProfessionalViewInnerServices} />

            <Stack.Screen name={NavigationScreens.professionalEditServiceScreen} component={ProfessionalEditService} />

        </Stack.Navigator>
    );
};

const Screens = [
    {
        name: NavigationScreens.ProfessionalHomeScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Home",
        component: HomeStack,
        icon: HomeIcon,
    },
    {
        name: NavigationScreens.ProfessionalServicesScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Services",
        component: ServicesStack,
        icon: ScissorIcon,
    },
    {
        name: NavigationScreens.ProfessionalBookingScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Bookings",
        component: MyBookingStack,
        icon: BookingIcon,
    },
    {
        name: NavigationScreens.ProfessionalInboxScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Inbox",
        component: InboxStack,
        icon: InboxIcon,
    },
    {
        name: NavigationScreens.ProfessionalProfileScreen + " " + NavigationScreens.ProfessionalBottomTab,
        title: "Profile",
        component: ProfileStack,
        icon: UserIcon,
    },
]

export default ProfessionalBottomTab = ({ route }) => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            // unmountOnBlur: true,
        }}
            tabBar={(props) => (<TabBar {...props} route={route} />)}
        >
            {
                Screens.map((screen, i) => {
                    return (
                        <Tab.Screen
                            name={screen.name}
                            component={screen.component}
                            options={{
                                title: screen.title,
                                tabBarIcon: screen.icon,
                            }}
                            key={i}
                        />
                    )
                })
            }
        </Tab.Navigator>
    );
}



