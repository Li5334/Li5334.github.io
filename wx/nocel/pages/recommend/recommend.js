// pages/recommend/recommend.js
const {
  request
} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 'male',
    recommend: {
      male: [],
      female: []
    },
    extraClasses: '',
    banners: {
      male: [{
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20210209/d55ce1e6f7584005820dff309b388917.png",
        },
        {
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20210209/d57b17f1f3f7478ba1879fb631005e1a.jpg",
        },
        {
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20201218/12ddcc817cdf49f787959bb53e21b584.png",
        },
      ],
      female: [{
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20210209/2b5e4d4b08d9479db00720a486444994.jpg",
        },
        {
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20201204/c48aa5482db346e9837df790c6cf6116.jpg",
        },
        {
          bookid: "",
          url: "http://plf-new.zhuishushenqi.com/management/images/20201127/2b8b5e6886ba472c9d6baea14de138b4.png",
        },
      ],
    },
  },

  navindex: function (e) {
    // console.log(e.currentTarget.dataset.index)
    if (this.data.gender == 'male') {
      switch (e.currentTarget.dataset.index) {
        case 0:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '50a0520aea1ebb6f5b00018e',
          })
          break;
        case 1:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '59cf9ab8dc09310a3798d2e8',
          })
          break;
        case 2:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '536da71c88844484410104a3',
          })
          break;
      }
    }else {
      switch (e.currentTarget.dataset.index) {
        case 0:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '5ced0da7035a4416960dca67',
          })
          break;
        case 1:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '5c75017ffbbc9854793998c2',
          })
          break;
        case 2:
          wx.navigateTo({
            url: '/pages/details/details?id=' + '5ee198afc045c331443b18d8',
          })
          break;
      }
    }
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

  // 获取书本
  getDataByGender: function (gender) {
    wx.showLoading({
      title: '加载中',
    })
    if (gender === "male" && !this.data.recommend.male.lenght) {
      this.getHomeMale().then(res => {
        // console.log(res)
        this.setData({
          "recommend.male": res.map((item) => item.data.ranking)
        })
        wx.hideLoading()
      })
    } else if (gender === "female" && !this.data.recommend.male.lenght) {
      this.getHomeFemale().then(res => {
        this.setData({
          "recommend.female": res.map((item) => item.data.ranking)
        })
        wx.hideLoading()
      })
    }
  },

  // 点击事件切换gender的值
  changeGender: function (event) {
    this.setData({
      gender: event.currentTarget.dataset.gender || 'male'
    })
    // 获取对应频道的书本
    this.getDataByGender(event.currentTarget.dataset.gender || 'male')
    // 判断是否为male，显示对应过度效果
    if (event.currentTarget.dataset.gender == 'male') {
      this.maleTransition()
    } else {
      this.femaleTransition()
    }
  },
  // 男生频道
  getHomeMale: function () {
    return Promise.all([
      request({
        url: "https://novel.kele8.cn/rank/564d8494fe996c25652644d2"
      }),
      request({
        url: "https://novel.kele8.cn/rank/564eea0b731ade4d6c509493"
      }),
      request({
        url: "https://novel.kele8.cn/rank/564eeeabed24953671f2a577"
      })
    ]);
  },

  // 女生频道
  getHomeFemale: function () {
    return Promise.all([
      request({
        url: "https://novel.kele8.cn/rank/564d85b6dd2bd1ec660ea8e2"
      }),
      request({
        url: "https://novel.kele8.cn/rank/564eeae6c3345baa6bf06e38"
      }),
      request({
        url: "https://novel.kele8.cn/rank/564eeeca5e6ba6ae074f10ec"
      })
    ]);
  },

  pagesearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // request({
    //   url: 'https://api.kele8.cn'
    // }).then((res) => console.log(res))
    this.setData({
      gender: options.gender || 'male'
    })
    var gender = options.gender || 'male'
    this.getDataByGender(gender)
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