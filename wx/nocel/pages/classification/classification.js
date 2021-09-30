// pages/classification/classification.js
const {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 'male',
    extraClasses: '',
    extraClasses2: true,
    extraClasses3: '',
    fication: {
      male: [],
      female: []
    },
    ssstop: null
  },

  // 男生高亮
  maleTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition',
        // extraClasses3: ''
      })
    }
  },

  // 女生高亮
  femaleTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition box-moved',
        // extraClasses3: 'tranx',
      })
    } else {
      this.setData({
        extraClasses: 'box-transition box-moved',
        // extraClasses3: 'tranx',
      })
    }
  },

  changeGender: function (event) {
    this.setData({
      gender: event.currentTarget.dataset.gender || 'male'
    })
    // 判断是否为male，显示对应过度效果
    if (event.currentTarget.dataset.gender == 'male') {
      this.maleTransition()
      this.setData({
        extraClasses2: true
      })
    } else {
      this.femaleTransition()
      this.setData({
        extraClasses2: false
      })
    }
  },

  newfication: function (event) {
    // console.log(event.currentTarget.dataset.name)
    wx.navigateTo({
      url: '/pages/newfication/newfication?id=' + event.currentTarget.dataset.name + '&gender=' + event.currentTarget.dataset.gender,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: "https://novel.kele8.cn/categories"
    }).then((res) => {
      console.log(res)
      this.setData({
        'fication.male': res.data.male,
        'fication.female': res.data.female
      })
      wx.hideLoading()
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