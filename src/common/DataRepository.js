'use strict';

import React from 'react';

import {
    AsyncStorage
} from 'react-native';
import API from './API';


var septaAllComment = 'allComment';
var septaUserComment = 'userComment';
export default class DataRepository {


    // 构造
    constructor() {
    }


    _fetchSeptaAllComment(id, page) {
        fetch(API.circle.getSeptaDetail(id) + '&page=' + page)
            .then(response => response.json())
            .then(json=> {
                this.updateAllComment(json)
            })
            .catch(error=> {
                console.warn(error);
            })
            .done();
    }


    _fetchSeptaUserComment(id, page) {
        fetch(API.circle.getSeptaDetail(id) + '&page=' + page)
            .then(response => response.json())
            .then(json=> {
                this.updateUserComment(json);
            })
            .catch(error=> {
                console.warn(error);
            })
            .done();
    }

    async getDataFromSpl(key, id, page) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(key, (error, result) => {
                var retData = JSON.parse(result);
                if (error) {
                    if (key === septaAllComment) {
                        this._fetchSeptaAllComment(id, page);
                    } else if (key === septaUserComment) {
                        this._fetchSeptaUserComment(id, page);
                    }
                } else {
                    resolve(retData);
                }
            });
        });
    };


    async updateAllComment(json) {
        await AsyncStorage.setItem(septaAllComment, JSON.stringify(json));
        this.getDataFromSpl(septaAllComment);
    }


    async updateUserComment(json) {
        await AsyncStorage.setItem(septaUserComment, JSON.stringify(json));
        this.getDataFromSpl(septaUserComment);
    }


}






