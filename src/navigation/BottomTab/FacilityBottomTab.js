
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';

import { BookingIcon, FacilitiesIcon, HistoryIcon, HomeIcon, InboxIcon, ScissorIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import FacilityHome from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityHome';
import FacilityDetalis from '../../screens/FacilitySideScreens/FacilityFacilitiesScreen/FacilityDetalis';import FacilityFacilitiesScreen from '../../screens/FacilitySideScreens/FacilityFacilitiesScreen/FacilityFacilitiesScreen';
import FacilityProfile from '../../screens/FacilitySideScreens/FacilityProfileScreen/FacilityProfile';
import ProfessionalSettingScreen from '../../components/ProfessionalComponents/ProfessionalSettingScreen';
import FacilitySettingScreen from '../../components/FacilityComponents/FacilitySettingScreen';
import FacilityViewMore from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityViewMore';
;

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.FacilityHomeScreen} component={FacilityHome} /> 
            <Stack.Screen name={NavigationScreens.FacilityViewMoreScreen} component={FacilityViewMore} /> 

        </Stack.Navigator>
    );
};

const FacilitiesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            
            <Stack.Screen name={NavigationScreens.FacilityFacilitiesScreen} component={FacilityFacilitiesScreen} />
            <Stack.Screen name={NavigationScreens.FacilityDetalisScreen} component={FacilityDetalis} />
            <Stack.Screen name={NavigationScreens.FacilitySettingScreen} component={FacilitySettingScreen} />

        </Stack.Navigator>
    );
};
const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.FacilityProfileScreen} component={FacilityProfile} />
          
        </Stack.Navigator>
    );
};

const Screens = [
    {
        name: NavigationScreens.FacilityHomeScreen + " " + NavigationScreens.FacilityBottomTab,
        title: "Home",
        component: HomeStack,
        icon: HomeIcon,
    },
    {
        name: NavigationScreens.FacilityFacilitiesScreen+ " " + NavigationScreens.FacilityBottomTab,
        title: "Facilities",
        component: FacilitiesStack,
        icon:FacilitiesIcon,
    },
    {
        name: NavigationScreens.FacilityProfileScreen + " " + NavigationScreens.FacilityBottomTab,
        title: "History",
        component: HistoryStack,
        icon: HistoryIcon,
    },
]

export default FacilityBottomTab = ({ route }) => {
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



