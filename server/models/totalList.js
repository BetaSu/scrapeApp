const mongoose = require('mongoose')
const utils = require('../utils')
const fs = require('fs')

let data = []

let questionSchema = new mongoose.Schema({
    type: String,
    title: String,
    // 本次抓取该问题的索引
    index: Number,
    id: Number,
    // 回答数
    answerCount: Number,
    // 关注数
    follow: Number,
    // 浏览量
    view: Number
}, {timestamps: true})
questionSchema.index({id: 1})
let QuestionModel = mongoose.model('QuestionModel', questionSchema)

// 获取所有列表数据
module.exports = async (page = 1, pageSize = 10) => {
    let cache = await utils.getCache('totalList')
    let resData
    if (cache) {
        resData = utils.Paginate(cache, page, pageSize)
    } else {
        let total = await QuestionModel.distinct('id')
        let cacheData = {
            time: Date.now(),
            data: total
        }
        utils.setCache('totalList', cacheData)
        resData = utils.Paginate(total, page, pageSize)
    }
    let details = await getDetailByIdList(resData.data)
    resData.data = details
    return resData
}

function getDetailByIdList(list = []) {
    getDetailByIdList.finalData = []
    let promiseList = []
    list.forEach(id => {
        promiseList.push(QuestionModel.aggregate([{
            $match: {
                createdAt: {
                    $exists: true
                },
                id
            }
        }]))
        // aggregate的一项
        // {
        //     $project: {
        //         _id: 0,
        //         id: 1,
        //         createdAt: 1,
        //         title: 1,
        //         index: 1
        //     }
        // }
    })
    return Promise.all(promiseList).then(d => {
        return d.forEach(doc => {
            if (doc && doc.length && doc.length > 5) {
                let result = {
                    id: 0,
                    title: '',
                    indexs: [],
                    timeStamps: [],
                    view: [],
                    follow: [],
                    answerCount: []
                }
                doc.forEach(item => {
                    if (!result.title) {
                        result.title = item.title
                    }
                    if (!result.title) {
                        result.id = item.id
                    }
                    result.indexs.push(item.index)
                    result.timeStamps.push(item.createdAt)
                    result.view.push(item.view)
                    result.follow.push(item.follow)
                    result.answerCount.push(item.answerCount)
                })
                getDetailByIdList.finalData.push(result)
            }
        })
    }).then(() => {
        return getDetailByIdList.finalData
    })
}