import { StyleSheet } from 'react-native';
import {
    COLOR_PRIMARY,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_BORDER_SECONDARY,
    COLOR_FONT_QUINARY,
    COLOR_FONT_PRIMARY,
    FONT_CHARACTER_REGULAR,
    FONT_CHARACTER_BOLD
} from './common';

export default StyleSheet.create({
    tabBar: {
        height: 54,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: COLOR_BORDER_SECONDARY,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
    tabBarLabel: {
        fontFamily: FONT_CHARACTER_REGULAR,
        fontSize: 10,
        letterSpacing: 0,
    },
    tabBarIcon: {
        fontSize: 22
    },
    headerImageTitle: {
        height: 22,
        width: 110,
        resizeMode: 'stretch',
        alignSelf: 'center',
        paddingLeft: 50
    },
    headerBackgroundPrimary: {
        backgroundColor: COLOR_PRIMARY
    },
    headerBackgroundDark: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY
    },
    headerTitlePrimary: {
        color: COLOR_FONT_QUINARY,
        fontFamily: FONT_CHARACTER_BOLD,
        fontSize: 20,
    },
    headerTitleDark: {
        color: COLOR_FONT_PRIMARY,
        fontFamily: FONT_CHARACTER_BOLD,
        fontSize: 20
    }
});
