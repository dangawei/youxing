// 配置api接口
// var root =  'http://api.web.cnyxcx.com';
// let root='http://192.168.1.129:10004';
// let root='http://192.168.1.17:10004';
   // let root ='http://api.web.cnyxcx.com';
let root=process.env.API_ROOT;

// let roots='http://192.168.1.110:8052';
// 引入axios
let axios= require('axios');
// 引入qs,解析url
let QS=require('qs');
import networkcode from './network'
import webapi from './webapi'

// 自定义判断元素类型JS
function toType (obj) {
 	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
	for (var key in o) {
		if (o[key] === null) {
		  	delete o[key]
		}
		if (toType(o[key]) === 'string') {
		  	o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
		  	o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
		  	o[key] = filterNull(o[key])
		}
	}
	return o
}

axios.defaults.headers.common['token'] = webapi.get("token");
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

function apiAxios (method, url, params, success, failure) {
  // if (params) {
  //   params = filterNull(params)
  // }
  // var getparams = params
  //     getparams.callback = new Date().getTime()
 //  	if(usertype==2){
	// //杰哥	 
	// 	root = "http://192.168.1.129:10004"
	// }else if (usertype==3) {
	// 	root = "http://192.168.1.111:10004"
	// }else if (usertype==1) {
	// 	root = "http://192.168.1.17:10004"
	// }
	axios({
		method: method,
		url: url,
		// data: method === 'POST' || method === 'PUT' ? QS.stringify(params) : null,
		data: method === 'POST' || method === 'PUT' ? params : null,
		params: method === 'GET' || method === 'DELETE' ? params : null,
		baseURL:root,
		withCredentials: false
	})
    .then(function (res,e) {
		if (res.status === 200) {
			success(res.data)
		} else {
			if (failure) {
				failure(res.data)
			} else {
				networkcode.getApiCode(res.msg)
			}
		}
    })
    .catch(function (err) {
		console.log(err)
		let res = err.response
		if (err) {
			networkcode.getCode(err)
			return
		}
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  root:root
}