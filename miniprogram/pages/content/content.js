
const systemInfo = wx.getSystemInfoSync()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recipe:"",
    height: systemInfo.screenHeight,

    

  },

  /**
   * 点击了标签，返回到数据菜单页面
   * @param {} event 
   */
  gotoRecipe:function(event){
    let that = this
    console.log(event)
    let text = event.currentTarget.dataset.text
    
    console.log(text)
    wx.navigateTo({
      url: '/pages/recipe/recipe?text=' + text,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromRecipePage', function(res) {
      console.log(res.data)

      that.setData({
        recipe:res.data
      })
      
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

  },

  onShareTimeline:function(){
    let that = this
    var title = that.data.recipe.title
    return {
      title:"#妈妈的菜单#" +title 
    }
  }

})