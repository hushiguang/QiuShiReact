/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    StatusBar,
    BackAndroid
} from 'react-native';


import LauncherComponent from './src/launcher.js';

var _navigator;


//原生的返回键
BackAndroid.addEventListener('hardwareBackPress', function () {
    if (_navigator && _navigator.getCurrentRoutes().length >= 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

class QiuShiReact extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navigator
                initialRoute={{page: LauncherComponent}}
                renderScene={this.navigatorRenderScene}/>
        );
    }

    navigatorRenderScene(route, navigator) {
        _navigator = navigator;
        let {...props} = route.data;
        let Component = route.page;
        return (<Component {...props} navigator={navigator}/>);
    }
}


AppRegistry.registerComponent('QiuShiReact', () => QiuShiReact);
