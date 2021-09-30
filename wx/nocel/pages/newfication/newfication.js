// pages/newfication/newfication.js
const {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    propid: '',
    gender: '',
    filter: [{
      text: '热门',
      lis: 'hot'
    }, {
      text: '新书',
      lis: 'new'
    }, {
      text: '好评',
      lis: 'reputation'
    }, {
      text: '完结',
      lis: 'over'
    }, {
      text: '包月',
      lis: 'monthly'
    }],
    stylebool: false,
    subCa: null,
    subs: [],
    currenF: null,
    currenS: [],
    page: 0,
    newfibooks: [],
    gebool:true
  },

  getrequire: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      gebool:false
    })
    request({
      url: "https://novel.kele8.cn/category-info",
      data: {
        gender: this.data.gender,
        type: this.data.currenF.lis,
        major: this.data.propid,
        minor: this.data.currenS,
        start: this.data.page,
        limit: 20
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
    }).then((res) => {
      // console.log(res)
      if (this.data.page) {
        // page 不是 0 的时候  就是追加 加载更多
        this.setData({
          newfibooks: [...this.data.newfibooks, ...res.data.books]
        })

      } else {
        // page为0 换了筛选了 直接替换
        this.setData({
          newfibooks: res.data.books
        })
      }
      this.setData({
        gebool:true
      })
      wx.hideLoading()
    })
  },

  // 第一层筛选
  filtertext: function (e) {
    // console.log(e)
    // e.currentTarget.dataset.ftext
    this.setData({
      currenF: e.currentTarget.dataset.ftext,
      page: 0
    }, () => {
      this.getrequire()
    })
  },
  // 第二层筛选
  substext: function (e) {
    // console.log(e)
    // e.currentTarget.dataset.stext
    this.setData({
      currenS: e.currentTarget.dataset.stext,
      page: 0
    }, () => {
      this.getrequire()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      propid: options.id,
      gender: options.gender,
      currenF: this.data.filter[0],
    })
    request({
      url: "https://novel.kele8.cn/sub-categories"
    }).then((res) => {
      // console.log(res)
      this.setData({
        subCa: res.data,
        subs: res.data[options.gender].find((item) => item.major === options.id).mins,
        currenS: res.data[options.gender].find((item) => item.major === options.id).mins[0],
      }, () => {
        this.getrequire()
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
    this.setData({
      page: this.data.page + 1
    }, () => {
      this.getrequire()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})