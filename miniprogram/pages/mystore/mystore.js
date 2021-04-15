// pages/mystore/mystore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores: [],

    tips: "空",

    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'delete',
      data: []
    }]
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

  //删除本地记录
  deleteMyFoodFromStore: function (id) {
    let that = this

    let stores = that.data.stores;
    let index = 0
    for (var i = 0; i < stores.length; i++) {
      if (stores[i]._id == id) {
        index = i
        break
      }
    }
    stores.splice(index,1)
    // console.log(stores)

    that.setData({
      stores: stores
    })
  },

  //删除云端记录
  deleteMyFood: function (id) {
    let that = this

    // that.deleteMyFoodFromStore(id)

    const db = wx.cloud.database()
    db.collection('store').doc(id).remove({
      success: function (res) {
        // console.log(res.data)
        wx.showToast({
          title: '删除成功',
        })
        that.deleteMyFoodFromStore(id)
      }
    })
  },

  //响应左划
  slideButtonTap: function (e) {
    let that = this
    console.log('slide button tap', e)
    console.log('slide button tap', e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id

    that.deleteMyFood(id)
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