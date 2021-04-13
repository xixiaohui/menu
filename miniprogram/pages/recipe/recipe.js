const systemInfo = wx.getSystemInfoSync()

const LIMIT_NUM = 20

// 在页面中定义激励视频广告
let videoAd = null

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
    count: "?",

    event:null
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

  //实际跳转功能
  canGotoContent:function(event){

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

  //跳转到Content页面
  gotoContent:function(event){
    let that = this
    that.setData({
      event:event
    })
    
    // 用户触发广告后，显示激励视频广告
    // if (videoAd) {
    //   videoAd.show().catch(() => {
    //     // 失败重试
    //     videoAd.load()
    //       .then(() => videoAd.show())
    //       .catch(err => {
    //         console.log('激励视频 广告显示失败')
    //       })
    //   })
    // }else{
      that.canGotoContent(event)
    // }
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


    // 在页面onLoad回调事件中创建激励视频广告实例
    // if (wx.createRewardedVideoAd) {
    //   videoAd = wx.createRewardedVideoAd({
    //     adUnitId: 'adunit-241183198697a6ea'
    //   })
    //   videoAd.onLoad(() => {
    //     console.log('激励视频 广告加载成功')
    //   })
    //   videoAd.onError((err) => {})
    //   videoAd.onClose((res) => {
    //     if(res && res.isEnded){
    //       that.canGotoContent(that.data.event)
    //     }else{
    //       // 播放中途退出，不下发游戏奖励
    //       console.log("播放中途退出，不下发游戏奖励")

    //       wx.showModal({
    //         title: '播放中途退出，无法查看内容。',
    //         content: '是否继续查看？',
    //         success (res) {
    //           if (res.confirm) {
    //             // console.log('用户点击确定')
    //             that.gotoContent(that.data.event)
    //           } else if (res.cancel) {
    //             console.log('用户点击取消')
    //           }
    //         }
    //       })
    //     }
    //   })
    // }
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
      title:"#快来七饭#" +category 
    }
  }
})