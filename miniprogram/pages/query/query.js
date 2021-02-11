var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aWeek:app.globalData.aWeek,
    type:app.globalData.queryType
  },
  click:function (e) {
    console.log(e);
    this.setData({
      type:e.currentTarget.dataset.id+1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      aWeek:app.globalData.aWeek,
      type:app.globalData.queryType
    })

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
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('line').where({
      start: "珠海",
      date: 11
    }).get({
      success: res => {
        console.log(res);
        this.setData({
          price:res.data[0].price,
          shifazhan:res.data[0].shifazhan,
          zhongdianzhan:res.data[0].zhongdianzhan,
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
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