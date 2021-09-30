// pages/details/details.js
const {
  request
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: null,
    show: false,
    comment: [],
    relevant: null,
    moreid: '',
    bookbool: true,
    shujiabook: [],
    boolpl:false,
    value: 3,
    longIntro:''
  },

  // 显示或者隐藏全部简介内容
  upOrdown: function () {
    this.setData({
      show: !this.data.show
    })
  },

  // 跳转到查看更多页面
  navseemore: function () {
    wx.navigateTo({
      url: '/pages/seemore/seemore?id=' + this.data.moreid,
    })
  },
  // 加入书架
  addbooks: function () {
    this.setData({
      bookbool: false
    })
    if (this.data.shujiabook == 0) {
      this.setData({
        shujiabook: [this.data.details]
      })
    } else {
      this.setData({
        shujiabook: [...new Set([...this.data.shujiabook, this.data.details])]
      })
    }
    wx.setStorage({
      key: "addbooks",
      data: JSON.stringify(this.data.shujiabook)
    })
  },
  // 移出书架
  removebooks: function () {
    this.setData({
      bookbool: true
    })

    this.setData({
      shujiabook: this.data.shujiabook.filter((item) => item._id !== this.data.details._id)
    })
    wx.setStorage({
      key: "addbooks",
      data: JSON.stringify(this.data.shujiabook)
    })
  },

  // 点击跳转到阅读页面
  chapters:function(){
    wx.navigateTo({
      url: '/pages/chapters/chapters?id=' + this.data.moreid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(typeof options.id)
    this.setData({
      moreid: options.id
    })
    wx.showLoading({
      title: '加载中',
    })
    request({
      url: "https://novel.kele8.cn/book-info/" + options.id
    }).then((res) => {
      // console.log(res)
      this.setData({
        details: res.data
      },()=>{
        let v = this.data.details.longIntro.replace(/\s+/g,"")
        this.setData({
          longIntro:v
        })

        if(this.data.details.rating.score > 8.5 && this.data.details.rating.score < 9){
          this.setData({
            value:4
          })
        }else if(this.data.details.rating.score >= 9) {
          this.setData({
            value:5
          })
        }
      })
      if(this.data.comment.length >= 1){wx.hideLoading()}

      // 判断有没有加入书架里
      var inext = this.data.shujiabook.findIndex((item) => item._id === this.data.details._id)
      if (inext === -1) {
        this.setData({
          bookbool: true
        })
      } else {
        this.setData({
          bookbool: false
        })
      }
    })
    request({
      url: "https://novel.kele8.cn/book/reviews?book=" + options.id
    }).then((res) => {
      // console.log(res)
      this.setData({
        comment: res.data.reviews.slice(0, 3)
      })
      wx.hideLoading()
    }).catch((res)=>{
      wx.hideLoading()
      this.setData({
        boolpl: true
      })
    })
    request({
      url: "https://novel.kele8.cn/recommend/" + options.id
    }).then((res) => {
      // console.log(res)
      this.setData({
        relevant: res.data
      })
    })

    var that = this;
    wx.getStorage({
      key: 'addbooks',
      success(res) {
        // console.log(res)
        that.setData({
          shujiabook: [...JSON.parse(res.data)] || []
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var inext = this.data.shujiabook.findIndex((item) => item._id === this.data.details._id)

    // console.log(inext)

    // if (inext === -1) {
    //   this.setData({
    //     bookbool: true
    //   })
    // } else {
    //   this.setData({
    //     bookbool: false
    //   })
    // }
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