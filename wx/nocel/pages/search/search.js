// pages/search/search.js
const {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    hotwords: [],
    hotbooks: [],
    newbooks: [],
    bool: true,
    searchbooks: [],
    storageitem: [],
  },

  getRandom: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  // 内容输入时搜索
  change: function (event) {
    // console.log(event.detail)
    // event.detail
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: "https://novel.kele8.cn/search?keyword=" + event.detail 
    }).then((res) => {
      // console.log(res)
      this.setData({
        searchbooks: res.data.books
      })
      wx.hideLoading()
    })
  },

  // 按下确定时跳转页面
  searchenter: function (event) {
    // console.log(event.detail)

    if (this.data.value) {
      wx.navigateTo({
        url: '/pages/relevant/relevant?id=' + event.detail,
      })
    }

    this.setData({
      value:''
    })

    if (this.data.storageitem == 0) {
      this.setData({
        storageitem: [event.detail]
      })
    } else {
      this.setData({
        storageitem: [...new Set([...this.data.storageitem, event.detail])]
      })
    }

    wx.setStorage({
      key: "storageitem",
      data: JSON.stringify(this.data.storageitem)
    })
  },

  // 换一换功能
  changereplay: function () {
    this.setData({
      bool: false
    })
    for (var i = 1; i < 5; i++) {
      var randomIndex = this.getRandom(0, this.data.hotwords.length - 1)
      this.setData({
        newbooks: [...this.data.newbooks, this.data.hotwords[randomIndex]]
      })
      this.data.hotwords.slice(randomIndex, 1)
    }
    if (this.data.newbooks.length >= 8) {
      this.setData({
        newbooks: this.data.newbooks.slice(4, 8)
      })
    }
  },

  // 获取搜索时显示出来的书籍名
  searchbook: function (event) {
    // console.log(event.target.dataset.test)
    wx.navigateTo({
      url: '/pages/relevant/relevant?id=' + event.target.dataset.test,
    })

    this.setData({
      value:''
    })

    if (this.data.storageitem == 0) {
      this.setData({
        storageitem: [event.target.dataset.test]
      })
    } else {
      this.setData({
        storageitem: [...new Set([...this.data.storageitem, event.target.dataset.test])]
      })
    }
    wx.setStorage({
      key: "storageitem",
      data: JSON.stringify(this.data.storageitem)
    })
  },

  // 点击热门搜索时
  hotsbook: function (event) {
    // console.log(event)
    wx.navigateTo({
      url: '/pages/relevant/relevant?id=' + event.target.dataset.txt,
    })

    if (this.data.storageitem == 0) {
      this.setData({
        storageitem: [event.target.dataset.txt]
      })
    } else {
      this.setData({
        storageitem: [...new Set([...this.data.storageitem, event.target.dataset.txt])]
      })
    }
    wx.setStorage({
      key: "storageitem",
      data: JSON.stringify(this.data.storageitem)
    })
  },

  // 点击搜索历史
  storseach:function(event) {
    wx.navigateTo({
      url: '/pages/relevant/relevant?id=' + event.target.dataset.storageitems,
    })
    if (this.data.storageitem == 0) {
      this.setData({
        storageitem: [event.target.dataset.storageitems]
      })
    } else {
      this.setData({
        storageitem: [...new Set([...this.data.storageitem, event.target.dataset.storageitems])]
      })
    }
    wx.setStorage({
      key: "storageitem",
      data: JSON.stringify(this.data.storageitem)
    })
  },

  // 清空历史记录
  delestorage: function () {
    wx.clearStorage()
    this.setData({
      storageitem: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    // 创建获取最热的四本书
    request({
      url: "https://novel.kele8.cn/search-hotwords"
    }).then((res) => {
      // console.log(res)
      this.setData({
        hotwords: res.data.searchHotWords
      })
      wx.hideLoading()
    })
    // 获取热搜的关键词100个
    request({
      url: "https://novel.kele8.cn/hot-books"
    }).then((res) => {
      // console.log(res)
      this.setData({
        hotbooks: res.data.hotWords
      })
    })

    var that = this;
    wx.getStorage({
      key: 'storageitem',
      success(res) {
        // console.log(res)
        that.setData({
          storageitem: [...JSON.parse(res.data)] || []
        })
      }
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