
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';

import { BookingIcon, HomeIcon, InboxIcon, ScissorIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import FacilityHome from '../../screens/FacilitySideScreens/FacilityHomeScreen/FacilityHome';

const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.FacilityHomeScreen} component={FacilityHome} />  
        </Stack.Navigator>
    );
};

const FacilitiesStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            
            <Stack.Screen name={NavigationScreens.ProfessionalChatScreen} component={ProfessionalChatScreen} />
        </Stack.Navigator>
    );
};
const HistoryStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfessionalProfileScreen} component={ProfessionalProfile} />
          
        </Stack.Navigator>
    );
};

const Screens = [
    {
        name: NavigationScreens.ProfessionalHomeScreen + " " + NavigationScreens.FacilityBottomTab,
        title: "Home",
        component: HomeStack,
        icon: HomeIcon,
    },
    // {
    //     name: NavigationScreens.ProfessionalInboxScreen + " " + NavigationScreens.FacilityBottomTab,
    //     title: "Inbox",
    //     component: InboxStack,
    //     icon: InboxIcon,
    // },
    // {
    //     name: NavigationScreens.ProfessionalProfileScreen + " " + NavigationScreens.FacilityBottomTab,
    //     title: "Profile",
    //     component: ProfileStack,
    //     icon: UserIcon,
    // },
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



