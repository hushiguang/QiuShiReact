'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ViewPagerAndroid,
    TouchableOpacity,
    Image,
    StatusBar
} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class ImageDetailComponent extends React.Component {

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="black"
                    barStyle="light-content"
                />
                {this._renderViewPager()}
            </View>
        );
    }

    _renderViewPager() {
        let picView = [];
        let picLength = this.props.name.length >= 0 && this.props.name.length > 3 ? 3 : this.props.name.length;
        if (this.props.name.length >= 0) {
            for (let i = 0; i < picLength; i++) {
                picView.push(
                    <View key={i} style={{alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity key={i} activeOpacity={1}
                                          onPress={() => {this.props.navigator.pop()}}>
                            <Image
                                resizeMode={'contain'}
                                style={{width:width,height:height}}
                                source={{uri:this.props.name[i].pic_url}}/>
                        </TouchableOpacity>
                    </View>
                );
            }
        }

        return (
            <ViewPagerAndroid
                ref={viewPager => { this.viewPager = viewPager }}
                style={{alignItems: 'center',alignSelf:'center',flex:1,width:width,height:height,backgroundColor:'black'}}
                initialPage={this.props.position}>
                {picView}
            </ViewPagerAndroid>);

    }


}

exports.module = ImageDetailComponent;