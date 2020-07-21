
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
   * 根据菜名检索
   * @param {} title 
   */
  setRecipeByOneWord:function(title){
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })

    wx.cloud.callFunction({
      name:"getRecipesByWord",
      data:{
        databasename:'recipes',
        keyword:title,
        page:0
      },
      success:res=>{
        wx.hideLoading()
        console.log(res.result.data)
        var allrecipe = res.result.data
        var firstRecipe = allrecipe[0]
        that.setData({
          recipe:firstRecipe
        })
      },
      fail:res=>{
        console.log(res)
      }
    })

    // const db = wx.cloud.database()
    // db.collection('recipes').where({
    //   title: title
    // }).get().then(res => {
    //   wx.hideLoading()
    //   console.log(res.data)
    //   var firstRecipe = res.data[0]
    //   that.setData({

    //     recipe:firstRecipe
    //   })
    // })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("start---------------------------------------->")
    console.log(options)
    let that = this

    //从分享进入的这里
    if(options.text){
      console.log("从分享进入的这里")
      var title = options.text
      that.setRecipeByOneWord(title)
      console.log("end---------------------------------------->")
      return
    }
  
    const eventChannel = that.getOpenerEventChannel()
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
      title:"#妈妈的菜单#" + title,
      query:"text="+title
    }
  }

})