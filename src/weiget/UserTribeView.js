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


export default class UserTribeView extends React.Component {

    static propTypes = {
        userTribeListData: React.PropTypes.object,
    };


    render() {
        let recentItemAry = [];
        for (let i = 0; i < this.props.userTribeListData.data.length; i++) {

            recentItemAry.push(
                <View key={i}
                      style={{marginLeft:15,alignSelf:'center',}}>

                    <View style={{flexDirection:'row',}}>
                        <Image style={{width:40,height:40,borderRadius:20,alignSelf:'center'}}
                               source={{uri:this.props.userTribeListData.data[i].icon}}/>
                        <Text style={{alignSelf:'center',fontSize:15,color:'black',marginLeft:10}}>
                            {this.props.userTribeListData.data[i].name}
                        </Text>
                    </View>

                    <View style={{height:0.5,backgroundColor:'lightgray',marginTop:5,marginBottom:5,width:width}}/>
                </View>
            );
        }


        return (
            <View style={{flexDirection:'row',backgroundColor:'white'}}>
                <View style={{flexDirection:'column',paddingLeft:15,paddingRight:15}}>
                    <Text style={{fontSize:18}}>
                        加入群
                    </Text>
                    <Text
                        style={{color:'#FFA500',alignSelf:'flex-start',fontSize:20}}>
                        {this.props.userTribeListData.total}
                    </Text>
                </View>

                <View style={{flexDirection:'column',}}>

                    {recentItemAry}
                </View>

            </View>
        );
    }

}


exports.module = UserTribeView;