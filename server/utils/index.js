const fs = require('fs')
const path = require('path')
const util = require('util')

// 缓存10分钟
const CACHE_TIME = 10 * 60 * 1000 

module.exports = {
    getCache (name) {
        let read = util.promisify(fs.readFile)
        return read(path.join(__dirname,`../cache/${name}.json`)).then(json => {
            if (json) {
                let data = JSON.parse(json)
                let cur = Date.now()
                if (data.time && cur - data.time < CACHE_TIME) {
                    return data.data
                }
            }
        }).catch(e => {})
    },
    setCache (name, data) {
        fs.writeFile(path.join(__dirname,`../cache/${name}.json`), JSON.stringify(data))
    },
    Paginate (data, page, pageSize) {
        let total = data.length
        page = Number(page)
        pageSize = Number(pageSize)
        let afterHandle = []
        while (data.length) {
            afterHandle.push(data.splice(0, pageSize))
        }
        return {
            total,
            data: afterHandle[page - 1],
            pageCount: afterHandle.length,
            page,
            pageSize
        }
    }
}