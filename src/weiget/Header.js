'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

let ashamedTitles = new Array('专享', '视频', '纯文', '纯图', '精华');
let circleTitles = new Array('隔壁', '已粉', '视频', '话题');

var screen_width = Dimensions.get('window').width;
let contentItem = [];
export default class Header extends React.Component {


    static propTypes = {
        onPress: React.PropTypes.func,
        tag: React.PropTypes.string,
        ashamedTabPosition: React.PropTypes.number,
        circleTabPosition: React.PropTypes.number,
    };


    /***
     * 渲染头部的每个条目
     *
     * @param title
     * @param i
     * @returns {XML}
     * @private
     */
    _renderTopItem(title, i) {
        if (this.props.tag == 'ashamed') {
            return (
                <TouchableOpacity key={i} activeOpacity={1} onPress={this.props.onPress.bind(this,i)}>
                    <Text style={this.props.ashamedTabPosition == i ?
                    styles.topSelectTitle : styles.topNormalTitle}>
                        {title}
                    </Text>
                </TouchableOpacity>
            );
        } else if(this.props.tag == 'circle'){
            return (
                <TouchableOpacity key={i} activeOpacity={1} onPress={this.props.onPress.bind(this,i)}>
                    <Text style={this.props.circleTabPosition == i ?
                    styles.topSelectTitle : styles.topNormalTitle}>
                        {title}
                    </Text>
                </TouchableOpacity>
            );
        }
    }


    _renderItem(tag) {
        contentItem = [];
        if (tag == 'ashamed') {
            for (let i = 0; i < 5; i++) {
                contentItem.push(this._renderTopItem(ashamedTitles[i], i));
            }
        } else if (tag == 'circle') {
            for (let i = 0; i < 4; i++) {
                contentItem.push(this._renderTopItem(circleTitles[i], i));
            }
        }

    }


    _renderScrollHeader(tag) {
        this._renderItem(tag);
        return (
            <View style={styles.topView}>
                <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}
                            showsHorizontalScrollIndicator={false}>
                    {contentItem}
                </ScrollView>
                <Image style={{marginLeft:15,}} source={require('../../img/ic_audit_@3x.png')}/>
                <Image style={{marginLeft:15,}} source={require('../../img/group_create@3x.png')}/>
            </View>
        );
    }


    _renderOtherHeader(title) {
        return (
            <View style={styles.topOtherContain}>
                <Image style={{marginLeft:10,}} source={require('../../img/ic_ab_qiushi@3x.png')}/>
                <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>{title}</Text>
            </View>
        );
    }


    render() {
        let header;
        if (this.props.tag == 'ashamed') {
            header = this._renderScrollHeader('ashamed');
        } else if (this.props.tag == 'circle') {
            header = this._renderScrollHeader('circle');
        } else if (this.props.tag == 'search') {
            header = this._renderOtherHeader('发现');
        } else if (this.props.tag == 'msg') {
            header = this._renderOtherHeader('小纸条');
        } else if (this.props.tag == 'mine') {
            header = this._renderOtherHeader('关于我');
        }
        return (
            <View>
                {header}
            </View>
        );
    }

}

var styles = StyleSheet.create({
    topView: {
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        height: 48,
        paddingLeft: 10,
        paddingRight: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topOtherContain: {
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        height: 48,
        paddingRight: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollView: {
        paddingVertical: 5,
        width: screen_width / 3 * 2,
        alignItems: 'center'
    }, topNormalTitle: {
        color: 'azure',
        fontSize: 15,
        width: 55,
    },
    topSelectTitle: {
        color: 'white',
        fontSize: 18,
        width: 55,
    }
});

exports.module = Header;