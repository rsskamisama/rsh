var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    type1:'',
    date: [
      { id:1,
        date:'日',
      },
      { id:2,
        date:'一',
      },
      { id:3,
        date:'二',
      },
      { id:4,
        date:'三',
      },
      { id:5,
        date:'四',
      },
      { id:6,
        date:'五',
      },
      { id:7,
        date:'六',
      },
    ],
  },
  
  xuanze:function(e){  
     if(e.currentTarget.dataset.id+1>=this.data.day&&e.currentTarget.dataset.id+1<=this.data.day+6){
      app.globalData.whatday=e.currentTarget.dataset.id+1 //选择了哪天
       this.setData({
         type:e.currentTarget.dataset.id+1
       })
       setTimeout(function () {
        wx.navigateBack({
              delta: 0,
            })
         }, 
        300) 
    }
    else{
      wx.showToast({
        title: '不在预售日期范围之内',
        icon: 'none',
      })
    }
    if(this.data.day>=20){
      this.setData({
        type1:''
      })
    }
    var day = e.currentTarget.dataset.id+1;
    var month = e.currentTarget.dataset.month;
    var year = e.currentTarget.dataset.year;
    if(year==this.data.year&&month==this.data.month&&day==this.data.day){
      var riqi = year+'年'+month+'月'+day+'日(今天)';
    }
    else{
      for (let i = 0; i < app.globalData.aWeek.length; i++) {
        if(day==app.globalData.aWeek[i].date){
          var riqi = year+'年'+month+'月'+day+'日'+"("+app.globalData.aWeek[i].day+")";
        }
      }
  }
    app.globalData.date=riqi;
    app.globalData.year = year;
    app.globalData.month = month;
    app.globalData.day = day;
    console.log(app.globalData.date);
   
  },
  xuanze1:function(e){  
    console.log(e.currentTarget.dataset.id+1); 
    if(e.currentTarget.dataset.id+1>this.data.nextBegin.length){
      wx.showToast({
        title: '不在预售日期范围之内',
        icon: 'none',
      });
    }
    else  if(e.currentTarget.dataset.id+1==this.data.nextBegin[e.currentTarget.dataset.id].num){
      app.globalData.whatday=e.currentTarget.dataset.id+1 //选择了哪天
      app.globalData.queryType=e.currentTarget.dataset.id+1
       this.setData({
         type1:e.currentTarget.dataset.id+1
       })   
       
    setTimeout(function () {
      wx.navigateBack({
            delta: 0,
          })
       }, 
      300) 
    };
  if(e.currentTarget.dataset.id+1+this.data.day>=20){
    this.setData({
      type:''
    })
    var day = e.currentTarget.dataset.id+1;
    var month = e.currentTarget.dataset.month;
    var year = e.currentTarget.dataset.year;
    console.log(app.globalData.aWeek[day].day);
    if(year==this.data.year&&month==this.data.month&&day==this.data.day){
      var riqi = year+'年'+month+'月'+day+'日(今天)';
    }
    else{
      for (let i = 0; i < app.globalData.aWeek.length; i++) {
        if(day==app.globalData.aWeek[i].date){
          var riqi = year+'年'+month+'月'+day+'日'+app.globalData.aWeek[i].day;
        }
      }
  }
    app.globalData.date=riqi;
    app.globalData.year = year;
    app.globalData.month = month;
    app.globalData.day = day;
    console.log(app.globalData.date);
 
  }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      const dat = new Date(); // 今天的标准时间
      console.log(dat);
      
        const timeY = dat.getFullYear() // 本年度
        const timeM = dat.getMonth()// 本月，注意值是0-11
        const timeD = dat.getDate() // 日期 
        this.setData({
          year:timeY,
          month:timeM+1,
          day:timeD
        })
        app.globalData.year=timeY
        app.globalData.month=timeM
        app.globalData.day=timeD
        // 获取本月长度
        const start = new Date(timeY, timeM, 1) // 本月第一天的中国标准时间，
        console.log(start);//Fri Nov 01 2019 00:00:00 GMT+0800
        const end = new Date(timeY, timeM+1, 0) // 本月最后一天的中国标准时间
       this.setData({
        start:start,
        end:end
       })
        console.log(end);
        const thisMLastD = end.getDate() // 本月最后一天的日期，也是本月的长度
        // 获取下个月的第一天
        const nextFirst = new Date(timeY, timeM+1, 1); // 下个月第一天的标准时间
        const nextFirstW = nextFirst.getDay(); // 下个月第一天的星期数，周天是0，其他跟星期几一致
        this.setData({
          nextFirstW:nextFirstW
        })
        console.log(nextFirstW);

        const lastMLast = new Date(timeY, timeM, 0) // 上个月最后一天的中国标准时间
        const lastMLastW = lastMLast.getDay(); // 上个月最后一天的星期数,+1就是上个月要展示的天数
        const lastMLength = lastMLast.getDate(); // 上个月最后一天的日期数
        this.setData({
          lastMLength:lastMLength
        })
        console.log(lastMLength)
        this.setData({
          lastMLastW:lastMLastW
        })
        console.log(lastMLastW)
        // 上月要展示的数组
        let lastMonthDate = []
        // 由于星期日排第一位，上个月要展示的日期数量应该是上个月最后一天星期数+1，比如最后一天是周四，那就展示5天
        for (var i = 0; i< lastMLastW+1; i++ ) {
            let index = lastMLength - lastMLastW + i // 上个月总长度减去上月最后一天的星期数等于上月应该展示的第一天的日期数
            let item = {num:index}
            lastMonthDate.push(item);
        }
        this.setData({
          lastMonthDate:lastMonthDate
        })

        // 本月要展示的数组
        let thisMonthDate = []
        for (var i = 1; i< thisMLastD + 1; i++ ) {
            let item = {num:i,month:this.data.month,year:this.data.year}
            thisMonthDate.push(item);
        }
        this.setData({
          thisMonthDate:thisMonthDate
        })
        console.log(thisMonthDate);
        
        // 下月要展示的数组
        let nextMonthDate = []
        if (nextFirstW !== 0) { // 为0说明是周天，也就没必要展示下月了
            for (let i = 1; i < 7 ; i++) {
            let item = {num:i+1}
                nextMonthDate.push(item)
            }
        }
        this.setData({
          nextMonthDate:nextMonthDate
        })
        
        //页面中做三个循环，依次循环lastMonthDate、thisMonthDate和nextMonthDate。
        // 为啥要搞成数组，不根据月份长度直接循环？
        // 方便做UI，毕竟一般日历肯定都是某些日期会有状态的，比如5号是生日，要加个背景色啥的，可以把状态值也添加进数组

        let year1 = this.data.month+1 > 11 ? this.data.year + 1 : this.data.year;
        let month1 = this.data.month+1 > 11 ? 0 : this.data.month;
        this.setData({
          year1: year1,
          month1: (month1 + 1)
        })
        const start1 = new Date(year1, month1);
        const beginning = (start1 - dat)/86400000;
        console.log(beginning);
        
        const end1 = new Date(year1, month1+1, 0);
        this.setData({
          start1:start1,
          end1:end1
         })

        const thisMLastD1 = end1.getDate() // 本月最后一天的日期，也是本月的长度
        // 获取下个月的第一天
        const nextFirst1 = new Date(year1, month1+1, 1); // 下个月第一天的标准时间
        const nextFirstW1 = nextFirst1.getDay(); // 下个月第一天的星期数，周天是0，其他跟星期几一致
        this.setData({
          nextFirstW1:nextFirstW1
        })
        const lastMLast1 = new Date(year1, month1, 0) // 上个月最后一天的中国标准时间
        const lastMLastW1 = lastMLast1.getDay(); // 上个月最后一天的星期数,+1就是上个月要展示的天数
        const lastMLength1 = lastMLast1.getDate(); // 上个月最后一天的日期数
        this.setData({
          lastMLength1:lastMLength1,
          lastMLastW1:lastMLastW1
        })
        let lastMonthDate1 = []
        // 由于星期日排第一位，上个月要展示的日期数量应该是上个月最后一天星期数+1，比如最后一天是周四，那就展示5天
        for (var i = 0; i< lastMLastW1+1; i++ ) {
            let index = lastMLength1 - lastMLastW1 + i // 上个月总长度减去上月最后一天的星期数等于上月应该展示的第一天的日期数
            let item = {num:index}
            lastMonthDate1.push(item);
        }
        this.setData({
          lastMonthDate1:lastMonthDate1
        })
        let thisMonthDate1 = []
        for (var i = 1; i< thisMLastD1 + 1; i++ ) {
          let item = {num:i,month:this.data.month1,year:this.data.year1}
            thisMonthDate1.push(item);
        }
        
        this.setData({
          thisMonthDate1:thisMonthDate1
        })
        let nextMonthDate1 = []
        if (nextFirstW1 !== 0) { // 为0说明是周天，也就没必要展示下月了
            for (let i = 1; i < 7 ; i++) {
            let item = {num:i+1}
                nextMonthDate1.push(item)
            }
        }
        this.setData({
          nextMonthDate1:nextMonthDate1
        })
        let nextBegin = []
        if (beginning <= 6) {
          for (let i = 1; i < 7-beginning ; i++) {
          let item = {num:i}
          nextBegin.push(item)
          }
      }
      this.setData({
        nextBegin:nextBegin
      })
      console.log(nextBegin);
    
   
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})