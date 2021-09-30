// pages/chapters/chapters.js
const {
  request
} = require('../../utils/util.js')
// var cs = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionsId: '',
    chapters: [],
    chclass: '',
    offoron: false,
    reversed: false,
    cs: [],
    page: 0,
    con: null,
    num: 1,
    fontsize: 14,
    stylergb: '',
    topstyle: 1
  },

  // 控制台显示与隐藏
  tapshow: function () {
    if (this.data.chclass == 'po-tran po-bottom') {
      this.setData({
        chclass: 'po-tran'
      })
    } else {
      this.setData({
        chclass: 'po-tran po-bottom'
      })
    }
  },

  // 打开目录
  catalogue: function () {
    if (this.data.chapters.length == 0) {
      wx.showLoading({
        title: '加载中',
      })
    } else {
      wx.hideLoading()
    }
    setTimeout(() => {
      if (this.data.chapters.length >= 1) {
        wx.hideLoading()
      }
      this.setData({
        offoron: true
      })
    }, 500)
    this.tapshow()
  },
  catalogue2: function () {
    this.setData({
      offoron: true
    })
  },

  // 关闭目录
  choff: function () {
    this.setData({
      offoron: false
    })
  },

  // 正序倒序
  reverse: function () {
    this.setData({
      chapters: this.data.cs && this.data.cs.reverse().slice(0, 100),
      reversed: !this.data.reversed
    })
  },

  // 获取章节内容
  getchapter: function (n) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://novel.kele8.cn/chapters2/56a8303e2aefdf397cbbf831/' + n,
      success: (res) => {
        this.setData({
          con: {
            ...res.data,
            cpContent: res.data.cpContent.replaceAll('<p>', '<p class="psf" style="text-indent: 2em;font-size:' + this.data.fontsize + 'px;">')
          }
        }, () => {
          this.goTop()
        })
        wx.hideLoading()
      }
    })
  },

  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },

  // 章节点击获取相应的章节
  order: function (event) {
    // console.log(event.currentTarget.dataset.order)
    this.getchapter(event.currentTarget.dataset.order)
    this.setData({
      offoron: false,
      num: event.currentTarget.dataset.order
    }, () => {
      var zj = {
        num: this.data.num
      }
      wx.setStorage({
        key: this.data.optionsId,
        data: JSON.stringify(zj)
      })
    })
  },

  // 下一章节
  nextchapter: function () {
    console.log(111)
    if (this.data.num >= 1 && this.data.num < this.data.chapters.length) {
      this.setData({
        num: this.data.num + 1
      }, () => {
        var zj = {
          num: this.data.num
        }
        wx.setStorage({
          key: this.data.optionsId,
          data: JSON.stringify(zj)
        })
        // this.goTop()
      })
      this.getchapter(this.data.num)
    } else {
      this.setData({
        num: this.data.num
      }, () => {
        var zj = {
          num: this.data.num
        }
        wx.setStorage({
          key: this.data.optionsId,
          data: JSON.stringify(zj)
        })
      })
      this.getchapter(this.data.num)
    }
  },
  nextchapter2: function () {
    this.nextchapter()
    this.tapshow()
  },
  // 上一章节
  previouschapter: function () {
    if (this.data.num == 1) {
      this.setData({
        num: 1
      }, () => {
        var zj = {
          num: this.data.num
        }
        wx.setStorage({
          key: this.data.optionsId,
          data: JSON.stringify(zj)
        })
      })
      this.getchapter(this.data.num)
    } else {
      this.setData({
        num: this.data.num - 1
      }, () => {
        var zj = {
          num: this.data.num
        }
        wx.setStorage({
          key: this.data.optionsId,
          data: JSON.stringify(zj)
        })
      })
      this.getchapter(this.data.num)
    }
  },
  previouschapter2: function () {
    this.previouschapter()
    this.tapshow()
  },

  // 加大字体
  enlarge: function () {
    this.setData({
      fontsize: this.data.fontsize + 2
    }, () => {
      if (this.data.fontsize >= 20) {
        this.setData({
          fontsize: 20
        })
      }
      var fs = '<p class="psf" style="text-indent: 2em;font-size:' + (this.data.fontsize - 2) + 'px;">';
      this.setData({
        ['con.cpContent']: this.data.con.cpContent.replaceAll(fs, '<p class="psf" style="text-indent: 2em;font-size:' + this.data.fontsize + 'px;">')
      })

      var objs = {
        stylergb: this.data.stylergb,
        topstyle: this.data.topstyle,
        fontsize: this.data.fontsize
      }
      wx.setStorage({
        key: "backcolor",
        data: JSON.stringify(objs)
      })
    })
  },
  // 减小字体
  reduce: function () {
    if (this.data.fontsize > 12) {
      this.setData({
        fontsize: this.data.fontsize - 2
      }, () => {
        var fs = '<p class="psf" style="text-indent: 2em;font-size:' + (this.data.fontsize + 2) + 'px;">';
        this.setData({
          ['con.cpContent']: this.data.con.cpContent.replaceAll(fs, '<p class="psf" style="text-indent: 2em;font-size:' + this.data.fontsize + 'px;">')
        })

        var objs = {
          stylergb: this.data.stylergb,
          topstyle: this.data.topstyle,
          fontsize: this.data.fontsize
        }
        wx.setStorage({
          key: "backcolor",
          data: JSON.stringify(objs)
        })
      })
    }
  },

  // 换成默认色
  rgb: function () {
    this.setData({
      stylergb: 'pages',
      topstyle: 1
    }, () => {
      var objs = {
        stylergb: this.data.stylergb,
        topstyle: this.data.topstyle,
        fontsize: this.data.fontsize
      }
      wx.setStorage({
        key: "backcolor",
        data: JSON.stringify(objs)
      })
    })
  },
  // 换成黑色
  rgbblack: function () {
    this.setData({
      stylergb: 'pageblack',
      topstyle: 2
    }, () => {
      var objs = {
        stylergb: this.data.stylergb,
        topstyle: this.data.topstyle,
        fontsize: this.data.fontsize
      }
      wx.setStorage({
        key: "backcolor",
        data: JSON.stringify(objs)
      })
    })
  },
  // 换成绿色
  rgbgreen: function () {
    this.setData({
      stylergb: 'pagegreen',
      topstyle: 3
    }, () => {
      var objs = {
        stylergb: this.data.stylergb,
        topstyle: this.data.topstyle,
        fontsize: this.data.fontsize
      }
      wx.setStorage({
        key: "backcolor",
        data: JSON.stringify(objs)
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#b9e1bf'
    })
    this.setData({
      optionsId: options.id
    })
    // 获取章节列表
    request({
      url: "https://novel.kele8.cn/book-sources?view=summary&book=" + options.id
    }).then((res) => {
      // console.log(res)
      var sourceId = res.data[0]._id
      request({
        url: "https://novel.kele8.cn/book-chapters/" + sourceId
      }).then((res2) => {
        // console.log(res2)
        this.setData({
          cs: res2.data.chapters
        })
        this.setData({
          chapters: this.data.cs.slice(0, 100)
        })
        wx.hideLoading()
      })
    })

    // this.rgb()
    wx.getStorage({
      key: 'backcolor',
      success: (res) => {
        // console.log(JSON.parse(res.data).stylergb)
        this.setData({
          stylergb: JSON.parse(res.data).stylergb,
          topstyle: JSON.parse(res.data).topstyle,
          fontsize: JSON.parse(res.data).fontsize
        })
      }
    })
    wx.getStorage({
      key: options.id,
      success: (res) => {
        // console.log(JSON.parse(res.data).stylergb)
        this.setData({
          num: JSON.parse(res.data).num,
        }, () => {
          this.getchapter(this.data.num)
        })
      },
      fail: (err) => {
        this.getchapter(this.data.num)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      chapters: this.data.cs.slice(0, 100)
    })
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
    // console.log(212)
    this.setData({
      page: this.data.page + 1
    })
    setTimeout(() => {
      this.setData({
        chapters: [...this.data.chapters, ...this.data.cs.slice(this.data.page * 100, (this.data.page + 1) * 100)]
      })
    }, 200)
    // console.log(this.data.page)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})