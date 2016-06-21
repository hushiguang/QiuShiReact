'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ListView,
    AsyncStorage,
    ProgressBarAndroid,
    Image,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    RefreshControl,
} from 'react-native';

import DateUtil from '../common/DateUtil';
var width = Dimensions.get('window').width;

export default class SeptaCircleCommentItem extends React.Component {

    static propTypes = {
        user: React.PropTypes.object,
        rowData: React.PropTypes.object,
        onPress: React.PropTypes.func,
    };


    render() {
        let replyView;
        let selfTagView;
        let userIconUri = this.props.rowData.user ? {
            uri: 'http://pic.qiushibaike.com/system/avtnew/'
            + String(this.props.rowData.user.id).substring(0, String(this.props.rowData.user.id).length - 4)
            + '/' + this.props.rowData.user.id + '' + '/medium/' + this.props.rowData.user.icon
        } : require('../../img/default_user_avatar@3x.png');

        if (this.props.rowData.comment_user) {
            replyView = (
                <View style={{flexDirection:'column',padding:8,backgroundColor:'#F0F0F0',marginTop:5}}>
                    <Text style={[this.props.rowData.comment_user.nick_status === 0 ?
                     {color:'lightgray'} :
                     {color: 'red'},{fontSize: 15}]}>
                        {this.props.rowData.comment_user.login}
                    </Text>
                    <Text style={{marginTop : 5,color: 'black'}}>
                        {this.props.rowData.comment.content}
                    </Text>
                </View>
            );

            if (this.props.user.id === this.props.rowData.user.id) {
                selfTagView = (
                    <View style={styles.joinView}>
                        <Text style={{color:'white',fontSize:12,alignSelf:'center'}}>楼主</Text>
                    </View>
                );

            }
        }


        return (
            <View style={{backgroundColor:'#F8F8F8',padding:10}}>
                <View style={{flexDirection:'row',flex:1}}>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={this.props.rowData.user.login !== '匿名用户' ? this.props.onPress.bind(this,'commentUserIcon') : undefined}>
                        <Image style={{width:50,height:50,borderRadius:25}}
                               source={userIconUri}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'column',marginLeft:15,flex:1}}>
                        <View style={{flexDirection:'row',}}>
                            <TouchableOpacity activeOpacity={1}
                                              onPress={this.props.rowData.user.login !== '匿名用户' ? this.props.onPress.bind(this,'commentUserName') : undefined}>
                                <Text
                                    style={[{fontSize:15,},
                                    this.props.rowData.user ?
                                    this.props.rowData.user.nick_status === 0 ? {color:'lightgray'} : {color:'red'}
                                    :{color:'lightgray'} ]}>
                                    {this.props.rowData.user ? this.props.rowData.user.login : '匿名用户'}
                                </Text>
                            </TouchableOpacity>
                            {selfTagView}
                            <View style={{flex:1}}/>
                            <Image
                                style={ {alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginLeft:5,}}
                                source={require('../../img/qiuyoucircle_like@3x.png')}/>
                            <Text
                                style={{color:'lightgray',fontSize:13,alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginRight:5,marginLeft:5}}>
                                {this.props.rowData.like_count}</Text>
                        </View>
                        <Text style={{marginTop : 5,color: 'black'}}>
                            {this.props.rowData.content}
                        </Text>
                        {replyView}
                        <Text
                            style={{color:'lightgray',fontSize:13,marginRight:5,marginTop:5}}>
                            {new DateUtil().getDateDiff(this.props.rowData.created_at)}
                        </Text>

                        <View style={{height:1,backgroundColor:'#E8E8E8',marginTop:5,marginRight:20}}/>
                    </View>
                </View>
            </View>
        );
    }


}

var styles = StyleSheet.create({
    textDefault: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    joinView: {
        backgroundColor: 'mediumaquamarine',
        alignSelf: 'center',
        borderRadius: 3,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 15
    }
});

exports.module = SeptaCircleCommentItem;