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

export default class SeptaCircleItem extends React.Component {

    static propTypes = {
        rowData: React.PropTypes.object,
        onPress: React.PropTypes.func,
    };

    render() {
        let userIconUri = this.props.rowData.user ? {
            uri: 'http://pic.qiushibaike.com/system/avtnew/'
            + String(this.props.rowData.user.id)
                .substring(0, String(this.props.rowData.user.id).length - 4)
            + '/' + this.props.rowData.user.id + ''
            + '/medium/'
            + this.props.rowData.user.icon
        } : require('../../img/default_user_avatar@3x.png');

        let userSexIconUri = this.props.rowData.user ?
            this.props.rowData.user.gender === 'F' ?
                require('../../img/nearby_gender_female@3x.png') :
                require('../../img/nearby_gender_male@3x.png') :
            require('../../img/nearby_gender_male@3x.png');

        let ItemContent = this.props.rowData.content.indexOf('{') === 0 ?
            JSON.parse(this.props.rowData.content).qiushi_content :
            this.props.rowData.topic ?
                this.props.rowData.content.indexOf('#') === 0 ?
                    this.props.rowData.content
                        .substring(this.props.rowData.content.lastIndexOf('#') + 1, this.props.rowData.content.length) :
                    this.props.rowData.content :
                this.props.rowData.content;


        let picView = [];
        if (this.props.rowData.image) {
            let imageUri = 'http://pic.qiushibaike.com/system/avtnew/'
                + String(this.props.rowData.user.id)
                    .substring(0, String(this.props.rowData.user.id).length - 4)
                + '/' + this.props.rowData.user.id + ''
                + '/medium/' + this.props.rowData.image;
            picView.push(
                <TouchableOpacity key={i} activeOpacity={1}
                                  onPress={this.props.onPress.bind(this,this.props.rowData.pic_urls,i)}>
                    <Image
                        style={{width:width-110,height:300,marginRight:5,marginTop:5}}
                        source={{uri:imageUri}}/>
                </TouchableOpacity>
            );
        }

        if (this.props.rowData.pic_urls) {
            let picLength = this.props.rowData.pic_urls.length >= 0 &&
            this.props.rowData.pic_urls.length > 3 ?
                this.props.isDetail ?
                    this.props.rowData.pic_urls.length :
                    3 :
                this.props.rowData.pic_urls.length;

            if (this.props.rowData.pic_urls.length >= 0) {
                for (let i = 0; i < picLength; i++) {
                    picView.push(
                        <TouchableOpacity key={i} activeOpacity={1}
                                          onPress={this.props.onPress.bind(this,this.props.rowData.pic_urls,i)}>
                            <Image
                                style={{width:(width-110)/3,height:(width-110)/3,marginRight:5,marginTop:5}}
                                source={{uri:this.props.rowData.pic_urls[i].pic_url}}/>
                        </TouchableOpacity>
                    );
                }
            }
        }

        return (
            <View style={{backgroundColor:'white',padding:10,marginBottom:10}}>
                <View style={{flexDirection:'row',flex:1}}>
                    <TouchableOpacity activeOpacity={1}
                                      onPress={this.props.rowData.user ?
                                      this.props.rowData.user.login !== '匿名用户' ?
                                       this.props.onPress.bind(this,'userIcon',this.props.rowData.user) :
                                       undefined :undefined}>
                        <Image style={{width:50,height:50,borderRadius:25}}
                               source={userIconUri}/>
                    </TouchableOpacity>

                    <View style={{flexDirection:'column',marginLeft:15,flex:1}}>
                        <View style={{flexDirection:'row',}}>
                            <TouchableOpacity activeOpacity={1}
                                              onPress={this.props.rowData.user ?
                                              this.props.rowData.user.login !== '匿名用户' ?
                                              this.props.onPress.bind(this,'userName') :
                                              undefined : undefined}>
                                <Text
                                    style={[{fontWeight:'bold',fontSize:18,},
                                    this.props.rowData.user ?
                                    this.props.rowData.user.nick_status === 0 ? {color:'black'} : {color:'red'}
                                    :{color:'black'} ]}>
                                    {this.props.rowData.user ? this.props.rowData.user.login : '匿名用户'}
                                </Text>
                            </TouchableOpacity>

                            <Image style={{alignSelf:'center',marginLeft:5}}
                                   source={userSexIconUri}>
                                <Text
                                    style={{fontSize:12,color:'white',alignSelf:'flex-end',marginRight:5,}}>
                                    {this.props.rowData.user ? this.props.rowData.user.age : '22'}
                                </Text>
                            </Image>

                            <View style={{flex:1}}/>

                            <Text
                                style={{color:'lightgray',fontSize:13,alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginRight:5}}>
                                {new DateUtil().getDateDiff(this.props.rowData.created_at)}
                            </Text>
                        </View>

                        <View style={{flexDirection:'column',marginTop:5,marginRight: 5}}>
                            <Text numberOfLines={this.props.isDetail ? 100 : 5} style={{fontSize:18,lineHeight:30,}}>
                                <Text
                                    style={{fontSize:18,color:'deepskyblue',lineHeight:30,}}>
                                    {this.props.rowData.topic ? this.props.rowData.topic.content : ''}</Text>
                                {ItemContent}
                            </Text>
                            <View
                                style={[{flexDirection:'row',marginTop:5,marginBottom:5},this.props.isDetail ? {flexWrap : 'wrap'}:{flexWrap : 'nowrap'}]}>
                                {picView}
                            </View>
                        </View>

                        <View
                            style={styles.bottomContain}>
                            <Image style={{alignSelf:'center'}}
                                   source={require('../../img/qiuyoucircle_like@3x.png')}/>
                            <Text
                                style={styles.bottomComment}>{this.props.rowData.like_count}</Text>
                            <Image style={{alignSelf:'center',marginLeft:5}}
                                   source={require('../../img/qiuyoucircle_comment@3x.png')}/>
                            <Text
                                style={styles.bottomComment}>{this.props.rowData.comment_count}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    bottomContain: {flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 5, marginRight: 5},
    bottomComment: {marginLeft: 5, alignSelf: 'center', color: 'lightgray', fontSize: 12},
});
exports.module = SeptaCircleItem;

