import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';
import { BBookmarkIcon, BEliteIcon, BHomeIcon, BQBIcon, BookingIcon, BookmarkFill, BookmarkOutline, HomeIcon, InboxIcon, LocationIcon, UserIcon } from '../../constants/Icons';
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
import MyBookMarkScreen from '../../screens/HomeScreen/MyBookMarkScreen';
import NearbyYourLocation from '../../screens/HomeScreen/NearbyYourLocation';
import MyProfile from '../../screens/HomeScreen/MyProfile';
import ChatScreen from '../../screens/InboxScreen/ChatScreen';
import Cancelbooking from '../../components/MyBookingDetails/Cancelbooking';
import Ourpackages from '../../components/OrderComponents/PackageDetail/Ourpackages';
import OurPackageDetail from '../../components/OrderComponents/PackageDetail/OurPackageDetail';
import Editprofile from '../../components/UserdetailsScreen/Editprofile';
import Security from '../../components/UserdetailsScreen/Security';
import PrivacyPolicy from '../../components/UserdetailsScreen/PrivacyPolicy';
import ReviewSummary from '../../components/OrderComponents/PaymentScreen/ReviewSummary';
import EReceipt from '../../components/OrderComponents/PaymentScreen/EReceipt';



const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            {/* <Stack.Screen name={NavigationScreens.ReviewSummaryScreen} component={ReviewSummary} /> */}
            {/* <Stack.Screen name={NavigationScreens.EReceiptScreen} component={EReceipt} /> */}
            <Stack.Screen name={NavigationScreens.HomeScreen} component={Home} />
            <Stack.Screen name={NavigationScreens.NotificationScreen} component={NotificationScreen} />
            <Stack.Screen name={NavigationScreens.MyBookMarkScreen} component={MyBookMarkScreen} />
            <Stack.Screen name={NavigationScreens.HaircutScreen} component={Haircuts} />
            <Stack.Screen name={NavigationScreens.MackupScreen} component={Mackup} />
            <Stack.Screen name={NavigationScreens.ManicureScreen} component={Manicure} />
            <Stack.Screen name={NavigationScreens.MassageScreen} component={Massage} />
            <Stack.Screen name={NavigationScreens.SearchFilterScreen} component={SearchFilter} />
            <Stack.Screen name={NavigationScreens.NearbyYourLocationScreen} component={NearbyYourLocation} />
            <Stack.Screen name={NavigationScreens.OurpackagesScreen} component={Ourpackages} />
            <Stack.Screen name={NavigationScreens.OurPackageDetailScreen} component={OurPackageDetail} />

            <Stack.Screen name={NavigationScreens.MyProfileScreen} component={MyProfile} />
            <Stack.Screen name={NavigationScreens.EditProfileScreen} component={Editprofile} />
            <Stack.Screen name={NavigationScreens.SecurityScreen} component={Security} />
            <Stack.Screen name={NavigationScreens.PrivacyPolicyScreen} component={PrivacyPolicy} />
            
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
            <Stack.Screen name={NavigationScreens.CancelbookingScreen} component={Cancelbooking} />
        </Stack.Navigator>
    );
};
const InboxStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.InboxScreen} component={Inbox} />
            <Stack.Screen name={NavigationScreens.ChatScreen} component={ChatScreen} />
        </Stack.Navigator>
    );
};

const FollowedStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={NavigationScreens.MyBookMarkScreen} component={MyBookMarkScreen} />
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
        title: "Followed",
        component: FollowedStack,
        icon:BookmarkOutline,
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