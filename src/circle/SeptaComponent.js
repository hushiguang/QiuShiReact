'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ListView,
    AsyncStorage,
    ProgressBarAndroid,
    Image,
    Dimensions,
    TouchableOpacity,
    ToastAndroid,
    RefreshControl,
    ViewPagerAndroid,
} from 'react-native';
import API from '../common/API';
import SeptaCircleItem from '../weiget/SeptaCircleItem';
import ImageDetailComponent from './ImageDetailComponent';
import SeptaDetailComponent from './SeptaDetailComponent';
import UserComponent from '../user/UserComponent';

var SEPTA_INFO = 'septaListJson';
var allData = [];


export default class SeptaComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            isLoading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    componentDidMount() {
        this._getDataFromStorage();
    }


    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <ListView
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={100}
                renderRow={this._renderItem.bind(this)}
                refreshControl={
                     <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this._onRefresh.bind(this)}
                        progressBackgroundColor={'#ffffff'}/>
                    }
            />
        );
    }


    /**
     * 渲染每个Item
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderItem(rowData:object, sectionID:number, rowID:number) {
        return (
            <TouchableOpacity key={rowID} activeOpacity={1}
                              onPress={()=>this._onItemPress('detail','',rowData)}>
                <SeptaCircleItem
                    rowData={rowData}
                    onPress={(name,i) => this._onItemPress(name,i,rowData)}
                />

            </TouchableOpacity>
        );
    }

    /**
     * 点击事件的处理
     * @param name
     * @param position
     * @param rowData
     * @private
     */
    _onItemPress(name, position, rowData) {
        switch (name) {
            case 'userIcon':
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData}
                });
                break;
            case 'userName':
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData}
                });
                break;
            case 'detail':
                this.props.navigator.push({
                    page: SeptaDetailComponent,
                    data: {rowData},
                });
                break;
            default:
                this.props.navigator.push({
                    page: ImageDetailComponent,
                    data: {name, position},
                });
                break;
        }
    }


    _onEndReached() {
        this._removeStorage();
        this._fetchSeptaData(this.state.page + 1);
    }

    _onRefresh() {
        this.setState({
            isLoading: true,
            page: 1,
        });
        this._removeStorage();
        allData = [];
        this._fetchSeptaData(1);
    }


    _fetchSeptaData(page) {
        fetch(API.circle.septa + '&page=' + page)
            .then(response => response.json())
            .then((json)=> {
                this._updateToStorage(json);
            })
            .catch(error => {
                console.log('error ' + error);
            })
    }

    async _getDataFromStorage() {
        var dataJson = await AsyncStorage.getItem(SEPTA_INFO);
        if (dataJson) {
            allData = allData.concat(JSON.parse(dataJson).data);
            this.setState({
                isLoading: false,
                page: this.state.page + 1,
                dataSource: this.state.dataSource.cloneWithRows(allData),
            });
        } else {
            this._fetchSeptaData(1);
        }
    }

    async _updateToStorage(json) {
        await AsyncStorage.setItem(SEPTA_INFO, JSON.stringify(json));
        this._getDataFromStorage();
    }

    async _removeStorage() {
        await AsyncStorage.removeItem(SEPTA_INFO);
    }

}


exports.module = SeptaComponent;