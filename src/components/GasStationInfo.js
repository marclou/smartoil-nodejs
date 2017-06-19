import React, { Component } from 'react';
import { Text, Image, View, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

import SaveIcon from './SaveIcon';
import { Spinner, Tag, Button, NavIcon } from './functionalComponents';
import {
    COLOR_PRIMARY,
    COLOR_TEXT_PRIMARY,
    COLOR_TEXT_SECONDARY
} from '../styles/common';

class GasStationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isComponentReady: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({ isComponentReady: true });
        });
        Actions.refresh({ renderRightButton: this.renderRightButton });
    }

    renderRightButton(props) {
        return (
            <View style={styles.navIconStyle}>
                <SaveIcon gasStation={props.gasStation} />
                <NavIcon iconName="share" />
            </View>
        );
    }

    render() {
        const { containerStyle, divider, row, logoStyle, textMajorStyle, textMediumStyle, textMinorStyle } = styles;
        const { price, distance, store_name } = this.props.gasStation;
        const { userGasType } = this.props;

        if (!this.state.isComponentReady) {
            return <Spinner />;
        }
        return (
            <View style={containerStyle}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0)']}>
                    <Image
                        style={logoStyle}
                        source={require('../img/brand_logos/a.jpg')}
                    />
                </LinearGradient>
                <View style={row}>
                    <Text style={textMediumStyle}>{store_name}</Text>
                </View>
                <View style={row}>
                    <Icon name="map-marker" style={{ color: COLOR_TEXT_SECONDARY }} />
                    <Text style={textMinorStyle}> {(Math.round(distance * 100) / 100).toFixed(2)} km | </Text>
                    <Text style={textMinorStyle}> 1 원</Text>
                </View>
                <View style={divider} />
                <View style={row}>
                    <Text style={textMajorStyle}> {price}원</Text>
                    <Tag text={userGasType} />
                </View>
                <View style={row}>
                    <Text style={[textMinorStyle, { color: COLOR_PRIMARY }]}>
                        지금 사면 약 15,000원(1.6L기준) 절약됩니다.
                    </Text>
                </View>
                <View style={{ marginTop: 25 }}>
                    <Button
                        text="항해하다"
                        onPress={() => console.log('pressed !')}
                    />
                </View>
            </View>
        );
    }
}


const styles = {
    containerStyle: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    divider: {
        margin: 15,
        borderWidth: 0.5,
        borderColor: '#e2e2e2'
    },
    row: {
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    logoStyle: {
        margin: 15,
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    textMajorStyle: {
        fontSize: 24,
        color: COLOR_TEXT_PRIMARY,
        paddingRight: 15
    },
    textMediumStyle: {
        fontSize: 16,
        color: COLOR_TEXT_PRIMARY,
        fontWeight: '500'
    },
    textMinorStyle: {
        fontSize: 12,
        color: COLOR_TEXT_SECONDARY
    },
    navIconStyle: {
        flexDirection: 'row',
        flex: 1,
        width: 70,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
};

const mapStateToProps = state => {
    return { userGasType: state.userState.userFavoriteGas };
};

export default connect(mapStateToProps)(GasStationInfo);
