// 添加足迹

const UPLOADFILE_URL = "http://www.oddfee.com/photoes/api/upload"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: "",

    title:"",
    phone:"",
    address:"",
    des:[],
    tips:[]
  },

  /**
   * 选择照片
   */
  chooseImg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          photos: tempFilePaths
        })
        console.log(that.data.photos)
      }
    })
  },

  /**
   * 上传照片 
   * 和其他信息
   */
  uploadImgAndOtherInput: function () {
    var that = this
    wx.uploadFile({
      url: UPLOADFILE_URL, //仅为示例，非真实的接口地址
      filePath: that.data.photos[0],
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'file',
      formData: {
        'user': '黑柴哥'
      },
      success: function (res) {
        console.log(res)

        var data = JSON.parse(res.data)
        console.log(data)

        console.log(data.path)
        //上传云数据库记录

        that.submitToCloudDatabase(data.path,that.data.title,
          that.data.phone,that.data.address,that.data.des,that.data.tips)

      },
      fail: function (res) {

        console.log(res)
      }
    })
  },

  formatTime: function (date) {
    var date = date; //返回当前时间对象
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].join('-')
  },

  //吃货提交发布留影
  submitToCloudDatabase: function (path,title,phone,address,des,tips) {
    let that = this
    const db = wx.cloud.database()
    db.collection('store').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        title: title,
        phone: phone,
        time: that.formatTime(new Date()),
        url: path,
        address: address,
        des: des,
        tips: tips,
        tags: []
      },
      success: function (res) {
        console.log(res)
      }
    })
  },

  bindFormSubmit: function (e) {
    console.log("bindFormSubmit")

    let that = this
    if(e.detail.value.title == null){
      return;
    }
    let des = []
    des.push(e.detail.value.des)

    let tips = []
    tips.push(e.detail.value.tips)

    that.setData({
      title:e.detail.value.title,
      phone:e.detail.value.phone,
      address:e.detail.value.address,
      des: des,
      tips: tips
    })
    

    that.uploadImgAndOtherInput()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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