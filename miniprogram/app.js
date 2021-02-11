//app.js
App({
  globalData : {
    shifa:'珠海',
    zhongdian:'广州',
    date:'',
    aWeek:'',
    queryType:1,
    whatday:''
  },
  dealTime: function (num) {     // num：未来天数
    var time = new Date()     // 获取当前时间日期
    var date = new Date(time.setDate(time.getDate() + num)).getDate()  //这里先获取日期，在按需求设置日期，最后获取需要的
    var month = time.getMonth() + 1   // 获取月份
    var day = time.getDay()   //  获取星期
    switch (day) {             //  格式化
      case 0: day = "周日"
        break
      case 1: day = "周一"
        break
      case 2: day = "周二"
        break
      case 3: day = "周三"
        break
      case 4: day = "周四"
        break
      case 5: day = "周五"
        break
      case 6: day = "周六"
        break
    }
    var obj = {
      date: date,
      day: day,
      month: month,
      newday:month + '/' + date
    }
    return obj      // 返回对象
  },
  onLaunch: function () {
    var arr = []
    for (let i = 0; i < 7; i++) {
      arr.push(this.dealTime(i))
    }
    arr[0].day = '今天';
    for(var i=1;i<8;i++){
      arr[i-1].id = i;
    }
    this.globalData.aWeek = arr;
    console.log(this.globalData.aWeek);
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'hj-5g960d1k2c185f2c',
        traceUser: true,
      })
    }
  },
})
