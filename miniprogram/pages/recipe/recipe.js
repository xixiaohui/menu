const systemInfo = wx.getSystemInfoSync()

const LIMIT_NUM = 20

Page({

  /**
   * 页面的初始数据
   */
  data: {
    database:"recipes",
    recipes:[],

    height: systemInfo.screenHeight,

    //跳过记录
    skipnum : 0,

    //当前分类
    category:"",
    
    //记录此分类的总数
    count: "?"
  },

  getCountAboutThisClass:function(){
    let that = this
    let category = that.data.category
    
    wx.cloud.callFunction({
      name:'getCount',
      data:{
        databasename:'recipes',
        keyword:category
        
      }
    }).then(res =>{
      console.log("---getCountAboutThisClass---")
      var total = res.result.total
      that.setData({
        count:total
      })

    })
    
  },

  //跳转到Content页面
  gotoContent:function(event){
    let that = this
    console.log(event)
    let recipe = event.currentTarget.dataset.recipe
    
    wx.navigateTo({
      url: '/pages/content/content',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromRecipePage', { data: recipe })
      }
    })

  },

  /**
   * 获取菜单
   */
  getRecipe:function(skipnum){
    let that = this
    const db = wx.cloud.database()

    const _ = db.command
    wx.showLoading({
      title: '加载中，请稍后',
    })
    
    var arr_category = []
    arr_category.push(that.data.category)

    db.collection(that.data.database).field({
      _id:false
    }).where({
      tags:_.in(arr_category)
    }).skip(skipnum)
    .get().then(res => {
      wx.hideLoading({
        success: (res) => {},
      })
      
      console.log(res.data)
      var temp = that.data.recipes
      var array = res.data
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        temp.push(element)
      }

      that.setData({
        recipes:temp
      })
    })
  },

  scrolltolower:function(){
    console.log("scrolltolower-----------")
    let that = this
    var num = that.data.skipnum
    num += LIMIT_NUM
    that.setData({
      skipnum:num
    })
    that.getRecipe(num)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options.text)
    that.setData({
      category : options.text
    })

    that.getRecipe(0)
    that.getCountAboutThisClass()
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
    var category = that.data.category
    return {
      title:"#妈妈的菜单#" +category 
    }
  }
})