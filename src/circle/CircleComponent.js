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

import MsgComponent from '../msg/MsgComponent';
import SeptaComponent from './SeptaComponent';
import TopicComponent from './TopicComponent';
import VideoCircleComponent from './VideoCircleComponent';


var STORAGE_KEY_CIRCLE = 'circleTabPosition';

export default class CircleComponent extends React.Component {

    /***
     * 属性定义
     * @type {{circleTabPosition: *, selectPosition: *}}
     */
    static propTypes = {
        circleTabPosition: React.PropTypes.func,
        selectPosition: React.PropTypes.number,
    };

    /**
     * 初始化state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {};
        this._onPageSelect = this._onPageSelect.bind(this);
    }

    /**
     * 渲染完后的加载
     */
    componentDidMount() {
        this._loadStorage().done();
    }

    /**
     * 从本地数据库拿到当前的position
     * @private
     */
    async _loadStorage() {
        var storageValue = await AsyncStorage.getItem(STORAGE_KEY_CIRCLE)
        if (storageValue) {
            this.viewPager.setPageWithoutAnimation(Number(storageValue));
        }
    }


    async _saveToStorage(nowPosition) {
        await AsyncStorage.setItem(STORAGE_KEY_CIRCLE, nowPosition + '');
    }


    /**
     * 和父布局的联动
     * @param props
     */
    componentWillReceiveProps(props) {
        this._saveToStorage(props.selectPosition);
        this.viewPager.setPageWithoutAnimation(props.selectPosition);
    }


    /**
     * 页面选项卡的选择
     * @param e
     * @private
     */
    _onPageSelect(e) {
        this.props.circleTabPosition(e.nativeEvent.position);
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
                    <SeptaComponent navigator={this.props.navigator}/>
                </View>
                <View style={{flex: 1}}>
                    <MsgComponent msg={'登录后才能查看糗友圈呐'}/>
                </View>
                <View style={{flex: 1}}>
                    <VideoCircleComponent/>
                </View>
                <View style={{flex: 1}}>
                    <TopicComponent navigator={this.props.navigator}/>
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

exports.module = CircleComponent;