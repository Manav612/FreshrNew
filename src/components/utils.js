
import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';

import { Hair1, OnBoard3, banner1, banner2, banner3, banner4, banner5, barber, barber2, barber3, barber4, call, map, message, share, sp1, sp2, web } from '../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';


export const ProfileData = [
    {
      id: '1',
      img: banner1
    },
    {
      id: '2',
      img: banner2
    },
    {
      id: '3',
      img: banner3
    },
    {
      id: '4',
      img: banner4
    },
  ];
  export const barberData = [{ 
    id: '1', 
    image: barber
  },
  { 
    id: '2',
    image: barber2
  },
  { 
    id: '3', 
    image: barber3
  },
  { 
    id: '4', 
    image: barber4
  }
];
  export const data = [
    {id: '1', text: 'All'},
    {id: '2', text: 'Haircuts'},
    {id: '3', text: 'Make up'},
    {id: '4', text: 'Manicure'},
    {id: '5', text: 'Massage'},
  ];

 export const data2 = [
    {
      id: '1',
      text: 'Belle curls',
      address: '0993 novick parkway',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '2',
      text: 'Belle curls',
      address: '0993 novick parkway',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '3',
      text: 'Haircuts',
      address: '88 commercial plaza',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '4',
      text: 'Haircuts',
      address: '88 commercial plaza',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '5',
      text: 'Make up',
      address: '9 Evergreen drive',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '6',
      text: 'Make up',
      address: '9 Evergreen drive',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '7',
      text: 'Manicure',
      address: '65220 Holy Cross pass',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '8',
      text: 'Manicure',
      address: '65220 Holy Cross pass',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '9',
      text: 'Massage',
      address: '9 Evergreen drive',
      km: '12 km',
      rating: '4.8',
    },
    {
      id: '10',
      text: 'Massage',
      address: '9 Evergreen drive',
      km: '12 km',
      rating: '4.8',
    },
  ];

  export const data3 = [
    {id: '1', text: 'All'},
    {id: '2', text: '5'},
    {id: '3', text: '4'},
    {id: '4', text: '3'},
    {id: '5', text: '2'},
    {id: '6', text: '1'},
  ];

  export const data4 = [
    {id: '1', text: '< 1 km'},
    {id: '2', text: '1 - 5 km'},
    {id: '3', text: '5 - 10 km'},
    {id: '4', text: '> 10 km'},
    {id: '5', text: '11 - 15 km'},
  ];

