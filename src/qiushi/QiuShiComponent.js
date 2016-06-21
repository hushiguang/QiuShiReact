'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ViewPagerAndroid,
    AsyncStorage,
} from 'react-native';

import TextQiuComponent from './TextQiuComponent';
import MsgComponent from '../msg/MsgComponent';
var STORAGE_KEY_ASHAMED = 'ashamedTabPosition';


export default class QiuShiComponent extends React.Component {

    static propTypes = {
        ashamedTabPosition: React.PropTypes.func,
        selectPosition: React.PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {};
        this._onPageSelect = this._onPageSelect.bind(this);
    }

    componentDidMount() {
        this._loadStorage().done();
    }

    async _loadStorage() {
        var storageValue = await AsyncStorage.getItem(STORAGE_KEY_ASHAMED)
        if (storageValue) {
            this.viewPager.setPageWithoutAnimation(Number(storageValue));
        }
    }


    async _saveToStorage(nowPosition) {
        await AsyncStorage.setItem(STORAGE_KEY_ASHAMED, nowPosition + '');
    }


    componentWillReceiveProps(props) {

        this._saveToStorage(props.selectPosition);
        this.viewPager.setPageWithoutAnimation(props.selectPosition);

    }


    _onPageSelect(e) {
        this.props.ashamedTabPosition(e.nativeEvent.position);
    }

    /**
     *
     * 渲染中间View
     * @private
     */
    _renderCenterView() {
        return (
            <ViewPagerAndroid
                ref={viewPager => { this.viewPager = viewPager }}
                style={{alignItems: 'center',flex:1}} initialPage={0}
                onPageSelected={this._onPageSelect}>
                <View style={{flex: 1}}>
                    <TextQiuComponent  navigator={this.props.navigator}/>
                </View>
                <View style={{flex: 1}}>
                    <TextQiuComponent  navigator={this.props.navigator}/>
                </View>
                <View style={{flex: 1}}>
                    <TextQiuComponent  navigator={this.props.navigator}/>
                </View>
                <View style={{flex: 1}}>
                    <TextQiuComponent  navigator={this.props.navigator}/>
                </View><View style={{flex: 1}}>
                <TextQiuComponent  navigator={this.props.navigator}/>
            </View>

            </ViewPagerAndroid>
        );

    }


    render() {

        return (
            <View style={styles.mainContain}>
                {this._renderCenterView()}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    textDefault: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    mainContain: {
        flex: 1,
        flexDirection: 'column',
    },


});

exports.module = QiuShiComponent;