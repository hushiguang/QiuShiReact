'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';

var allBgIcon = new Array(
    require('../../img/personal_default@1x.jpg'),
    require('../../img/personal_desk.jpg'),
    require('../../img/personal_goldgatebridge.jpeg'),
    require('../../img/personal_greenfield.jpeg'),
    require('../../img/personal_sun.jpg'));

var width = Dimensions.get('window').width;


export default class UserHeader extends React.Component {

    static propTypes = {
        userDetailInfo: React.PropTypes.object,
        bgIcon: React.PropTypes.number,
    };


    render() {
        let userIconUri = 'http://pic.qiushibaike.com/system/avtnew/'
            + String(this.props.userDetailInfo.userdata.uid)
                .substring(0, String(this.props.userDetailInfo.userdata.uid).length - 4)
            + '/' + this.props.userDetailInfo.userdata.uid + ''
            + '/medium/'
            + this.props.userDetailInfo.userdata.icon;

        let userSexIconUri =
            this.props.userDetailInfo.userdata.gender === 'F' ?
                require('../../img/nearby_gender_female@3x.png') :
                require('../../img/nearby_gender_male@3x.png');


        return (
            <View style={{flexDirection :'column',marginBottom:15} }>
                <Image resizeMode={'cover'} source={allBgIcon[this.props.bgIcon]}
                       style={{width:width,height:240}}>
                    
                    <Image source={{uri:userIconUri}}
                           style={{width:80,height:80,borderRadius:40,alignSelf:'center',alignItems:'center',marginTop:80}}/>
                    <View style={{flexDirection:'column',alignSelf:'center',marginTop: 10}}>
                        <View style={{flexDirection:'row',}}>
                            <Text letterSpacing={2}
                                  style={{fontWeight:'bold',fontSize:20,color: 'white',alignSelf:'center'}}>
                                {this.props.userDetailInfo.userdata.login}
                            </Text>
                            <Image style={{alignSelf:'center',marginLeft:8}}
                                   source={userSexIconUri}>
                                <Text
                                    style={{fontSize:12,color:'white',alignSelf:'flex-end',marginRight:5,}}>
                                    {this.props.userDetailInfo.userdata.age}
                                </Text>
                            </Image>
                        </View>
                        <Text style={{color:'white',fontSize:15,marginTop:5,alignSelf:'center'}}>
                            {this.props.userDetailInfo.userdata.astrology + (this.props.userDetailInfo.userdata.haunt ?
                            ' | ' + this.props.userDetailInfo.userdata.haunt : '')}
                        </Text>
                    </View>
                </Image>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    textDefault: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

exports.module = UserHeader;