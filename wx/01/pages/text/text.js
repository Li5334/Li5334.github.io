// pages/text/text.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "hello world",
    bool: false,
    arr: ["one", "two", "three"],
    value: "",
    obj: [{
        id: 1,
        url: "http://img.daimg.com/uploads/allimg/141028/3-14102R33154.jpg"
      },
      {
        id: 2,
        url: "https://img0.baidu.com/it/u=2232938395,2587364040&fm=26&fmt=auto&gp=0.jpg"
      },
      {
        id: 3,
        url: "https://img1.baidu.com/it/u=388030989,1741732486&fm=26&fmt=auto&gp=0.jpg"
      }
    ],
    longitude: 113,
    latitude: 23
  },
  bindmethods: function () {
    this.setData({
      msg: '111'
    })
  },
  boolch: function () {
    this.setData({
      bool: !this.data.bool,
    })
  },
  getLocal: function () {
    wx.getLocation({
      type: 'wgs84',
    }).then((res) => {
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude,
      })
    })
  },
  btnnav:function(){
    wx.navigateTo({
      url: '/pages/title/title?name=nei',
    })
  },
  onmyMethods:function(options){
    console.log(options.detail)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("创建时", "text");
    this.setData({
      msg: 'setdata'
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
    console.log("卸载时", "text");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("下拉");
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