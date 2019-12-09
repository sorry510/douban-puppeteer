const _ = require('lodash')

// 匹配小括号中的内容
const regIncludes = (str)=> {
	const res = str.match(/\((.+?)\)/g)
	return res ? JSON.stringify(res.map(item=> item.match(/\((.+?)\)/)[1])) : '[]'
}

// 匹配小括号
const regInOne = (str)=> {
	const res = str.match(/\((.+?)\)/)
	return res ? res[0] : ''
}

// 是否包含中文
const includeZh = (str)=> {
	return /.*[\u4e00-\u9fa5]+.*$/.test(str)
}

// 分隔字符串返回json结构
const jsonSplitStr = (str)=> {
	return JSON.stringify(str.trim().split('/').map(v=> escape(v.trim())))
}

// 转义字符
const escape = (str)=> {
	return _.isString(str) ? str.replace(/'/g, "&apos;").replace(/"/g, "&quot;") : str
}

// 过滤特殊字符
const speicalFilter = (data)=> {
	if(_.isArray(data)) {
		return _.map(data, v=> escape(v))
	}else if(_.isObject(data)) {
		Object.keys(data).map(key=> data[key] = escape(data[key]))
		return data
	}else {
		return escape(data)
	}
}

// 随机min-max之间的数字
const randInt = (min, max)=> {
	if(!max) {
		max = min
		min = 0
	}
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min // 不含最大值，含最小值
	// return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值 
}

const getfilename = (path)=> {
	path = path.replace(/\\/g, '/')
	return path.substr(path.lastIndexOf("/"))
}

module.exports = {
	regIncludes,
	regInOne,
	includeZh,
	jsonSplitStr,
	speicalFilter,
	randInt,
	getfilename
}