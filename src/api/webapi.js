//保存缓存里
function saveStorage (typeName,typedata){
    window.sessionStorage.setItem(typeName, typedata)
    return
}

//获取缓存里
function getStorage (typeName){
    return window.sessionStorage.getItem(typeName)
}
//时间格式转换
function gettime (type,time) {
    type = type || 'date'
    time = time ? parseInt(time, 10) : null
    var result = ''
    if (time) {
        var tdate = new Date(time * 1000)
        var year = tdate.getFullYear()
        var month = tdate.getMonth() + 1
        var date = tdate.getDate()
        var hour = tdate.getHours()
        var minute = tdate.getMinutes()
        var second = tdate.getSeconds()
        month = month > 9 ? month : '0' + month
        date = date > 9 ? date : '0' + date
        hour = hour > 9 ? hour : '0' + hour
        minute = minute > 9 ? minute : '0' + minute
        second = second > 9 ? second : '0' + second
        result = [year, month, date].join('-')
        if (type == 'time') {
            result += ' ' + [hour, minute, second].join(':')
        }
        if (type == 'hour') {
            result += ' ' + hour+':00'
        }
        if (type == 'minute') {
            result += ' ' + [hour, minute].join(':')
        }
    }
    return result
}
// 金钱转换格式
function getmoney(givetype,money,gettype){
  gettype = gettype || 'yuan'
  money=parseFloat(money);
  var result=''
  if (money || money==0) {
    if (givetype=='yuan') {
      var yuan=money;
      var jiao=money*10;
      var fen=money*100;
    }
    if (givetype=='jiao') {
      var yuan=money/10;
      var jiao=money;
      var fen=money/100;
    }
    if (givetype=='fen') {
      var yuan=money/100;
      var jiao=money/10;
      var fen=money;
    }
    if (gettype == 'yuan') {
        result =yuan;
    }
    if (gettype == 'jiao') {
        result =jiao;
    }
    if (gettype == 'fen') {
        result =fen;
    }
  }
  return parseFloat(result)
}

//强制保存小数点后面两位
function toDecimal2(x) {
  var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
  var f = Math.round(x*100)/100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return parseFloat(s);
}

// 对象转URL
function http_url(url, data) {
      if(typeof(url) == 'undefined' || url == null || url == '') {
          return '';
      }
      if(typeof(data) == 'undefined' || data == null || typeof(data) != 'object') {
          return '';
      }
      url += (url.indexOf("?") != -1) ? "" : "?";
      for(var k in data) {
          url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
      }
      return url;
}

// 保存缓存里
export default {
    save: function (typeName,typedata) {
      return saveStorage(typeName,typedata)
    },
    get: function (typeName) {
      return getStorage(typeName)
    },
    gettime: function (type,time) {
      return gettime(type,time)
    },
    toDecimal2:function(num){
      return toDecimal2(num)
    },
    getmoney:function(type,money){
      return getmoney(type,money)
    },
    http_url:function(url, data){
      return http_url(url, data)
    }
}