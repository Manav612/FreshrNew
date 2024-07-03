import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationScreens } from '../../constants/Strings';
import React from 'react';
import TabBar from './TabBar';
import { BBookmarkIcon, BEliteIcon, BHomeIcon, BQBIcon, BookingIcon, BookmarkFill, BookmarkOutline, HomeIcon, InboxIcon, LocationIcon, UserIcon } from '../../constants/Icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from '../../screens/ClientSideScreens/HomeScreen/Home';
import Explore from '../../screens/ClientSideScreens/ExploreScreen/Explore';
import MyBooking from '../../screens/ClientSideScreens/MyBookingScreen/MyBooking';
import Inbox from '../../screens/ClientSideScreens/InboxScreen/Inbox';
import NotificationScreen from '../../screens/ClientSideScreens/HomeScreen/NotificationScreen';
import Haircuts from '../../screens/ClientSideScreens/HomeScreen/Haircuts';
import Mackup from '../../screens/ClientSideScreens/HomeScreen/Mackup';
import Manicure from '../../screens/ClientSideScreens/HomeScreen/Manicure';
import Massage from '../../screens/ClientSideScreens/HomeScreen/Massage';
import SearchFilter from '../../screens/ClientSideScreens/HomeScreen/SearchFilter';
import MyBookMarkScreen from '../../screens/ClientSideScreens/HomeScreen/MyBookMarkScreen';
import NearbyYourLocation from '../../screens/ClientSideScreens/HomeScreen/NearbyYourLocation';
import MyProfile from '../../screens/ClientSideScreens/HomeScreen/MyProfile';
import ChatScreen from '../../screens/ClientSideScreens/InboxScreen/ChatScreen';
import Cancelbooking from '../../components/MyBookingDetails/Cancelbooking';
import OurServices from '../../components/OrderComponents/OurServices';
import ServiceDetails from '../../components/OrderComponents/ServiceDetails';
import Ourpackages from '../../components/OrderComponents/PackageDetail/Ourpackages';
import OurPackageDetail from '../../components/OrderComponents/PackageDetail/OurPackageDetail';
import Editprofile from '../../components/UserdetailsScreen/Editprofile';
import Security from '../../components/UserdetailsScreen/Security';
import PrivacyPolicy from '../../components/UserdetailsScreen/PrivacyPolicy';
import ReviewSummary from '../../components/OrderComponents/PaymentScreen/ReviewSummary';
import EReceipt from '../../components/OrderComponents/PaymentScreen/EReceipt';
import OurGallery from '../../components/OrderComponents/OurGallery';
import ReviewsDetail from '../../components/OrderComponents/ReviewsDetailScreen/ReviewsDetail';
import BookAppointmentScreen from '../../components/OrderComponents/BookAppointment/BookAppointmentScreen';
import OurProfessionalDetails from '../../components/OrderComponents/OurProfessionalDetails';
import PaymentMethod from '../../components/OrderComponents/PaymentScreen/PaymentMethod';
import BookingHoursScreen from '../../components/OrderComponents/BookAppointment/BookingHoursScreen';
import ClientSettingScreen from '../../components/ClientSideComponents/ClientSettingScreen';
import ProfessionalInfo from '../../screens/ClientSideScreens/HomeScreen/ProfessionalInfo';
import Delivery from '../../screens/ClientSideScreens/HomeScreen/Delivery';
import Salon from '../../screens/ClientSideScreens/HomeScreen/Salon';
import AddAddress from '../../screens/ClientSideScreens/HomeScreen/AddAddress';
import FacilityList from '../../components/FacilityComponents/FacilityList';
import ReserveNowServices from '../../components/OrderComponents/ReserveNowServices';
import LiveTrackingClientSide from '../../components/ClientSideComponents/LiveTrackingClientSide';
import OrderProcessingScreenClientSide from '../../components/ClientSideComponents/OrderProcessingScreenClientSide';
import SelectDeliveryLocation from '../../screens/ClientSideScreens/HomeScreen/SelectDeliveryLocation';




