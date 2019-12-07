const _ = require('lodash')
// 匹配小括号中的内容
const regIncludes = (str)=> {
	const res = str.match(/\((.+?)\)/g)
	return res ? JSON.stringify(res.map(item=> item.match(/\((.+?)\)/)[1])) : '[]'
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

module.exports = {
	regIncludes,
	includeZh,
	jsonSplitStr,
	speicalFilter
}