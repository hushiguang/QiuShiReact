'use strict';

import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default class TopicItemComponent extends React.Component {

    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    render() {
        return (
            <View>
                <Text style={styles.textDefault}>
                    TopicItemComponent
                </Text>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    textDefault: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

exports.module = TopicItemComponent;