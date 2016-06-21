'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    ProgressBarAndroid,
    AsyncStorage,
} from 'react-native';

import API from '../common/API';
import FoundItem from  '../weiget/FoundItem';
var width = Dimensions.get('window').width;
var topView = [];
let topTitles = new Array('穿越', '附近糗友', '群', '糗百货');
let topIcon = new Array(require('../../img/found_ic_cross@3x.png'),
    require('../../img/found_ic_nearby@3x.png'),
    require('../../img/found_ic_group@3x.png'),
    require('../../img/found_ic_store@3x.png'));

var FOUND_INFO = 'foundInfo';

export default class SearchComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }

    componentDidMount() {
        this._getDataFromStorage();
    }


    render() {
        topView = [];
        for (let i = 0; i < 4; i++) {
            topView.push(<View style={styles.topViewItem} key={i}>
                <Image source={topIcon[i]}/>
                <Text style={{color:'black'}}>{topTitles[i]}</Text>
            </View>);
        }


        if (!this.state.data) {
            return (
                <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',backgroundColor: '#FAFAFA',}}>
                    <ProgressBarAndroid styleAttr='Inverse' style={{flex: 1,margin: 0,}}/>
                </View>);
        } else {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mainContain}>
                        <View style={styles.topViewContain}>{topView}</View>
                        <FoundItem tag={'group'}/>
                        <FoundItem data={this.state.data.buy} tag={'goods'}/>
                        <FoundItem data={this.state.data.game} tag={'game'}/>
                        <FoundItem data={this.state.data.video} tag={'video'}/>
                    </View>
                </ScrollView>
            );
        }
    }


    _fetchFoundData() {
        fetch(API.found)
            .then((response) => response.json())
            .then(json => {
                this._updateToStorage(json);
            })
            .catch((error)=> {
                console.log(error);
            }).done();
    }

    async _getDataFromStorage() {
        var dataJson = await AsyncStorage.getItem(FOUND_INFO);
        if (dataJson) {
            this.setState({data: JSON.parse(dataJson)});
        } else {
            this._fetchFoundData();
        }
    }

    async _updateToStorage(json) {
        await AsyncStorage.setItem(FOUND_INFO, JSON.stringify(json));
        this._getDataFromStorage();
    }

}


var styles = StyleSheet.create({
    mainContain: {
        flexDirection: 'column',
    },
    topViewContain: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    topViewItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

exports.module = SearchComponent;