'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

import DateUtil from '../common/DateUtil';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class UserCircleView extends React.Component {

    static propTypes = {
        userCircleListData: React.PropTypes.object,
    };


    render() {
        let circleView;
        let picView;
        let ItemContent = this.props.userCircleListData.data[0].content.indexOf('{') === 0 ?
            JSON.parse(this.props.userCircleListData.data[0].content).qiushi_content :
            this.props.userCircleListData.data[0].topic ?
                this.props.userCircleListData.data[0].content.indexOf('#') === 0 ?
                    this.props.userCircleListData.data[0].content
                        .substring(this.props.userCircleListData.data[0].content.lastIndexOf('#') + 1, this.props.userCircleListData.data[0].content.length) :
                    this.props.userCircleListData.data[0].content :
                this.props.userCircleListData.data[0].content;

        if (this.props.userCircleListData.data[0].pic_urls.length !== 0) {
            picView = (
                <Image style={{width: 60,height:60}}
                       source={{uri:this.props.userCircleListData.data[0].pic_urls[0].pic_url}}/>
            );
        }


        circleView = (

            <View style={{alignSelf:'center',flexDirection:'row'}}>
                {picView}
                <View style={{flexDirection:'column',alignSelf:'center',marginLeft:5}}>
                    <Text numberOfLines={1}
                          style={{alignSelf:'flex-start',width:100, fontSize:15,color:'black',}}>
                        {ItemContent}
                    </Text>
                    <Text style={{alignSelf:'flex-start',fontSize:13,marginTop: 5}}>
                        {this.props.userCircleListData.data[0].distance + ' | '
                        + (new DateUtil().getDateDiff(this.props.userCircleListData.data[0].created_at))}
                    </Text>
                </View>

            </View>
        );


        return (
            <View style={{flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flexDirection:'column',paddingLeft:15,paddingRight:15}}>
                    <Text style={{fontSize:18}}>
                        动态
                    </Text>
                    <Text
                        style={{color:'#FFA500',alignSelf:'flex-start',fontSize:20}}>
                        {this.props.userCircleListData.total}
                    </Text>
                </View>


                <View style={{flexDirection:'column',marginLeft:35,flex:1,marginTop:5}}>

                    <View style={{flexDirection:'row'}}>
                        {circleView}
                    </View>

                    <View style={{height:0.7,backgroundColor:'lightgray',marginTop:10,marginBottom:10,width:width}}/>
                    <View style={{flexDirection:'row'}}>
                        <Text
                            style={{marginLeft:5,fontSize: 15}}>{'圈等级 LV ' + this.props.userCircleListData.rank}</Text>
                    </View>

                    <View style={{height:0.57,backgroundColor:'lightgray',marginTop:10,marginBottom:10,width:width}}/>

                </View>
                <Image style={{alignSelf:'center',marginRight:20,marginBottom:60}}
                       source={require('../../img/show_info@3x.png')}/>


            </View>
        );
    }

}


exports.module = UserCircleView;