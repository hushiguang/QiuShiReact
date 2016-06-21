'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
var height = Dimensions.get('window').height;

export default class MsgComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={styles.mainContain}>
                <Image source={require('../../img/default_no_content_grey@3x.png')} style={{alignSelf:'center'}}/>
                <Text style={{color :'darkgrey' , marginTop:15,fontSize:18}}>{this.props.msg}</Text>
                <TouchableOpacity onPress={() => { ToastAndroid.show('该功能暂时无法使用', ToastAndroid.SHORT)}}>
                    <View style={{backgroundColor: 'mediumaquamarine',padding:5,marginTop:15}}>
                        <Text style={{color :'white' , fontSize : 20, }}>去登录 / 注册</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    mainContain: {
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        height: height / 3 * 2,
        justifyContent: 'center',
    },


});

exports.module = MsgComponent;