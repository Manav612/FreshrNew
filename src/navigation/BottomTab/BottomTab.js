import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';
import { BBookmarkIcon, BEliteIcon, BHomeIcon, BQBIcon, BookingIcon, HomeIcon, InboxIcon, LocationIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from '../../screens/HomeScreen/Home';
import Explore from '../../screens/ExploreScreen/Explore';
import MyBooking from '../../screens/MyBookingScreen/MyBooking';
import Inbox from '../../screens/InboxScreen/Inbox';
import Profile from '../../screens/ProfileScreen/Profile';
import NotificationScreen from '../../screens/HomeScreen/NotificationScreen';
import Haircuts from '../../screens/HomeScreen/Haircuts';
import Mackup from '../../screens/HomeScreen/Mackup';
import Manicure from '../../screens/HomeScreen/Manicure';
import Massage from '../../screens/HomeScreen/Massage';
import SearchFilter from '../../screens/HomeScreen/SearchFilter';



const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.HomeScreen} component={Home} />
            <Stack.Screen name={NavigationScreens.NotificationScreen} component={NotificationScreen} />
            <Stack.Screen name={NavigationScreens.HaircutScreen} component={Haircuts} />
            <Stack.Screen name={NavigationScreens.MackupScreen} component={Mackup} />
            <Stack.Screen name={NavigationScreens.ManicureScreen} component={Manicure} />
            <Stack.Screen name={NavigationScreens.MassageScreen} component={Massage} />
            <Stack.Screen name={NavigationScreens.SearchFilterScreen} component={SearchFilter} />
        </Stack.Navigator>
    );
};

const ExploreStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ExploreScreen} component={Explore} />
        </Stack.Navigator>
    );
};
const MyBookingStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.MyBookingScreen} component={MyBooking} />
        </Stack.Navigator>
    );
};
const InboxStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.InboxScreen} component={Inbox} />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.ProfileScreen} component={Profile} />
        </Stack.Navigator>
    );
};

const Screens = [
    {
        name: NavigationScreens.HomeScreen + " " + NavigationScreens.HomeTab,
        title: "Home",
        component: HomeStack,
        icon:HomeIcon,
    },
    {
        name: NavigationScreens.ExploreScreen + " " + NavigationScreens.HomeTab,
        title: "Explore",
        component: ExploreStack,
        icon:LocationIcon,
    },
    {
        name: NavigationScreens.MyBookingScreen + " " + NavigationScreens.HomeTab,
        title: "My Booking",
        component: MyBookingStack,
        icon: BookingIcon,
    },
    {
        name: NavigationScreens.InboxScreen + " " + NavigationScreens.HomeTab,
        title: "Inbox",
        component: InboxStack,
        icon: InboxIcon,
    },
    {
        name: NavigationScreens.ProfileScreen + " " + NavigationScreens.HomeTab,
        title: "Profile",
        component: ProfileStack,
        icon: UserIcon,
    },
]
export default BottomTab = ({ route }) => {
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