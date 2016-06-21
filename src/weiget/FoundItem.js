'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
var width = Dimensions.get('window').width;

export default class FoundItem extends React.Component {

    static propTypes = {
        tag: React.PropTypes.string,
        data: React.PropTypes.object,
    };


    render() {
        return (
            <View style={styles.mainContain}>
                {this._rendeContentView()}
            </View>
        );
    }


    _rendeContentView() {
        switch (this.props.tag) {
            case 'group':
                return (
                    <View style={styles.constantView}>
                        {this._renderItemTopView(require('../../img/found_group_image@3x.png'), '群', '来看看周围的组织吧>')}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(require('../../img/qiuyou@3x.png'), '北京海淀糗友群', '附近的群', '加入')}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(require('../../img/qiuyou@3x.png'), '北京海淀糗友群', '附近的群', '加入')}
                    </View>
                );
                break;
            case 'goods':
                return (
                    <View style={styles.constantView}>
                        {this._renderItemTopView(require('../../img/found_store@3x.png'), '糗百货', '萌萌哒周边,买买买>')}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(this.props.data.items[1].image, this.props.data.items[1].name, this.props.data.items[1].price, this.props.data.items[1].mktPrice)}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(this.props.data.items[0].image, this.props.data.items[0].name, this.props.data.items[0].price, this.props.data.items[0].mktPrice)}
                    </View>
                );
                break;
            case 'game':
                return (
                    <View style={styles.constantView}>
                        {this._renderItemTopView(require('../../img/found_game@3x.png'), '游戏', '精彩好玩游戏,停不下来>')}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(this.props.data.games[0].image, this.props.data.games[0].name,
                            this.props.data.games[0].description, this.props.data.games[0].act)}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(this.props.data.games[1].image, this.props.data.games[1].name,
                            this.props.data.games[1].description, this.props.data.games[1].act)}

                    </View>
                );
                break;
            case 'video':
                return (
                    <View style={styles.constantView}>
                        {this._renderItemTopView(require('../../img/found_chicken@3x.png'), '小鸡炖蘑菇', this.props.data.description)}
                        <View style={{height:0.5,backgroundColor:'lightgray',marginLeft:30,marginRight:20}}/>
                        {this._renderGroupsItem(this.props.data.videos[0].image, this.props.data.videos[0].subject, this.props.data.videos[0].description, '')}
                    </View>);
                break;
        }

    }


    _renderItemTopView(icon, name, dec) {
        return (
            <View style={styles.constantViewOne}>
                <Image style={{alignSelf:'flex-start',alignItems:'flex-start'}}
                       source={icon}/>
                <Text style={{color:'lightslategrey',fontSize:20,marginLeft:10,
                            alignSelf:'center',flex:1}}>{name}</Text>
                <Text style={{color:'lightgray',alignSelf:'center',marginRight:20}}>
                    {dec}</Text>
            </View>
        );
    }


    _renderGroupsItem(icon, name, dec, join) {
        let iconUri = typeof icon === 'string' ? icon : '';
        if (this.props.tag === 'group' || this.props.tag === 'game') {
            return (
                <View style={styles.constantViewOne}>
                    <Image style={{alignSelf:'center',alignItems:'flex-start',width:40,height:40}}
                           source={iconUri ? {uri: iconUri} : icon}/>
                    <View style={styles.qunInfo}>
                        <Text numberOfLines={1} style={{color: 'black',fontSize:18,paddingRight:20}}>{name}</Text>
                        <Text style={{color: 'lightslategrey',marginTop:3}}>{dec}</Text>
                    </View>
                    <View style={styles.joinView}>
                        <Text style={{color:'white',fontSize:15,alignSelf:'center'}}>{join}</Text>
                    </View>
                </View>
            );
        } else if (this.props.tag === 'goods') {
            return (
                <View style={styles.constantViewOne}>
                    <Image style={{alignSelf:'center',alignItems:'flex-start',width:40,height:40}}
                           source={iconUri ? {uri: iconUri} : icon}/>
                    <View style={styles.qunInfo}>
                        <Text numberOfLines={1} style={{color: 'black',fontSize:18,marginRight:20}}>{name}</Text>
                        <View style={{flexDirection : 'row'}}>
                            <Text style={{color: 'coral',marginTop:3}}>¥ {dec / 100}.0</Text>
                            <Text
                                style={{color: 'lightgray',marginTop:3,marginLeft:15,textDecorationLine :'line-through'}}>¥ {join / 100}.0</Text>
                        </View>
                    </View>
                </View>
            );
        } else if (this.props.tag === 'video') {
            return (
                <View style={styles.constantViewOne}>
                    <Image style={{alignSelf:'center',alignItems:'flex-start',width:width/5*2,height:width/5*2*0.5}}
                           source={iconUri ? {uri: iconUri} : icon}/>

                    <View style={styles.videoItem}>
                        <Text numberOfLines={1} style={{color: 'black',fontSize:18,paddingRight:20}}>{name}</Text>
                        <Text style={{color: 'lightslategrey',marginTop:3}}>{dec}</Text>
                    </View>
                </View>
            );
        }
    }

}

var styles = StyleSheet.create({
    mainContain: {
        flexDirection: 'column',
    },
    constantView: {
        flexDirection: 'column',
        marginTop: 10,
        width: width,
        backgroundColor: 'white',
    },
    constantViewOne: {
        flexDirection: 'row',
        flex: 1,
        paddingLeft: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    qunInfo: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    videoItem: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 10
    },
    joinView: {
        backgroundColor: 'mediumaquamarine',
        alignSelf: 'center',
        borderRadius: 3,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 30
    }
});

exports.module = FoundItem;