const Tab = createBottomTabNavigator();
const Stack = createSharedElementStackNavigator();
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>

            <Stack.Screen name={NavigationScreens.HomeScreen} component={Home} />
            <Stack.Screen name={NavigationScreens.AddAddressScreen} component={AddAddress} />
            <Stack.Screen name={NavigationScreens.SelectDeliveryLocationScreen} component={SelectDeliveryLocation} />
            <Stack.Screen name={NavigationScreens.DeliveryScreen} component={Delivery} />
            <Stack.Screen name={NavigationScreens.SalonScreen} component={Salon} />
            <Stack.Screen name={NavigationScreens.NotificationScreen} component={NotificationScreen} />
            <Stack.Screen name={NavigationScreens.MyBookMarkScreen} component={MyBookMarkScreen} />
            <Stack.Screen name={NavigationScreens.HaircutScreen} component={Haircuts} />
            <Stack.Screen name={NavigationScreens.MackupScreen} component={Mackup} />
            <Stack.Screen name={NavigationScreens.ManicureScreen} component={Manicure} />
            <Stack.Screen name={NavigationScreens.MassageScreen} component={Massage} />
            <Stack.Screen name={NavigationScreens.SearchFilterScreen} component={SearchFilter} />
            <Stack.Screen name={NavigationScreens.NearbyYourLocationScreen} component={NearbyYourLocation} />
            <Stack.Screen name={NavigationScreens.ClientSettingScreen} component={ClientSettingScreen} />
            <Stack.Screen name={NavigationScreens.FacilityListScreen} component={FacilityList} />

            <Stack.Screen name={NavigationScreens.OurProfessionalDetailsScreen} component={OurProfessionalDetails} />
            <Stack.Screen name={NavigationScreens.ProfessionalInfoScreen} component={ProfessionalInfo} />



            <Stack.Screen name={NavigationScreens.OurServicesScreen} component={OurServices} />
            <Stack.Screen name={NavigationScreens.ReserveNowServicesScreen} component={ReserveNowServices} />
            <Stack.Screen name={NavigationScreens.ServiceDetailsScreen} component={ServiceDetails} />

            <Stack.Screen name={NavigationScreens.OurpackagesScreen} component={Ourpackages} />
            <Stack.Screen name={NavigationScreens.OurPackageDetailScreen} component={OurPackageDetail} />
            <Stack.Screen name={NavigationScreens.OurGalleryScreen} component={OurGallery} />
            <Stack.Screen name={NavigationScreens.ReviewsDetailScreen} component={ReviewsDetail} />
            <Stack.Screen name={NavigationScreens.BookAppointmentScreen} component={BookAppointmentScreen} />
            <Stack.Screen name={NavigationScreens.BookingHoursScreen} component={BookingHoursScreen} />
            <Stack.Screen name={NavigationScreens.InboxScreen} component={Inbox} />
            <Stack.Screen name={NavigationScreens.ChatScreen} component={ChatScreen} />
           
            <Stack.Screen name={NavigationScreens.PaymentMethodScreen} component={PaymentMethod} />
            <Stack.Screen name={NavigationScreens.LiveTrackingClientSideScreen} component={LiveTrackingClientSide} />
            <Stack.Screen name={NavigationScreens.OrderProcessingScreenClientSideScreen} component={OrderProcessingScreenClientSide} />

            <Stack.Screen name={NavigationScreens.ReviewSummaryScreen} component={ReviewSummary} />
            <Stack.Screen name={NavigationScreens.EReceiptScreen} component={EReceipt} />

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
const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            
            <Stack.Screen name={NavigationScreens.MyProfileScreen} component={MyProfile} />
            <Stack.Screen name={NavigationScreens.EditProfileScreen} component={Editprofile} />
            <Stack.Screen name={NavigationScreens.SecurityScreen} component={Security} />
            <Stack.Screen name={NavigationScreens.PrivacyPolicyScreen} component={PrivacyPolicy} />
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
        icon: HomeIcon,
    },
    {
        name: NavigationScreens.ExploreScreen + " " + NavigationScreens.HomeTab,
        title: "Explore",
        component: ExploreStack,
        icon: LocationIcon,
    },
    {
        name: NavigationScreens.MyBookingScreen + " " + NavigationScreens.HomeTab,
        title: "Bookings",
        component: MyBookingStack,
        icon: BookingIcon,
    },
    {
        name: NavigationScreens.ProfileScreen + " " + NavigationScreens.HomeTab,
        title: "Following",
        component: FollowedStack,
        icon: BBookmarkIcon,
    },
    {
        name: NavigationScreens.InboxScreen + " " + NavigationScreens.HomeTab,
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