// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    foodid: "",
    reviews: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.id)
    that.setData({
      foodid: options.id
    })

    that.getReviews()
  },

  //获取评论
  getReviews: function () {
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.cloud.callFunction({
      name: "getReview",
      data: {
        databasename: 'review',
        foodid: that.data.foodid
      }
    }).then(res => {
      wx.hideLoading()
      console.log(res.result)
      that.setData({
        reviews: res.result.data
      })
    })
  },


  formatTime: function (date) {
    var date = date; //返回当前时间对象
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].join('-')
  },

  //提交评论
  bindFormSubmit: function (e) {
    let that = this
    console.log(e.detail.value.textarea)

    const db = wx.cloud.database()
    db.collection('review').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        foodid: that.data.foodid,
        text: e.detail.value.textarea,
        time: that.formatTime(new Date()),
        // address: new db.Geo.Point(113, 23)
        address: ""
      },
      success: function (res) {

        console.log(res)
        that.getReviews()
      }
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