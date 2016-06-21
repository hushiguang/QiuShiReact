'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';


import CircleComponent from './circle/CircleComponent';
import MineComponent from './mine/MineComponent';
import MsgComponent from './msg/MsgComponent';
import QiuShiComponent from './qiushi/QiuShiComponent';
import SearchComponent from './search/SearchComponent';
import TabBarItem from './weiget/TabBarItem';
import Header from './weiget/Header';


export default class MainIndexComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
            bottomTab: 'ashamed',
            ashamedTabPosition: 0,
            circleTabPosition: 0,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        console.log('MainIndexComponent  componentWillUnMount');
    }


    render() {
        return (
            <View style={styles.mainContain}>
                <StatusBar
                    animated={true}
                    backgroundColor="#FFA500"
                    barStyle="light-content"
                />
                {this._renderContentView()}
                {this._renderBottomView()}
            </View>
        );
    }


    /**
     * topView
     * @private
     */
    _renderContentView() {
        let contentView;
        let topView;
        switch (this.state.bottomTab) {
            case 'ashamed':
                topView = (
                    <Header
                        tag={this.state.bottomTab}
                        onPress={(i) => this.setState({ashamedTabPosition : i})}
                        ashamedTabPosition={this.state.ashamedTabPosition}
                    />);


                contentView = (<QiuShiComponent navigator={this.props.navigator}
                                                selectPosition={this.state.ashamedTabPosition}
                                                ashamedTabPosition={(i)=> 
                                                this.setState({ashamedTabPosition : i})}/>);
                break;
            case 'circle':
                topView = (
                    <Header
                        tag={this.state.bottomTab}
                        onPress={(i) => this.setState({circleTabPosition : i})}
                        circleTabPosition={this.state.circleTabPosition}
                    />);
                contentView = (<CircleComponent navigator={this.props.navigator}
                                                selectPosition={this.state.circleTabPosition}
                                                circleTabPosition={(i)=> 
                                                this.setState({circleTabPosition : i})}/>);
                break;
            case 'search':
                topView = (
                    <Header
                        onPress={() => console.log(onPress)}
                        tag={this.state.bottomTab}
                    />);
                contentView = (<SearchComponent navigator={this.props.navigator}/>);
                break;
            case 'msg':
                topView = (
                    <Header
                        onPress={() => console.log(onPress)}
                        tag={this.state.bottomTab}
                    />);
                contentView = (<MsgComponent navigator={this.props.navigator}
                                    msg={'登录后才能和糗友聊天呐'}/>);
                break;
            case 'mine':
                topView = (
                    <Header
                        onPress={() => console.log(onPress)}
                        tag={this.state.bottomTab}
                    />);
                contentView = (<MineComponent navigator={this.props.navigator}/>);
                break;
        }


        return (
            <View style={{flex:1}}>
                <View style={styles.topViewContain}>
                    {topView}
                </View>
                <View style={styles.centerContain}>
                    {contentView}
                </View>
            </View>
        );

    }


    _onBottomPress(tag) {
        this.setState({
            bottomTab: tag
        });
    }


    /**
     * bottomView
     *
     * @private
     */
    _renderBottomView() {
        return (
            <View style={styles.bottomContain}>
                <TabBarItem
                    title={'糗事'}
                    selectColor={'#FFA500'}
                    normalColor={'gray'}
                    renderIcon={require('../img/ic_qiushi_normal@3x.png')}
                    renderSelectIcon={require('../img/ic_qiushi_select@3x.png')}
                    selected={this.state.bottomTab === 'ashamed'}
                    onPress={this._onBottomPress.bind(this,'ashamed')}>
                </TabBarItem>

                <TabBarItem
                    title={'糗友圈'}
                    selectColor={'#FFA500'}
                    normalColor={'gray'}
                    renderIcon={require('../img/ic_qiuyoucircle_normal@3x.png')}
                    renderSelectIcon={require('../img/ic_qiuyoucircle_select@3x.png')}
                    selected={this.state.bottomTab === 'circle'}
                    onPress={this._onBottomPress.bind(this,'circle')}>
                </TabBarItem>

                <TabBarItem
                    title={'发现'}
                    selectColor={'#FFA500'}
                    normalColor={'gray'}
                    renderIcon={require('../img/ic_nearby_normal@3x.png')}
                    renderSelectIcon={require('../img/ic_nearby_select@3x.png')}
                    selected={this.state.bottomTab === 'search'}
                    onPress={this._onBottomPress.bind(this,'search')}>
                </TabBarItem>

                <TabBarItem
                    title={'小纸条'}
                    selectColor={'#FFA500'}
                    normalColor={'gray'}
                    renderIcon={require('../img/ic_message_normal@3x.png')}
                    renderSelectIcon={require('../img/ic_message_select@3x.png')}
                    selected={this.state.bottomTab === 'msg'}
                    onPress={this._onBottomPress.bind(this,'msg')}>
                </TabBarItem>

                <TabBarItem
                    title={'我'}
                    selectColor={'#FFA500'}
                    normalColor={'gray'}
                    renderIcon={require('../img/ic_mine_normal@3x.png')}
                    renderSelectIcon={require('../img/ic_mine_select@3x.png')}
                    selected={this.state.bottomTab === 'mine'}
                    onPress={this._onBottomPress.bind(this,'mine')}>
                </TabBarItem>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    mainContain: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 5,
    },
    topViewContain: {
        flexDirection: 'row',
        backgroundColor: '#FFA500',
        height: 48,
        paddingRight: 10,
    },
    centerContain: {
        flex: 1,
    },
    bottomContain: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: 'white',
    },
    bottomItem: {
        flex: 1,
        height: 48,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10,
    },
});


exports.module = MainIndexComponent;