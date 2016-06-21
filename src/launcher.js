'use strict';

import React from 'react';

import {
    Component
} from  'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import MainIndexComponent from './mainIndex.js';

export default class LauncherComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            isTimer: false
        };
    }

    componentDidMount() {
        this.timer = setTimeout(
            () => {
                this.setState({
                    isTimer: true,
                });
            }, 1000
        );
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }


    render() {
        if (!this.state.isTimer) {
            return (
                <View style={styles.contain}>
                    <Image source={require('../img/splash_sologan@3x.png')} style={{bottom : 50}}/>
                    <Image source={require('../img/q01_new@3x.png')} style={{bottom: -200}}/>
                </View>
            );
        } else {
            return (
                <MainIndexComponent navigator={this.props.navigator}/>
            );
        }
    }
}

var styles = StyleSheet.create({
    contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
});

exports.module = LauncherComponent;