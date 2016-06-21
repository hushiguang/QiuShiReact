'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';


export default class TopicTopItem extends React.Component {

    static propTypes = {
        rowData: React.PropTypes.object,
    };


    render() {

        let rankIcon;
        if (this.props.rowData.rank !== undefined) {
            switch (this.props.rowData.rank) {
                case 1:
                    rankIcon = (
                        <Image
                            style={ {alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginLeft:5,}}
                            source={require('../../img/group_level_gold@3x.png')}/>
                    );
                    break;
                case 2:
                    rankIcon = (
                        <Image
                            style={ {alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginLeft:5,}}
                            source={require('../../img/group_level_silver@3x.png')}/>
                    );
                    break;
                case 3:
                    rankIcon = (
                        <Image
                            style={ {alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginLeft:5,}}
                            source={require('../../img/group_level_copper@3x.png')}/>
                    );
                    break;
                default:
                    rankIcon = (
                        <Text
                            style={ {alignSelf:'center',alignItems:'flex-end',
                                justifyContent:'flex-end',marginLeft:5,marginRight:10,color:'black'}}>
                            {this.props.rowData.rank}
                        </Text>
                    );

                    break;
            }

        }

        let selfTagView;
        /***
         * 是否匿名
         */
        if (this.props.rowData.is_anonymous) {
            selfTagView = (
                <View style={styles.joinView}>
                    <Text style={{color:'white',fontSize:12,alignSelf:'center'}}>匿名</Text>
                </View>
            );
        }


        return (
            <View style={{backgroundColor:'white',padding:5,paddingBottom:0}}>
                <View style={{flexDirection:'row',flex:1,}}>

                    <Image style={{width:60,height:60,alignSelf:'center'}}
                           source={{uri:this.props.rowData.avatar_urls[0].pic_url}}/>

                    <View style={{flexDirection:'column',marginLeft:10,flex:1,}}>

                        <View style={{flexDirection:'row',}}>
                            <Text
                                numberOfLines={1}
                                style={{fontSize:18,color:'black'}}>
                                {this.props.rowData.content.length >= 15 ? this.props.rowData.content.substring(0, 15) + '#' : this.props.rowData.content}
                            </Text>
                            {selfTagView}
                        </View>

                        <Text
                            numberOfLines={1}
                            style={{marginTop : 3,color: '#C0C0C0',fontSize:14}}>
                            {this.props.rowData.abstract}
                        </Text>

                        <Text
                            style={{color:'#C0C0C0',fontSize:14,marginRight:5,marginTop:3}}>
                            {'动态 ' + this.props.rowData.article_count + '  今日 ' + (this.props.rowData.today_article_count)}
                        </Text>
                    </View>
                    {rankIcon}
                </View>
                <View style={{height:1,backgroundColor:'#E8E8E8',marginTop:5,marginBottom:5}}/>
            </View>
        );
    }


}

var styles = StyleSheet.create({
    textDefault: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    joinView: {
        backgroundColor: 'mediumaquamarine',
        alignSelf: 'center',
        borderRadius: 3,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 15
    }
});

exports.module = TopicTopItem;