'use strict';

import React from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default class TabBarItem extends React.Component {
    
    static propTypes = {
        selected: React.PropTypes.bool,
        title: React.PropTypes.string,
        renderIcon: React.PropTypes.any,
        renderSelectIcon: React.PropTypes.any,
        normalColor: React.PropTypes.string,
        selectColor: React.PropTypes.string,
        onPress: React.PropTypes.func
    };


    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.props.onPress.bind(this)}
                              style={styles.bottomItem}>
                <View style={{alignItems: 'center',justifyContent: 'center'}}>
                    <Image
                        source={this.props.selected ? this.props.renderSelectIcon : this.props.renderIcon}/>
                    <Text
                        style={this.props.selected ? {color: this.props.selectColor} : {color:this.props.normalColor}}
                        numberOfLines={1}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    bottomItem: {
        flex: 1,
        height: 50,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


exports.module = TabBarItem;