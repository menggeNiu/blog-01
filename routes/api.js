var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/getlist', function(req, res, next) {
	// 处理请求参数 处理get请求 req.query
	// 处理post类型请求	req.body
	// req.query.username
	// req.query.id
	fs.readFile(__dirname + "/db/getlist.json", function(err, data) {
		if (err) {
			return res.send({
				success: 0,
				info: '数据读取失败，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		return res.send({
			success: 1,
			data: JSON.stringify(data)
		});
		// redirect('路径') 重定向（可以做登陆转换等）服务端实现的 实现页面跳转
		// res.redirect('/detail')
	})
});
router.get('/getdetail', function(req, res, next) {
	fs.readFile(__dirname + "/db/getdetail.json", function(err, data) {
		if (err) {
			return res.send({
				success: 0,
				info: '数据读取失败，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		return res.send({
			success: 1,
			data: JSON.stringify(data)
		});
	})
});
router.post('/conf', function(req, res, next) {
	var datanew = req.body;
	fs.readFile(__dirname + "/db/getlist.json", function(err, data) {
		if (err) {
			return res.send({
				success: 0,
				info: '数据读取失败，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		datanew.id = '00' + (data.data.length + 1);
		data.data.splice(0, 0, datanew);
		fs.writeFile(__dirname + "/db/getlist.json", JSON.stringify(data), function(err) {
			if (err) {
				return res.send({
					success: 0,
					info: '添加失败，请重试'
				})
			}
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

	})
})
router.get('/del?*', function(req, res, next) {
	var id = req.url.substring(req.url.length - 3, req.url.length);
	fs.readFile(__dirname + '/db/getlist.json', function(err, data) {
		if (err) {
			return res.send({
				success: 0,
				info: '数据获取不成功，请重试'
			})
		}
		var data = JSON.parse(data.toString());
		for (var i = 0; i < data.data.length; i++) {
			if (id == data.data[i].id) {
				data.data.splice(i, 1);
			}
		}
		fs.writeFile(__dirname + '/db/getlist.json', JSON.stringify(data), function(err) {
			if (err) {
				return res.send({
					success: 0,
					info: '写入数据失败，请重试'
				})
			}
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

		});


	})
})

module.exports = router;