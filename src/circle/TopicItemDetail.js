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
    StatusBar
} from 'react-native';

import API from '../common/API';
import SeptaCircleItem from '../weiget/SeptaCircleItem';
import ImageDetailComponent from './ImageDetailComponent';
import SeptaDetailComponent from './SeptaDetailComponent';
import UserComponent from '../user/UserComponent';

var allData = [];

export default class TopicItemDetail extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isLoading: true,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }


    componentDidMount() {
        allData = [];
        this._fetchSeptaData(this.props.rowData.id, this.state.page);
    }


    render() {
        return (
            <ListView
                onLayout={(e) => {console.log(e.nativeEvent.layout.y)}}
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={100}
                renderHeader={this._renderHeader}
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

    _renderHeader() {
        return (
            <View>
                <StatusBar
                    translucent={false}
                    animated={true}
                    backgroundColor={'#000000'}
                />

            </View>
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
        this._fetchSeptaData(this.props.rowData.id, this.state.page + 1);
    }

    _onRefresh() {
        this.setState({
            isLoading: true,
            page: 1,
        });
        allData = [];
        this._fetchSeptaData(this.props.rowData.id, 1);
    }

    _fetchSeptaData(id, page) {
        fetch(API.topic.getTopicItemDetail(id, page))
            .then(response => response.json())
            .then((json)=> {
                allData = allData.concat(json.data);
                this.setState({
                    isLoading: false,
                    page: page,
                    dataSource: this.state.dataSource.cloneWithRows(allData),
                });
            })
            .catch(error => {
                console.log('error ' + error);
            })
    }


}


exports.module = TopicItemDetail;