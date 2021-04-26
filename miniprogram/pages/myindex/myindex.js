const keyDatabaseName = 'keys'
const allrecipes = {}


const XIXIAOHUI = 'oOpb_4z23zUSQEyNL7ijz-3i927w'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    words: ["常见菜式", "主食小吃", "甜品", "适宜人群", "食疗食补",
      "场景", "饮食方式", "中式菜系", "外国美食", "烘焙", "传统美食",
      "节日食俗", "按制作难度", "按所需时间", "按菜品口味", "按主要工艺"
    ],
    keys: [],

    imageIndex: -1,

    exit:"false",

    openid:'oOpb_4z23zUSQEyNL7ijz-3i927w',
    isXixiaohui:false
  },

  //处理搜索结果
  selectResult: function (result) {
    console.log("---------selectResult---------" + JSON.stringify(result))

    //跳转到新的页面
    let text = result.detail.value
    wx.navigateTo({
      url: '/pages/search/search?text=' + text,
    })
  },

  filterAllKeysByWords: function (all) {
    let that = this

    let words = that.data.words
    let allkeys = all
    for (let index = 0; index < words.length; index++) {
      const element = words[index];

      var ab = "keys[" + index + "]"
      var data = allkeys.filter(item => item.recipe == element)

      that.setData({
        [ab]: data
      })
    }
  },

  getAllKeys: function () {
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.cloud.callFunction({
      name: "getAllRecipes",
      success: res => {
        wx.hideLoading()
        // console.log(res.result.data)
        var allkeys = res.result.data
        that.filterAllKeysByWords(allkeys)
      }
    })
  },


  gotoRecipe: function (event) {
    let that = this
    console.log(event)
    let text = event.currentTarget.dataset.text

    console.log(text)
    wx.navigateTo({
      url: '/pages/recipe/recipe?text=' + text,
    })
  },


  //跳转到每日推荐页面
  gotoFoodPage: function (event) {
    let that = this
    // console.log(event)
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/food/food?index=' + index,
    })

  },

  //获取每日推荐的菜谱图片索引
  setImageIndex: function () {
    let that = this

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
        imageIndex: res.result.data[0].index
      })

    })
  },

  //跳转到合肥私房菜页面
  gotoHefeiPrivateStore: function () {
    let that = this
    if(that.data.exit == "false"){
      that.setData({
        exit:"true"
      })
      wx.navigateTo({
        url: '/pages/privatestore/privatestore',
      })
    }
    
  },

  //跳转到我的私房菜
  gotoMyPrivateStore: function() {
    let that = this
    if(that.data.exit == "false"){
      that.setData({
        exit:"true"
      })
      wx.navigateTo({
        url: '/pages/mystore/mystore',
      })
    }
    
  },

  /**
   * 
   * 登录
   */
  myLogin:function(){
    console.log('myLogin')
    let that = this
    wx.login({
      success(res){
        if(res.code){
          console.log(res.code)
          var url = 'https://www.oddfee.com/menu/login'

          wx.request({
            url: url,
            data:{
              code:res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
              let whosopenid = res.data.openid
              console.log(res.data.openid)
              console.log(res.data.session_key)

              that.setData({
                openid:res.data.openid
              })

              if(whosopenid == XIXIAOHUI){
                that.setData({
                  isXixiaohui:true
                })
              }else{
                that.setData({
                  isXixiaohui:false
                })
              }
            },
            fail(res){
              console.log('fail')
              console.log(res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
 
    that.getAllKeys()

    that.setImageIndex()

    that.myLogin()
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
    let that = this
    that.setData({
      exit:"false"
    })
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

  onShareTimeline: function () {


    return {
      title: "#快来七饭#" + "逛吃逛吃"
    }

  }
})