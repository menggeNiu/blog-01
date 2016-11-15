var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
	fs.readFile(__dirname + "/db/getlist.json", function(err, data) {
		console.log(err);
		if (err) {
			return res.send({
				success: 0,
				info: '数据读取失败，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		res.render('index', {
			data: data.data,
			success: 1,
			title: data.title
		});
	})

});
router.get('/detail?*', function(req, res, next) {
	var id = req.url.substring(req.url.length - 3, req.url.length);
	console.log(id);
	fs.readFile(__dirname + '/db/getlist.json', function(err, data) {
		if (err) {
			return res.send({
				seccess: 0,
				info: '读取失败，请重试'
			})
		}
		var jsondata = JSON.parse(data.toString());
		for (var i = 0; i < jsondata.data.length; i++) {
			if (id == jsondata.data[i].id) {
				title = jsondata.data[i].title;
				content = jsondata.data[i].des;
			}
		}
		var date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
		res.render('detail', {
			title: title,
			autor: 'niu',
			date: date,
			content: content
		});
	})


});
router.get('/data/conf', function(req, res, next) {
	fs.readFile(__dirname + "/db/getlist.json", function(err, data) {
		if (err) {
			return res.send({
				success: 0,
				info: '数据读取失败，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		res.render('conf', {
			data: data.data
		})
	})
})



module.exports = router;