

const keyDatabaseName='keys'
const allrecipes = {}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    words:["常见菜式", "主食小吃", "甜品", "适宜人群", "食疗食补", 
    "场景", "饮食方式", "中式菜系", "外国美食", "烘焙", "传统美食",
    "节日食俗", "按制作难度", "按所需时间", "按菜品口味", "按主要工艺"],
    keys:[],

    imageIndex: 3,
  },

  //处理搜索结果
  selectResult: function (result){
    console.log("---------selectResult---------" + JSON.stringify(result))

    //跳转到新的页面
    let text = result.detail.value
    wx.navigateTo({
      url: '/pages/search/search?text=' + text,
    })
  },

  filterAllKeysByWords:function(all){
    let that = this

    let words = that.data.words
    let allkeys = all
    for (let index = 0; index < words.length; index++) {
      const element = words[index];

      var ab = "keys["+index+"]"
      var data = allkeys.filter(item => item.recipe == element)
      
      that.setData({
        [ab]:data
      })
    }
  },

  getAllKeys:function(){
    let that = this
    wx.showLoading({
      title: '加载中，请稍后',
    })
    wx.cloud.callFunction({
     name:"getAllRecipes",
     success:res=>{
        wx.hideLoading()
        // console.log(res.result.data)
        var allkeys = res.result.data
        that.filterAllKeysByWords(allkeys)
     }
    })
  },


  gotoRecipe:function(event){
    let that = this
    console.log(event)
    let text = event.currentTarget.dataset.text
    
    console.log(text)
    wx.navigateTo({
      url: '/pages/recipe/recipe?text=' + text,
    })
  },


  //跳转到每日推荐页面
  gotoFoodPage:function(event) {
    let that = this
    // console.log(event)
    let index = event.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/food/food?index=' + index,
    })

  },

  //获取每日推荐的菜谱图片索引
  setImageIndex:function(){
    let that = this
    wx.request({
      url: 'https://www.oddfee.com/menu/',
      method:'GET',
      success(res) {
        // console.log(res)
        that.setData({
          imageIndex:res.data[0].index
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getAllKeys()

    this.setImageIndex()
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
    
    
    return {
      title:"#妈妈的菜单#" + "逛吃逛吃" 
    }
  
  }
})