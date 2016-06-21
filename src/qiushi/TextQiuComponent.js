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
import AshamedItem from '../weiget/AshamedItem';
import ImageDetailComponent from '../circle/ImageDetailComponent';
import SeptaDetailComponent from '../circle/SeptaDetailComponent';
import UserComponent from '../user/UserComponent';
var allData = [];
export default class TextQiuComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isLoading: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    componentDidMount() {
        this._fetchLatestData(this.state.page);

    }

    render() {
        return (
            <ListView
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
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
                <AshamedItem
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
                let title = rowData.id;
                this.props.navigator.push({
                    page: SeptaDetailComponent,
                    data: {rowData, title},
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

    _onRefresh() {
        this.setState({
            isLoading: true,
            page: 1,
        });
        allData = [];
        this._fetchLatestData(this.state.page);
    }

    _fetchLatestData(page) {
        fetch(API.ashamed.text + '&page=' + page)
            .then(response => response.json())
            .then((json)=> {
                allData = allData.concat(json.items);
                this.setState({
                    isLoading: false,
                    page: this.state.page + 1,
                    dataSource: this.state.dataSource.cloneWithRows(allData),
                });
            })
            .catch(error => {
                console.log('error ' + error);
            })
    }

}


exports.module = TextQiuComponent;