export const AllCategoryData1=[
  {
    id:1,
    name:'Upcoming',
  },
  {
    id:2,
    name:'Completed',
  },
  {
    id:3,
    name:'Cancelled',
  },
];
  export const chatdata = [
    {
      id: 1,
      title: 'barberella invo',
      recents: 'Awesome!',
      date: '20:00',
      notification_Count: 2,
      img: Hair1,
    },
    {
      id: 2,
      title: 'The classic cut',
      recents: 'omg this is amazing',
      date: '18:55',
      notification_Count: 2,
      img: Hair1,
    },
    {
      id: 3,
      title: 'Nathin alexsnder',
      recents: 'i will be there in 2 min',
      date: '13:36',
      img: Hair1,
    },
    {
      id: 4,
      title: 'Oh la la barber',
      recents: 'Wow.this is really epic',
      date: 'Yesterday',
      img: Hair1,
    },
    {
      id: 5,
      title: 'luke gorlfield',
      recents: 'How are you?',
      date: 'Nov 02,2024',
      img: Hair1,
    },
  ];
  export const calldata = [
    {
      id: '1',
      title: 'barberella invo',
      recents: 'Outgoing',
      date: 'Dec 20,2024',
      img: Hair1,
      icon: (
        <MaterialCommunityIcons
          name="arrow-up-bold-box"
          style={{marginTop: 2}}
          size={16}
          color='green'
        />
      ),
    },
    {
      id: '2',
      title: 'The classic cut',
      recents: 'Incoming',
      date: 'Dec 19,2024',
      img: Hair1,
      icon: (
        <MaterialCommunityIcons
          name="arrow-down-bold-box"
          style={{marginTop: 2}}
          size={16}
          color='blue'
        />
      ),
    },
    {
      id: '3',
      title: 'Nathin alexsnder',
      recents: 'Outgoing',
      date: 'Dec 07,2024',
      img: Hair1,
      icon: (
        <MaterialCommunityIcons
          name="arrow-up-bold-box"
          style={{marginTop: 2}}
          size={16}
          color='green'
        />
      ),
    },
    {
      id: '4',
      title: 'Oh la la barber',
      recents: 'Missed',
      date: 'Dec 01,2024',
      img: Hair1,
      icon: (
        <MaterialCommunityIcons
          name="close-box"
          style={{marginTop: 2}}
          size={16}
          color='red'
        />
      ),
    },
    {
      id: '5',
      title: 'luke gorlfield',
      recents: 'Incoming',
      date: 'Nov 02,2024',
      img: Hair1,
      icon: (
        <MaterialCommunityIcons
          name="arrow-down-bold-box"
          style={{marginTop: 2}}
          size={16}
          color='blue'
        />
      ),
    },
  ];
  export  const Socialicons =[
    {
        id:1,
        name:'Website',
        icon:web,
    },
    {
        id:2,
        name:'Message',
        icon:message,
    },
    {
        id:3,
        name:'Call',
        icon:call,
    },
    {
        id:4,
        name:'Direction',
        icon:map,
    },
    {
        id:5,
        name:'Share',
        icon:share,
    },
  ];
  export const Specialist=[
    {
        id:1,
        title:'Nathan',
        type:'Sr. Barber',
        image:sp1,
    },
    {
      id:2,
      title:'Jenny',
      type:'Hair Stylist',
      image:sp2,
  },
  {
    id:3,
    title:'Sarah',
    type:'Makeup Artist',
    image:sp2,
  },
  {
    id:4,
    title:'Mike',
    type:'Barber',
    image:sp1,
  },
  {
    id:5,
    title:'Nathan',
    type:'Sr. Barber',
    image:sp1,
  },
  ];
  export const AllCategoryData=[
    {
      id:1,
      name:'About Us',
    },
    {
      id:2,
      name:'Services',
    },
    {
      id:3,
      name:'Package',
    },
    {
      id:4,
      name:'Gallary',
    },
    {
      id:5,
      name:'Review',
    },
  ];
  export const Servicesdata=[
    {
      id:1,
      name:'Hair Cut',
      type:'44 types'
    },
    {
      id:2,
      name:'Hair Coloring',
      type:'12 types'
    },
    {
      id:3,
      name:'Hair Wash',
      type:'8 types'
    },
    {
      id:4,
      name:'Saving',
      type:'22 types'
    },
    {
      id:5,
      name:'Skin Care',
      type:'12 types'
    },
    {
      id:6,
      name:'Hair Dryer',
      type:'4 types'
    },
    {
      id:7,
      name:'Face Make up',
      type:'18 types'
    },
    {
      id:8,
      name:'Body Massage',
      type:'20 types'
    },
   ];
   export const Servicesdata2=[
    {
      id:1,
      name:'Haircut & Hairstyle',
      image:sp1,
      type:'Special Offers Package, valid\nuntil Dec 10,2024',
      price:'$125'
    },
    {
      id:2,
      name:'Beauty Make up',
      image:sp2,
      type:'Special Offers Package, valid\nuntil Dec 20,2024',
      price:'$140'
    },
    {
      id:3,
      name:'Haircut & Hair Coloring',
      image:OnBoard3,
      type:'Special Offers Package, valid\nuntil Dec 16,2024',
      price:'$100'
    },
    {
      id:4,
      name:'Bridal Make up',
      image:sp2,
      type:'Special Offers Package, valid\nuntil Dec 24,2024',
      price:'$160'
    },
    {
      id:5,
      name:'Skin Care & Body Massage',
      image:OnBoard3,
      type:'Special Offers Package, valid\nuntil Dec 18,2024',
      price:'$240'
    },
   ];
   export const Servicesdata3=[
    {
      id:1,
      image:sp1,
    },
    {
      id:2,
      image:sp2,
    },
    {
      id:3,
      image:OnBoard3,
    },
    {
      id:4,
      image:sp1,
    },
    {
      id:5,
      image:sp2,
    },
    {
      id:6,
      image:OnBoard3,
    },
    {
      id:7,
      image:sp1,
    },
    {
      id:8,
      image:sp2,
    },
    {
      id:9,
      image:OnBoard3,
    },
   ];
   export const reviews=[
    {
      id:1,
      name:'Marielle Wigington',
      rating:5,
      image:OnBoard3,
      txt:'The people who work here are very friendly and\nprofessional, I really like it!👍👍',
      like2:982,
    },
    {
      id:2,
      name:'Annabel Rohan',
      rating:5,
      image:sp2,
      txt:'This is my first time trying the service, but the results are very satisfying! love it!!❤❤❤',
      like2:748,
    },
    {
      id:3,
      name:'Marielle Wigington',
      rating:4,
      image:sp1,
      txt:'The people who work here are very friendly and\nprofessional, I really like it!👍👍',
      like2:572,
    },
    {
      id:4,
      name:'Rayford Chenail',
      rating:5,
      image:sp1,
      txt:'The people who work here are very friendly and\nprofessional, I really like it!❤❤❤',
      like2:493,
    },
    {
      id:5,
      name:'Tynisha Obey',
      rating:3,
      image:sp2,
      txt:'The people who work here are very friendly and\nprofessional, I really like it!👍👍',
      like2:600,
    },
    {
      id:6,
      name:'Willard Purnell',
      rating:4,
      image:sp1,
      txt:'This is my first time trying the service, but the results are very satisfying! love it!!❤❤❤',
      like2:982,
    },
   ];
   export const ProfileData1=[
    {
      id:1,
      icon:(<AntDesign name="user" size={30} color="black" />),
      name:'Edit Profile',
      icon1:(<AntDesign name="right" size={30} color="black" />),
    },
    {
      id:2,
      icon:(<Ionicons name="notifications-outline" size={30} color="black" />),
      name:'Notification',
      icon1:(<AntDesign name="right" size={30} color="black" />),
    },
    {
      id:3,
      icon:(<MaterialIcons name="payment" size={30} color="black" />),
      name:'Payment',
      icon1:(<AntDesign name="right" size={30} color="black" />),
    },
    {
      id:4,
      icon:(<MaterialIcons name="security" size={30} color="black" />),
      name:'Security',
      icon1:(<AntDesign name="right" size={30} color="black" />),
    },
    {
      id:5,
      icon:(<Ionicons name="lock-closed-outline" size={30} color="black" />),
      name:'Privacy Policy',
      icon1:(<AntDesign name="right" size={30} color="black" />),
    },
   ];

   export const Servicedetails=[
    {
      id:1,
      name:'Undercut',
      order:'728 booked',
      price:'$6.50',
      image:sp1,
    },
    {
      id:2,
      name:'Quiff',
      order:'629 booked',
      price:'$6.00',
      image:sp1,
    },
    {
      id:3,
      name:'Crew Cut',
      order:'922 booked',
      price:'$5.50',
      image:sp1,
    },
    {
      id:4,
      name:'Regular Cut',
      order:'728 booked',
      price:'$5.00',
      image:sp1,
    },
    {
      id:5,
      name:'Tample Fade',
      order:'728 booked',
      price:'$6.50',
      image:sp1,
    },
    {
      id:6,
      name:'Undercut',
      order:'728 booked',
      price:'$6.50',
      image:sp1,
    },
    {
      id:7,
      name:'Undercut',
      order:'728 booked',
      price:'$6.50',
      image:sp1,
    },

   ];
  export const starData= [
    {
      id:1,
      name:'All'
    },
    {
      id:2,
      name:'1'
    },
    {
      id:3,
      name:'2'
    },
    {
      id:4,
      name:'3'
    },
    {
      id:5,
      name:'4'
    },
    {
      id:6,
      name:'5'
    },
   ]

  export const HoursData= [
    {
      id:1,
      name:'10:00'
    },
    {
      id:2,
      name:'01:00'
    },
    {
      id:3,
      name:'02:00'
    },
    {
      id:4,
      name:'03:00'
    },
    {
      id:5,
      name:'04:00'
    },
    {
      id:6,
      name:'05:00'
    },
   ]
