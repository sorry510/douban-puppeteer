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
	return JSON.stringify(str.trim().split('/').map(v=> v.trim()))
}

module.exports = {
	regIncludes,
	includeZh,
	jsonSplitStr
}