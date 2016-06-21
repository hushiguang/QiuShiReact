module.exports = {
    found: 'http://circle.qiushibaike.com/found/info',
    circle: {
        septa: 'http://circle.qiushibaike.com/article/nearby/list?latitude=38.868099&longitude=115.544353&count=30',
        getSeptaDetail(id){
            return `http://circle.qiushibaike.com/article/${id}/info?latitude=38.867412&longitude=115.543044&count=30`
        },
        getSeptaUserComment(id){
            return `http://circle.qiushibaike.com/article/${id}/user/comment/list?latitude=38.867412&longitude=115.543044&count=30`
        },

    },
    user: {
        getUserDetailInfo(id){
            return `http://nearby.qiushibaike.com/user/${id}/detail`
        },
        getUserRecentList(id){
            return `http://m2.qiushibaike.com/user/${id}/recent?login=1`
        },
        getUserTribeList(id, page){
            return `http://tribe.qiushibaike.com/tribe/my/list?brief=1&uid=${id}&page=${page}&count=10&login=1`
        },
        getUserCircleList(id){
            return `http://circle.qiushibaike.com/user/${id}/article/list?page=1&count=10&longitude=115.543058&latitude=38.867401&login=1`
        }
    },
    topic: {
        topicTop: 'http://circle.qiushibaike.com/article/topic/top?count=20',
        topicSearch: 'http://circle.qiushibaike.com/article/topic/search?count=20',
        getTopicItemDetail(id, page){
            return `http://circle.qiushibaike.com/article/topic/${id}/all?latitude=38.867391&longitude=115.543034&page=${page}`
        },
    },
    ashamed: {
        latest: 'http://m2.qiushibaike.com/article/list/latest?count=30',
        text: 'http://m2.qiushibaike.com/article/list/text?count=30',
        video: 'http://m2.qiushibaike.com/article/list/video?count=30',
        imgRank: 'http://m2.qiushibaike.com/article/list/imgrank?count=30',
        day:'http://m2.qiushibaike.com/article/list/day?count=30',
    },
};