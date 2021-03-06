// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexImage: 3,
    foods: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this
    console.log(options.index)
    that.setData({
      indexImage: options.index
    })


    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.cloud.callFunction({
      name: "getFood",
      data: {
        databasename: 'food',
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res.result)
      that.setData({
        foods: res.result.data
      })
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

  }
})