import React from 'react';
import { Text, ScrollView, View } from 'react-native';

import {
    COLOR_FONT_SECONDARY,
    COLOR_BACKGROUND_QUATERNARY,
    FONT_CHARACTER_REGULAR,
    PADDING_BOTTOM
} from '../../styles/common';

const TextContainer = ({ content }) => {
    const { containerStyle, scrollStyle, section, textStyle } = styles;
    console.log(content);

    return (
        <View style={containerStyle}>
            <ScrollView style={scrollStyle} >
                <View style={section}>
                    <Text style={textStyle} >
                        “SmartOil”의 개인정보 처리 방침 및 위치정보 이용 약관
                    </Text>
                </View>
                <View style={section}>
                    <Text style={textStyle} >
                        1. “SmartOil”에서 사용하는 개인정보는 다음과 같습니다.{'\n'}
                        1-1.    사용자 이메일 :{'\n'}
                        즐겨찾기 기능을 이용하기 위하여 서버에 저장이 됩니다.{'\n'}
                        저장된 사용자 이메일은 즐겨찾기 기능 이외의 다른 목적으로는 이용되지 않습니다.
                    </Text>
                </View>
                <View style={section}>
                    <Text style={textStyle} >
                        2. 위치정보 이용약관은 다음과 같습니다. {'\n'}
                        2-1.     언제 위치정보를 사용하나요?{'\n'}
                        사용자가 “내 주변 검색” 기능을 이용하여 검색을 할 때 사용하며, 로그에 기록이 됩니다.{'\n'}
                        단, 로그 기록에는 어떠한 사용자 정보도 없어서 사용자의 위치 기록을 추적 또는 다른 목적으로의 이용을 할 수 없습니다.{'\n'}
                        2-2.    얼마나 오랫동안 위치 정보를 저장하나요?{'\n'}
                        기록된 로그는 90일 동안 서버에 저장 됩니다.{'\n'}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        paddingBottom: PADDING_BOTTOM,
    },
    scrollStyle: {
        paddingTop: 20,
        paddingHorizontal: 25
    },
    section: {
        paddingVertical: 15,
    },
    textStyle: {
        textAlign: 'justify',
        fontFamily: FONT_CHARACTER_REGULAR,
        color: COLOR_FONT_SECONDARY
    }
};

export { TextContainer };
