const systemInfo = wx.getSystemInfoSync()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipes:[],
    height:systemInfo.screenHeight,

    keyword:"",
    page:0
  },


 

  scrolltolower:function(){

    let that = this
    that.getSearchResults(that.data.keyword)
  },

  gotoContent:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var value = options.text.trim()
    that.setData({
      keyword:value
    })

    console.log(value)

    that.getSearchResults(value)
  },

  getSearchResults:function(keyword){
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })

    wx.cloud.callFunction({
      name:"getRecipesByWord",
      data:{
        databasename:'recipes',
        keyword:keyword,
        page:that.data.page
      },
      success:res=>{
        wx.hideLoading()
        console.log(res.result.data)
        var allrecipe = res.result.data
        
        var recipes = that.data.recipes
        var array = res.result.data
        for (let index = 0; index < array.length; index++) {
          const element = array[index];
          recipes.push(element)
        }
        that.setData({
          recipes:recipes
        })

        var page = that.data.page
        page += 1
        that.setData({
          page:page
        })
      },
      fail:res=>{
        console.log(res)
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