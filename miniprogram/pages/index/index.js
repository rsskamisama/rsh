 var app = getApp();
 Page({

  /**
   * 页面的初始数据
   */
  data: {
      shifa:app.globalData.shifa,
      zhongdian:app.globalData.zhongdian,
      imgAnimation:'',
      date:app.globalData.date,
  },
  query:function(){
    if(app.globalData.shifa=='请选择'){
      wx.showToast({
        title: '请先选择出发城市',
        icon: 'none',
      })
    }
    else  if(app.globalData.zhongdian=='请选择'){
      wx.showToast({
        title: '请先选择到达城市',
        icon: 'none',
      })
    }
    else {
      for(var i=0; i<app.globalData.aWeek.length;i++){
        if(typeof app.globalData.aWeek[i].date =='number'&&app.globalData.aWeek[i].date<10){
          app.globalData.aWeek[i].date='0'+app.globalData.aWeek[i].date
        }
        if(typeof app.globalData.aWeek[i].month =='number'&&app.globalData.aWeek[i].month<10){
          app.globalData.aWeek[i].month='0'+app.globalData.aWeek[i].month
        }
        app.globalData.aWeek[i].newday=app.globalData.aWeek[i].month + '/' + app.globalData.aWeek[i].date;
        if (app.globalData.aWeek[i].date==app.globalData.whatday) {
          app.globalData.queryType = app.globalData.aWeek[i].id
        }
      }

    wx.navigateTo({
      url: '../query/query',
    })
  }
  },

  shifa:function(e){
    wx.navigateTo({
      url: '../shifa/shifa',
    })
  },
  zhongdian:function(e){
    if(app.globalData.shifa=='请选择'){
      wx.showToast({
        title: '请先选择出发城市',
        icon: 'none',
      })
    }
    else
    wx.navigateTo({
      url: '../zhongdian/zhongdian',
    })
  },
  change:function(e){
    let that = this;
    let imgAnimation = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear'
    });
    //中间图标
    imgAnimation.rotate(180).step();
        var change =  app.globalData.shifa
        app.globalData.shifa=app.globalData.zhongdian
        app.globalData.zhongdian= change
    that.setData({ 
        shifa: app.globalData.shifa,
        zhongdian:  app.globalData.zhongdian,
      imgAnimation: imgAnimation.export()
    })
        
  
    setTimeout(() => {
      imgAnimation.rotate(0).step({ duration: 0, transformOrigin: "50%,50%", timingFunction: 'linear' }) 
    
      that.setData({
        shifa: app.globalData.shifa,
        zhongdian:  app.globalData.zhongdian,
        imgAnimation: imgAnimation.export(),
      })
    }, 200);
  },
  calendar:function(e){
    wx.navigateTo({
      url: '../calendar/calendar',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   const date = new Date();
    const year =  date.getFullYear();
    const month =  date.getMonth()+1;
    const day =  date.getDate();
    const riqi = year+'年'+month+'月'+day+'日(今天)';
    app.globalData.date = riqi
    app.globalData.year = year;
    app.globalData.month = month;
    app.globalData.day = day;
    console.log(app.globalData.date);
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
    this.setData({
      date:app.globalData.date
    })
    if(app.globalData.shifa==app.globalData.zhongdian){
    app.globalData.zhongdian='请选择'
   }
     this.setData({
    shifa:app.globalData.shifa,
    zhongdian:app.globalData.zhongdian,  
   })
   
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