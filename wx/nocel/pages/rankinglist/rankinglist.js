// pages/rankinglist/rankinglist.js
const {
  request
} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 'male',
    rankinglist: {
      male: [],
      female: []
    },
    rankingbooks: [],
    rankid: null,
    rankingbool: true
  },

  // 男生高亮
  maleTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition'
      })
    }
  },

  // 女生高亮
  femaleTransition: function () {
    if (this.data.extraClasses == 'box-transition box-moved') {
      this.setData({
        extraClasses: 'box-transition box-moved'
      })
    } else {
      this.setData({
        extraClasses: 'box-transition box-moved'
      })
    }
  },

  // 点击事件切换gender的值
  changeGender: function (event) {
    this.setData({
      gender: event.currentTarget.dataset.gender || 'male'
    })
    // 判断是否为male，显示对应过度效果
    if (event.currentTarget.dataset.gender == 'male') {
      this.maleTransition()
      this.setrank('54d42d92321052167dfb75e3')
      this.setData({
        rankid: '54d42d92321052167dfb75e3'
      })
    } else {
      this.femaleTransition()
      this.setrank('54d43437d47d13ff21cad58b')
      this.setData({
        rankid: '54d43437d47d13ff21cad58b'
      })
    }
  },

  // 请求排行榜书籍
  setrank: function (id) {
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: "https://novel.kele8.cn/rank/" + id
    }).then((res) => {
      // console.log(res)
      this.setData({
        rankingbooks: res.data.ranking.books
      })
      wx.hideLoading()
    })
  },

  // 更换排行榜书单
  anranking: function (event) {
    // console.log(event.currentTarget.dataset.id)
    this.setrank(event.currentTarget.dataset.id)
    this.setData({
      rankid: event.currentTarget.dataset.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gender: options.gender || 'male'
    })
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: "https://novel.kele8.cn/rank-category"
    }).then((res) => {
      // console.log(res)
      this.setData({
        'rankinglist.male': res.data.male,
        'rankinglist.female': res.data.female
      })
      request({
        url: "https://novel.kele8.cn/rank/54d42d92321052167dfb75e3"
      }).then((res) => {
        // console.log(res)
        this.setData({
          rankingbooks: res.data.ranking.books,
          rankid: '54d42d92321052167dfb75e3'
        })
        wx.hideLoading()
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

  }
})