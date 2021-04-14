// pages/mystore/mystore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores: [],

    tips: "空"
  },

  gotoAddfood: function (e) {
    let that = this

    wx.navigateTo({
      url: '/pages/addfood/addfood',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    that.loadStoreData()


  },

  //加载store里数据
  loadStoreData: function () {
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.cloud.callFunction({
      name: "getStore",
      data: {
        databasename: 'store',
        mystore: 1
      }
    }).then(res => {
      wx.hideLoading()
      // console.log(res.result)
      that.setData({
        stores: res.result.data
      })
      if (that.data.stores.length != 0) {
        that.setData({
          tips: '非空'
        })
      }
    })
  },

  //添加评论
  review: function (event) {
    console.log("review")

    let that = this
    // console.log(event)
    let id = event.currentTarget.dataset.id

    // console.log(text)
    wx.navigateTo({
      url: '/pages/review/review?id=' + id,
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
    let that = this
    // console.log("onShareAppMessage")
    var sharepath = '/pages/mystore/mystore'
    var title = "我的留影"
    return {
      title: title,
      path: sharepath
    }
  },

  onShareTimeline: function () {
    let that = this
    var title = "我的留影"
    return {
      title: "#快来七饭#" + title,
    }
  }

})