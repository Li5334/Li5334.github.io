// pages/index/index.js
// 获取数据库的引用
const db = wx.cloud.database()
// console.log('db',db);
// 获取数据库集合里某一个的引用
const todos = db.collection('todos');
// console.log('todos',todos);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    value: ''
  },

  tapHandler: function () {
    // console.log(123)
    todos.doc('8937eaa9613b3a4d0a62aa10489ff0af').get().then(res => {
      console.log(res.data.tag, res.data._id)
    })
  },
  // 获取多个数据库的数据
  getMore: function () {
    todos.where({}).get().then(res => {
      // console.log(res)
      this.setData({
        todos: res.data
      })
    })
  },

  // 添加其它数据进数据库
  addTodo: function () {
    todos.add({
      data: {
        text: this.data.value,
        completed: false
      }
    }).then(res => {
      // console.log('res',res)
      this.setData({
        value: ''
      })
    })
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