import { Scale } from "./Constants";

// export const FontFamily = {
//     Regular: 'Overpass-Regular',
//     Italic: 'Overpass-Italic',
//     Bold: 'Overpass-Bold',
//     BoldItalic: 'Overpass-BoldItalic',
//     ExtraBold: 'Overpass-ExtraBold',
//     ExtraBoldItalic: 'Overpass-ExtraBoldItalic',
//     ExtraLight: 'Overpass-ExtraLight',
//     ExtraLightItalic: 'Overpass-ExtraLightItalic',
//     Light: 'Overpass-Light',
//     LightItalic: 'Overpass-LightItalic',
//     Medium: 'Overpass-Medium',
//     MediumItalic: 'Overpass-MediumItalic',
//     SemiBold: 'Overpass-SemiBold',
//     SemiBoldItalic: 'Overpass-SemiBoldItalic',
//     Thin: 'Overpass-Thin',
//     ThinItalic: 'Overpass-ThinItalic',
//     Black: 'Overpass-Black',
//     BlackItalic: 'Overpass-BlackItalic',
// };

export const FontFamily = {
    Regular: 'Poppins-Regular',
    Italic: 'Poppins-Italic',
    Bold: 'Poppins-Bold',
    BoldItalic: 'Poppins-BoldItalic',
    ExtraBold: 'Poppins-ExtraBold',
    ExtraBoldItalic: 'Poppins-ExtraBoldItalic',
    ExtraLight: 'Poppins-ExtraLight',
    ExtraLightItalic: 'Poppins-ExtraLightItalic',
    Light: 'Poppins-Light',
    LightItalic: 'Poppins-LightItalic',
    Medium: 'Poppins-Medium',
    MediumItalic: 'Poppins-MediumItalic',
    SemiBold: 'Poppins-SemiBold',
    SemiBoldItalic: 'Poppins-SemiBoldItalic',
    Thin: 'Poppins-Thin',
    ThinItalic: 'Poppins-ThinItalic',
    Black: 'Poppins-Black',
    BlackItalic: 'Poppins-BlackItalic',
};

export const FontFamily_Rajdhani = {
    Bold: 'Rajdhani-Bold',
    Light: 'Rajdhani-Light',
    Medium: 'Rajdhani-Medium',
    Regular: 'Rajdhani-Regular',
    SemiBold: 'Rajdhani-Semibold',
};

const FontSize = () => {
    const Sizes = {
        _08: 8 * Scale,

        _10: 10 * Scale,
        _10_50: 10.5 * Scale,
        _10_72: 10.72 * Scale,

        _11: 11 * Scale,
        _11_50: 11.5 * Scale,

        _12: 12 * Scale,

        _13: 13 * Scale,
        _13_28: 13.28 * Scale,

        _14: 14 * Scale,

        _15: 15 * Scale,

        _16: 16 * Scale,

        _17: 17 * Scale,

        _18: 18 * Scale,
        _18_71: 18.719999 * Scale,

        _20: 20 * Scale,

        _22: 22 * Scale,

        _23: 23 * Scale,

        _24: 24 * Scale,

        _25: 25 * Scale,

        _26: 26 * Scale,

        _30: 30 * Scale,

        _32: 32 * Scale,

        _36: 36 * Scale,

        _45: 45 * Scale,
    }
    return Sizes;
}
export default FontSize;