const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')

// mongoose.set('debug', true)

app.listen(config.serverPort, (err) => {
	console.log(`服务器在${config.serverPort}端口启动成功`);
	let address = `mongodb://${config.dbServername}:${config.dbPort || ''}/${config.dbName}`
	mongoose.connect(address, err => {
		if (err) {
			console.log('服务器连接数据库失败', address);
		} else {
			console.log('服务器连接数据库成功!!', address);
		}
	})
})
