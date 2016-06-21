'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

var width = Dimensions.get('window').width;

export default class AshamedItem extends React.Component {

    static propTypes = {
        rowData: React.PropTypes.object,
        onPress: React.PropTypes.func,
    };


    render() {

        let type;
        if (this.props.rowData.type) {
            let ashamedTypeIcon = this.props.rowData.type === 'hot' ?
                require('../../img/ic_rss_hot@3x.png') : require('../../img/ic_refesh@3x.png');
            type = (
                <View style={{alignSelf:'center',flexDirection:'row'}}>
                    <Image style={{alignSelf:'center',marginLeft:5,marginRight:5,width:20,height:20}}
                           source={ashamedTypeIcon}>
                    </Image>
                    <Text
                        style={{fontSize:14,color:'lightgray',alignSelf:'flex-end',marginLeft:5,marginRight: 10}}>
                        {this.props.rowData.type === 'hot' ? '热门' : '新鲜'}
                    </Text>
                </View>);
        } else {
            type = (<View></View>);
        }

        let userIconUri = this.props.rowData.user ? {
            uri: 'http://pic.qiushibaike.com/system/avtnew/'
            + String(this.props.rowData.user.id)
                .substring(0, String(this.props.rowData.user.id).length - 4)
            + '/' + this.props.rowData.user.id + ''
            + '/medium/'
            + this.props.rowData.user.icon
        } : require('../../img/default_user_avatar@3x.png');

        return (
            <View
                style={{backgroundColor:'white',paddingLeft:10,paddingTop:10,paddingRight:10,marginBottom:10,flexDirection:'column'}}>

                <View style={{flexDirection:'row',flex:1,alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={this.props.rowData.user ?
                                      this.props.rowData.user.login !== '匿名用户' ?
                                       this.props.onPress.bind(this,'userIcon',this.props.rowData.user) :
                                       undefined :undefined}>
                        <Image style={{width:50,height:50,borderRadius:25}}
                               source={userIconUri}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1}
                                      onPress={this.props.rowData.user ?
                                              this.props.rowData.user.login !== '匿名用户' ?
                                              this.props.onPress.bind(this,'userName') :
                                              undefined : undefined}>
                        <Text
                            style={[{fontSize:18,alignSelf:'center',marginLeft:10},
                                    this.props.rowData.user ? {color:'black'} : {color:'lightgray'}]}>
                            {this.props.rowData.user ? this.props.rowData.user.login : '匿名用户'}
                        </Text>
                    </TouchableOpacity>
                    <View style={{flex:1}}/>
                    {type}
                </View>

                <View style={{flexDirection:'column',marginTop:5,marginRight: 5}}>
                    <Text style={{fontSize:18,lineHeight:30,marginLeft:5}}>
                        {this.props.rowData.content}
                    </Text>


                    <View
                        style={styles.bottomContain}>
                        <Text
                            style={styles.bottomComment}>
                            {'好笑 ' + (this.props.rowData.votes.up) + ' · ' + '评论 ' +
                            (this.props.rowData.comments_count) + (this.props.rowData.share_count ?
                                (' · 分享 ' + this.props.rowData.share_count) : '' )}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <Image source={require('../../img/operation_support@3x.png')}/>
                        <Image source={require('../../img/operation_unsupport@3x.png')}/>
                        <Image source={require('../../img/operation_comments@3x.png')}/>
                        <Image style={{alignSelf:'flex-end',}} source={require('../../img/operation_more@3x.png')}/>
                    </View>

                </View>

            </View>);
    }
}

var styles = StyleSheet.create({
    bottomContain: {flexDirection: 'row', alignItems: 'center', marginTop: 5, marginRight: 5},
    bottomComment: {marginLeft: 5, alignSelf: 'center', color: 'lightgray', fontSize: 14},
});


exports.module = AshamedItem;