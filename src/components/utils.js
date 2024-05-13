import { useSelector } from 'react-redux';
import { COLOR_DARK, COLOR_LIGHT } from '../constants/Colors';
import { Hair1, banner1, banner2, banner3, banner4, banner5, barber, barber2, barber3, barber4 } from '../constants/Icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const theme = useSelector(state => state.ThemeReducer);
  // const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
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