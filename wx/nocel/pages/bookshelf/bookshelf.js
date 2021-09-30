// pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookshelf:[]
  },

  click:function(e){
    console.log(e);
    // e.currentTarget.dataset.bid
    if(e.detail == 'right'){
      this.setData({
        bookshelf: this.data.bookshelf.filter((item) => item._id !== e.currentTarget.dataset.bid)
      })
      wx.setStorage({
        key: "addbooks",
        data: JSON.stringify(this.data.bookshelf)
      })
    }
  },

  navtodetail: function (event) {
    // console.log(event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/details/details?id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'addbooks',
      success: (res) => {
        // console.log(res)
        this.setData({
          bookshelf: [...JSON.parse(res.data)] || []
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
    // console.log(111)
    wx.getStorage({
      key: 'addbooks',
      success: (res) => {
        // console.log(res)
        this.setData({
          bookshelf: [...JSON.parse(res.data)] || []
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // console.log(222)
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