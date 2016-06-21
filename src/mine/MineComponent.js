'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

export default class MineComponent extends React.Component {

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
                <View style={styles.aboutMeView}>
                    <Image style={styles.aboutMeIcon} source={require('../../img/about_me@3x.png')}/>
                    <Text style={{color :'black' , fontSize : 20,marginLeft:15}}>大眼怪Hu</Text>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    mainContain: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    aboutMeView: {
        paddingLeft: 15,
        flexDirection: 'column',
    },
    aboutMeIcon: {
        width: 120,
        height: 120,
        borderRadius: 15,
    },
    iconImg: {},

});

exports.module = MineComponent;