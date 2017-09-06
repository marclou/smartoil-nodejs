import React, { Component } from 'react';
import { View, Slider, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    COLOR_FONT_SECONDARY,
    COLOR_PRIMARY,
    FONT_CHARACTER_REGULAR,
    COLOR_BACKGROUND_QUATERNARY,
    COLOR_BORDER_SECONDARY
} from '../styles/common';
import { changeUserRangeDistance } from '../actions';

class RangeDistanceFavorite extends Component {
    static navigationOptions = {
        tabBarVisible: false,
        headerTitle: '검색 범위',
    };

    constructor(props) {
        super(props);

        this.state = {
            value: props.userSettings.userDistanceRange
        };
    }

    render() {
        const { viewStyle, containerStyle, sliderStyle, subContainerStyle, iconStyle, textStyle } = styles;
        const { userDistanceRange } = this.props.userSettings;

        return (
            <View style={viewStyle}>
                <View style={{ paddingHorizontal: 30, paddingTop: 30 }}>
                    <Text style={textStyle}>검색 범위을 변경할 수 있습니다. 반경 내의 가까운 주유소를 찾아줍니다.</Text>
                </View>
                <View style={containerStyle}>
                    <View style={subContainerStyle}>
                        <Icon
                            name='map-marker'
                            style={iconStyle}
                        />
                    </View>
                    <Slider
                        minimumTrackTintColor={COLOR_PRIMARY}
                        maximumTrackTintColor={Platform.OS === 'android' ? COLOR_PRIMARY : null}
                        minimumValue={1}
                        maximumValue={10}
                        onSlidingComplete={(value) => this.props.changeUserRangeDistance(value)}
                        onValueChange={(value) => { this.setState({ value: value }); }}
                        step={1}
                        value={userDistanceRange}
                        style={sliderStyle}
                        thumbTintColor={COLOR_PRIMARY}
                    />
                    <View style={subContainerStyle}>
                        <Text style={textStyle}> {this.state.value}&nbsp;km </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: COLOR_BACKGROUND_QUATERNARY,
        borderBottomWidth: 1,
        borderColor: COLOR_BORDER_SECONDARY,
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20
    },
    subContainerStyle: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: {
        color: COLOR_FONT_SECONDARY,
        fontSize: 17,
        alignSelf: 'center',
        paddingBottom: 4
    },
    textStyle: {
        color: COLOR_FONT_SECONDARY,
        fontSize: 15,
        fontFamily: FONT_CHARACTER_REGULAR,
        alignSelf: 'center',
        textAlign: 'left',
    },
    sliderStyle: {
        flex: 1,
    }
};

const mapStateToProps = state => {
    return { userSettings: state.userState };
};

export default connect(mapStateToProps, { changeUserRangeDistance })(RangeDistanceFavorite);
