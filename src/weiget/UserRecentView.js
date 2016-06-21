'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class UserRecentView extends React.Component {

    static propTypes = {
        userRecentListData: React.PropTypes.object,
    };


    render() {
        let recentItemAry = [];
        for (let i = 0; i < this.props.userRecentListData.items.length; i++) {
            recentItemAry.push(
                <View key={i}
                      style={{marginRight:20,width:(width - 210) / 3,height:(width - 210) / 3,borderColor:'lightgray',borderWidth:1,padding:3,alignSelf:'center'}}>
                    <Text
                        numberOfLines={6}
                        style={{fontSize: 8,color:'black',alignItems:'center'}}>
                        {this.props.userRecentListData.items[i].content}
                    </Text>
                </View>
            );
        }


        return (
            <View style={{flexDirection:'row',marginTop:5,backgroundColor:'white'}}>
                <View style={{flexDirection:'column',padding:15}}>
                    <Text style={{fontSize:18}}>
                        糗事
                    </Text>
                    <Text
                        style={{color:'#FFA500',alignSelf:'flex-start',fontSize:20}}>
                        {this.props.userRecentListData.total}
                    </Text>
                </View>

                <View style={{flexDirection:'column',marginLeft:35,flex:1,marginTop:5}}>

                    <View style={{flexDirection:'row'}}>
                        {recentItemAry}
                    </View>

                    <View style={{height:0.7,backgroundColor:'lightgray',marginTop:10,marginBottom:5,width:width}}/>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Image source={require('../../img/personal_smile@3x.png')}/>
                        <Text style={{marginLeft:5,fontSize: 13}}>{this.props.userRecentListData.smile}</Text>
                    </View>

                    <View style={{height:0.7,backgroundColor:'lightgray',marginTop:10,marginBottom:5,width:width}}/>

                </View>
                <Image style={{alignSelf:'center',marginRight:20,marginBottom:40}}
                       source={require('../../img/show_info@3x.png')}/>
            </View>
        );
    }

}


exports.module = UserRecentView;