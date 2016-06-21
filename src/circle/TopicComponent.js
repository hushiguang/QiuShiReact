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
    TextInput,
} from 'react-native';


import API from '../common/API';
import TopicTopItem from '../weiget/TopicTopItem';
import TopicItemDetail from './TopicItemDetail';

var width = Dimensions.get('window').width;
var allTopicData = [];
var searchData = [];
var sqlData = [];
var TOPIC_INFO = 'topicListJson';


export default class TopicComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isLoading: true,
            isSearch: false,
            keyWord: '',
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };

    }

    componentDidMount() {
        this._getDataFromStorage();
    }


    render() {
        return (
            <ListView
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                dataSource={this.state.dataSource}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={100}
                renderHeader={this._renderHeader.bind(this)}
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
            <View style={{flexDirection:'column',backgroundColor:'#F0F0F0'}}>
                <View style={{flexDirection:'row',margin:10,backgroundColor:'white',width:width-20,borderRadius:10}}>
                    <Image source={require('../../img/icon_search@3x.png')}
                           style={{alignSelf:'center',marginLeft: 10,marginRight:10}}/>
                    <TextInput onSubmitEditing={() => this._fetchGetSearchTopic(this.state.keyWord,1)}
                               blurOnSubmit={true}
                               onChangeText={(text) => {
                                if(!text){
                                    allTopicData = [];
                                    searchData = [];
                                    allTopicData = allTopicData.concat(sqlData);
                                    this.setState({
                                    page: 1,
                                    isSearch:false,
                                    dataSource: this.state.dataSource.cloneWithRows(allTopicData),});
                                }else {this.state.keyWord = text}}}
                               underlineColorAndroid={'transparent'}
                               numberOfLines={1}
                               placeholder={'搜索话题'}
                               style={{height:40,width:width}}>
                    </TextInput>
                </View>
                <Text style={{marginLeft:10,marginBottom:10,color:'#C0C0C0',fontSize:13}}>
                    天梯 (根据最近7天内活跃人数排名)
                </Text>
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
                              onPress={()=>{
                                this.props.navigator.push({
                                    page:TopicItemDetail,
                                    data:{rowData}
                                });
                              }}>
                <TopicTopItem
                    rowData={rowData}
                />
            </TouchableOpacity>
        );
    }


    _onEndReached() {
        if (!this.state.isSearch) {
            this._fetchSeptaData(this.state.page + 1);
        } else {
            this._fetchGetSearchTopic(this.state.keyWord, this.state.page + 1)
        }
    }

    _onRefresh() {

        this.setState({
            isLoading: true,
            page: 1,
        });

        allTopicData = [];
        searchData = [];

        if (!this.state.isSearch) {
            sqlData = [];
            this._removeStorage();
            this._fetchSeptaData(1);
        } else {
            this._fetchGetSearchTopic(this.state.keyWord, 1)
        }

    }


    _fetchSeptaData(page) {
        fetch(API.topic.topicTop + '&page=' + page)
            .then(response => response.json())
            .then((json)=> {
                if (page === 1) {
                    this._updateToStorage(json);
                } else {
                    allTopicData = allTopicData.concat(json.data);
                    this.setState({
                        page: page,
                        dataSource: this.state.dataSource.cloneWithRows(allTopicData),
                    });
                }
            })
            .catch(error => {
                console.log('error ' + error);
            }).done();
    }


    _fetchGetSearchTopic(value, page) {
        let tempValue = this.state.keyWord;
        if (!tempValue) {
            allTopicData = [];
            searchData = [];
            this.state.page = 1;
            this.state.isSearch = false;
            this._getDataFromStorage();
        } else {

            if (tempValue !== value) {
                searchData = [];
            }

            fetch(API.topic.topicSearch + '&keyword=' + encodeURIComponent(value) + '&page=' + page)
                .then(response => response.json())
                .then((json)=> {
                    if (json.total === 0) {
                        ToastAndroid.show('当前没有话题列表', ToastAndroid.SHORT);
                    } else {
                        searchData = searchData.concat(json.data);
                        this.setState({
                            page: page,
                            isSearch: true,
                            isLoading: false,
                            dataSource: this.state.dataSource.cloneWithRows(searchData),
                        });
                    }
                })
                .catch(error => {
                    console.log('error ' + error);
                }).done();
        }
    }


    async _getDataFromStorage() {
        var dataJson = await AsyncStorage.getItem(TOPIC_INFO);
        sqlData = sqlData.concat(JSON.parse(dataJson).data);
        if (dataJson) {
            allTopicData = allTopicData.concat(JSON.parse(dataJson).data);
            this.setState({
                isLoading: false,
                page: 1,
                dataSource: this.state.dataSource.cloneWithRows(allTopicData),
            });
        } else {
            this._fetchSeptaData(1);
        }
    }

    async _updateToStorage(json) {
        await AsyncStorage.setItem(TOPIC_INFO, JSON.stringify(json));
        this._getDataFromStorage();
    }

    async _removeStorage() {
        await AsyncStorage.removeItem(TOPIC_INFO);
    }


}


exports.module = TopicComponent;