'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    StatusBar,
    ProgressBarAndroid,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import API from '../common/API';
import UserHeader from '../weiget/UserHeader';
import UserRecentView from '../weiget/UserRecentView';
import UserTribeView from '../weiget/UserTribeView';
import UserCircleView from '../weiget/UserCircleView';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class UserComponent extends React.Component {

    /**
     * 初始化state
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            userDetailInfo: null,
            userRecentListData: null,
            userTribeListData: null,
            userCircleListData: null,
        };
    }

    /**
     * 首次渲染完后加载
     */
    componentDidMount() {
        let userId = this.props.rowData.user.id;
        this._fetchUserDetailInfo(userId);

    }


    /**
     * 渲染分为五部分，基本信息模块，糗事模块，动态模块，群模块，
     *
     * @returns {XML}
     */
    render() {
        if (this.state.userDetailInfo) {
            let recentListView, tribeListView, circleListView;
            if (this.state.userRecentListData) {
                if (this.state.userRecentListData.total >= 1) {
                    recentListView = (
                        <UserRecentView
                            userRecentListData={this.state.userRecentListData}
                        />
                    );
                }
            }
            if (this.state.userTribeListData) {
                if (this.state.userTribeListData.total >= 1) {
                    tribeListView = (
                        <UserTribeView
                            userTribeListData={this.state.userTribeListData}
                        />
                    );
                }
            }
            if (this.state.userCircleListData) {
                if (this.state.userCircleListData.total >= 1) {
                    circleListView = (
                        <UserCircleView
                            userCircleListData={this.state.userCircleListData}
                        />
                    );
                }
            }

            return (
                <View style={{flex:1,paddingBottom:55}}>
                    <ScrollView
                        onScroll={(e) => {console.log(e.nativeEvent.top);}}
                        scrollEventThrottle={1}
                        showsVerticalScrollIndicator={false}>
                        <View style={{backgroundColor:'white',flexDirection:'column'}}>

                            <StatusBar
                                backgroundColor="#000000"
                                barStyle="light-content"
                            />
                            <UserHeader
                                bgIcon={this.props.rowData.user.id % 5}
                                userDetailInfo={this.state.userDetailInfo}
                            />

                            {recentListView}
                            {tribeListView}
                            {circleListView}

                            {this._renderRowItem('故乡', this.state.userDetailInfo.userdata.hometown)}
                            <View
                                style={{height:0.7,backgroundColor:'lightgray',marginBottom:10,marginLeft:100,width:width}}/>
                            {this._renderRowItem('糗龄', (this.state.userDetailInfo.userdata.qb_age) + '天')}
                            <View
                                style={{height:0.7,backgroundColor:'lightgray',marginBottom:10,marginLeft:100,width:width}}/>
                            {this._renderRowItem('职业', this.state.userDetailInfo.userdata.job)}
                        </View>
                    </ScrollView>


                    <View style={{height:0.7,backgroundColor:'lightgray',width:width,position:'absolute',bottom: 55}}/>
                    <View
                        style={{position:'absolute',bottom: 0,width:width,flex:1,backgroundColor:'white',height:55,flexDirection:'row',alignSelf:'center',alignItems:'center'}}>
                        <Image style={{alignSelf:'center',left:width/2 - 60}}
                               source={require('../../img/my_qiuyou_fan@3x.png')}/>
                        <Text style={{alignSelf:'center',color:'#FFA500',fontSize:18,left:width/2-50}}>长按加粉</Text>
                    </View>


                    <TouchableOpacity activeOpacity={0.5} onPress={() =>{this.props.navigator.pop()}}
                                      style={{position: 'absolute',top:10,left:10}}>
                        <Image source={require('../../img/pinfo_avatar_noshadow_bg@3x.png')}>
                            <Image source={require('../../img/url_content_back@3x.png')}
                                   style={{position:'absolute',top:10,left:8}}/>
                        </Image>
                    </TouchableOpacity>


                </View>
            );
        } else {
            return (
                <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#FAFAFA',}}>
                    <ProgressBarAndroid styleAttr='Inverse' style={{flex: 1,margin: 0,}}/>
                </View>
            );
        }
    }


    /**
     * 获取糗友的基本信息
     * @private
     */
    _fetchUserDetailInfo(userId) {
        fetch(API.user.getUserDetailInfo(userId))
            .then(response => response.json())
            .then(json => {
                this.state.userDetailInfo = json;
                this._fetchUserRecentList(userId);
                this._fetchUserTribeList(userId);
                this._fetchUserCircleList(userId);
            })
            .catch(error => {
                console.warn(error);
            })
    }

    /**
     * 获取糗友的糗事列表
     * @private
     */
    _fetchUserRecentList(userId) {
        fetch(API.user.getUserRecentList(userId))
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userRecentListData: json,
                });
            })
            .catch(error => {
                console.warn(error);
            })
    }

    /**
     * 获取糗友的群信息
     * @private
     */
    _fetchUserTribeList(userId) {
        fetch(API.user.getUserTribeList(userId, 1))
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userTribeListData: json,
                });
            })
            .catch(error => {
                console.warn(error);
            })
    }

    /**
     * 获取糗友的动态基本信息
     * @param userId
     * @private
     */
    _fetchUserCircleList(userId) {
        fetch(API.user.getUserCircleList(userId))
            .then(response => response.json())
            .then(json => {
                this.setState({
                    userCircleListData: json,
                });
            })
            .catch(error => {
                console.warn(error);
            })
    }


    /***
     * 渲染 糗友的其他基本信息
     *
     * @param name
     * @param value
     * @returns {XML}
     * @private
     */
    _renderRowItem(name, value) {
        return (
            <View style={{flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flexDirection:'column',paddingLeft:20,paddingRight:10,paddingTop:-10}}>
                    <Text style={{fontSize:18,marginTop:12,marginBottom:12}}>
                        {name}
                    </Text>
                </View>
                <View style={{flexDirection:'column',marginLeft:35,flex:1,}}>
                    <Text style={{fontSize: 18}}>{value}</Text>
                </View>
            </View>
        );
    }
}


exports.module = UserComponent;