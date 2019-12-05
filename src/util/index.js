const regIncludes = (str)=> {
	const res = str.match(/\((.+?)\)/g)
	return res ? JSON.stringify(res.map(item=> item.match(/\((.+?)\)/)[1])) : '[]'
}

module.exports = {
  regIncludes
}