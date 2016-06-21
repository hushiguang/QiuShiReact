'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ToastAndroid,
    Image,
    TouchableOpacity,
    ListView,
} from 'react-native';
import ImageDetailComponent from './ImageDetailComponent';
import SeptaCircleItem from '../weiget/SeptaCircleItem';
import SeptaCircleCommentItem from '../weiget/SeptaCircleCommentItem';
import UserComponent from '../user/UserComponent';
import API from '../common/API';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

var allCommentData = [];
var userCommentData = [];
export default class SeptaDetailComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allCommentPage: 1,
            userCommentPage: 1,
            commentPosition: 0,
            allCommentData: null,
            userCommentData: null,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    componentDidMount() {
        allCommentData = [];
        userCommentData = [];
        console.log(this.props.rowData.id);
        this._fetchSeptaAllComment(this.props.rowData.id, this.state.allCommentPage);
        this._fetchSeptaUserComment(this.props.rowData.id, this.state.userCommentPage)
    }


    render() {
        if (allCommentData.length) {
            return (
                <View style={{paddingTop:48,flex:1}}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>this._onItemPress('back')}
                                      style={{position:'absolute',backgroundColor:'#FFA500',top:0}}>
                        <View
                            style={{alignSelf:'flex-start',justifyContent:'center',backgroundColor:'#FFA500',height:48,width:width}}>
                            <Text style={{color:'white',fontSize:20,marginLeft:5,fontWeight:'bold'}}>
                                {this.props.title ? ('〈 糗事' + this.props.title) : '〈 详情'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <ListView
                        style={{width:width,flex:1}}
                        dataSource={this.state.dataSource}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={100}
                        renderRow={this._renderRow.bind(this)}
                        renderHeader={this._renderHeader.bind(this)}
                    />
                </View>
            );
        } else {
            return (
                <View style={{height:height,flexDirection:'column',backgroundColor:'#F8F8F8',paddingTop:48}}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>this._onItemPress('back')}
                                      style={{position:'absolute',backgroundColor:'#FFA500',top:0}}>
                        <View
                            style={{alignSelf:'flex-start',justifyContent:'center',backgroundColor:'#FFA500',height:48,width:width}}>
                            <Text style={{color:'white',fontSize:20,marginLeft:5,fontWeight:'bold'}}>{'〈 详情'}</Text>
                        </View>
                    </TouchableOpacity>
                    {this._renderHeader()}
                </View>

            );
        }
    }


    /**
     * 设置数据信息
     * @param json
     * @private
     */
    _updateAllComemnt(json) {
        if (json.comments) {
            allCommentData = allCommentData.concat(json.comments);
            this.setState({
                allCommentData: json,
                dataSource: this.state.dataSource.cloneWithRows(allCommentData),
            });
        }
    }


    _onEndReached() {
        if (this.state.commentPosition === 0) {
            this._fetchSeptaAllComment(this.props.rowData.id, this.state.allCommentPage + 1);
        } else {
            this._fetchSeptaUserComment(this.props.rowData.id, this.state.userCommentPage + 1)
        }
    }


    /***
     * 请求全部的评论信息
     * @param id
     * @param page
     * @private
     */
    _fetchSeptaAllComment(id, page) {
        fetch(API.circle.getSeptaDetail(id) + '&page=' + page)
            .then(response => response.json())
            .then(json=> {
                this.state.allCommentPage = page;
                this._updateAllComemnt(json);

            })
            .catch(error=> {
                console.warn(error);
            })
            .done();
    }

    /**
     * 请求用户的评论
     * @param id
     * @param page
     * @private
     */
    _fetchSeptaUserComment(id, page) {
        fetch(API.circle.getSeptaUserComment(id) + '&page=' + page)
            .then(response => response.json())
            .then(json=> {
                userCommentData = userCommentData.concat(json.data);
                this.setState({
                    userCommentPage: page,
                    userCommentData: json,
                    dataSource: this.state.dataSource.cloneWithRows(userCommentData),
                });
            })
            .catch(error=> {
                console.warn(error);
            })
            .done();
    }


    /**
     * 渲染每行
     * @param rowData
     * @param sectionID
     * @param rowID
     * @returns {XML}
     * @private
     */
    _renderRow(rowData:object, sectionID:number, rowID:number) {
        return (
            <View>
                <SeptaCircleCommentItem
                    user={this.props.rowData.user}
                    rowData={rowData}
                    onPress={(name) => this._onItemPress(name,'',rowData)}
                />
            </View>
        );
    }


    /**
     *
     * 渲染头部信息
     * @returns {XML}
     * @private
     */
    _renderHeader() {
        let commentView;
        if (allCommentData.length) {
            let allCommentSize = this.state.allCommentData ? this.state.allCommentData.total : 0;
            let userCommentSize = this.state.userCommentData ? this.state.userCommentData.total : 0;
            let userCommentView;
            if (userCommentSize !== 0) {
                userCommentView = (
                    <TouchableOpacity activeOpacity={1} onPress={() =>this._onItemPress('userComment')}>
                        <Text
                            style={[{fontSize:13,marginLeft:10},this.state.commentPosition !== 0 ? {color: '#FFA500'} : {color: 'lightgray'}]}>
                            {'楼主 ' + userCommentSize}
                        </Text>
                    </TouchableOpacity>
                );
            }

            commentView = (
                <View style={{backgroundColor:'#F8F8F8',padding : 5,flexDirection:'row'}}>
                    <TouchableOpacity activeOpacity={1} onPress={() =>this._onItemPress('allComment')}>
                        <Text
                            style={[{fontSize:13,marginLeft: 10},this.state.commentPosition ===0 ? {color: '#FFA500'} : {color: 'lightgray'}]}>
                            {'全部评论 ' + allCommentSize}
                        </Text>
                    </TouchableOpacity>
                    {userCommentView}
                </View>
            );
        }

        return (
            <View style={{flexDirection:'column',backgroundColor:'#F8F8F8'}}>

                <SeptaCircleItem
                    isDetail={true}
                    rowData={this.props.rowData}
                    onPress={(name,i) => this._onItemPress(name,i)}
                />
                {commentView}
            </View>
        );
    }


    /***
     * 点击事件的处理
     * @param name
     * @param position
     * @param commentData
     * @private
     */
    _onItemPress(name, position, commentData) {
        let rowData = null;
        switch (name) {
            case 'back':
                this.props.navigator.pop();
                break;
            case 'userIcon':
                rowData = this.props.rowData;
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData},
                });
                break;
            case 'userName':
                rowData = null;
                rowData = this.props.rowData;
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData},
                });
                break;
            case 'commentUserIcon':
                rowData = commentData;
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData},
                });
                break;
            case 'commentUserName':
                rowData = commentData;
                this.props.navigator.push({
                    page: UserComponent,
                    data: {rowData},
                });
                break;
            case 'allComment':
                this.setState({
                    commentPosition: 0,
                    dataSource: this.state.dataSource.cloneWithRows(allCommentData),
                });
                break;
            case 'userComment':
                this.setState({
                    commentPosition: 1,
                    dataSource: this.state.dataSource.cloneWithRows(userCommentData
                    ),
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
}


exports.module = SeptaDetailComponent;