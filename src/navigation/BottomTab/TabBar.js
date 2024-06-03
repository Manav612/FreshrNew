import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BottomTabHeight, Scale, Screen_Width } from '../../constants/Constants';
import { COLOR_DARK, COLOR_LIGHT, GRADIENT_COLOR_DARK, GRADIENT_COLOR_LIGHT } from '../../constants/Colors';
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import FontSize, { FontFamily } from '../../constants/FontSize';
import { NavigationScreens } from '../../constants/Strings';
import { useSelector } from 'react-redux';
import { ComingSoon } from '../../constants/Icons';

const TabBar = (props) => {
    const TabButtonWidth = Screen_Width / props.state.routes.length;
    const routeName = useSelector(state => state.ActiveScreenReducer);;

    const theme = useSelector(state => state.ThemeReducer);
    const COLOR = theme == 1 ? COLOR_DARK : COLOR_LIGHT;
    const GRADIENT_COLOR = theme == 1 ? GRADIENT_COLOR_DARK : GRADIENT_COLOR_LIGHT;

    const styles = StyleSheet.create({
        Container: {
            width: '100%',
            height: BottomTabHeight,
            position: 'absolute',
            bottom: 0,
            overflow: 'hidden',
        },
        BarStyle: {
            width: '100%',
            height: "100%",
            flexDirection: 'row',
            zIndex: 10,
        },
        absolute: {
            width: '100%',
            height: '100%',
            position: 'absolute',
        },
        Button: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        Icon: {
            height: 27 * Scale,
            aspectRatio: 1 / 1,
            resizeMode: 'contain',
            tintColor: COLOR.BLACK,
        },
        LabelStyle: {
            color: COLOR.BLACK,
            fontSize: FontSize()._10_50,
            textTransform: 'uppercase',
            marginTop: 10,
            fontFamily: FontFamily.Medium,
        }
    })

    const HideTabScreens = [
        NavigationScreens.NotificationScreen + " " + NavigationScreens.HomeTab,
        NavigationScreens.MyBookMarkScreen,
    ]

    return (
        <View style={[styles.Container, HideTabScreens.includes(routeName) && { display: 'none' }]}>
            <View style={{backgroundColor:COLOR.WHITE,width: '100%',
            height: '100%',
            position: 'absolute'}}>
                <LinearGradient
                    colors={GRADIENT_COLOR.WHITE_30_TO_40}
                    style={{ width: '100%', height: '100%' }}
                    useAngle
                    angle={45}
                >

                </LinearGradient>
                </View>
            <View style={styles.BarStyle}>
                {
                    props.state.routes.map((route, i) => {

                        const { options } = props.descriptors[route.key];
                        const label = options.title;
                        const icon = options.tabBarIcon;
                        const focused = props.state.index === i;

                        const onPress = () => {
                            const event = props.navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (!focused && !event.defaultPrevented) {
                                props.navigation.navigate(route.name);
                            }
                        };

                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={onPress}
                                style={[styles.Button, { width: TabButtonWidth }]}
                                activeOpacity={1}
                            >
                                <Image
                                    source={icon}
                                    style={
                                        [styles.Icon, focused && {
                                            tintColor: COLOR.ORANGECOLOR
                                        }]}
                                />
                                {
                                    options.title == 'DHN PLUS' &&
                                    <Image
                                        source={ComingSoon}
                                        style={{
                                            height: 12 * Scale,
                                            resizeMode: 'contain',
                                            position: 'absolute',

                                        }}
                                    />}
                                <Text style={[styles.LabelStyle,focused && {
                                            color:COLOR.ORANGECOLOR
                                        }]} numberOfLines={1}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </View>
    )
}

export default TabBar