// components/book2-item/book2-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    rankingbool: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    num:0
  },

  lifetimes: ({
    attached:function() {
      wx.getStorage({
        key: this.properties.book._id,
        success: (res) => {
          console.log(JSON.parse(res.data))
          this.setData({
            num: JSON.parse(res.data).num,
          })
        }
      })
    }
  }),

  pageLifetimes:({
    show: function() {
      // 页面被展示
      wx.getStorage({
        key: this.properties.book._id,
        success: (res) => {
          console.log(JSON.parse(res.data))
          this.setData({
            num: JSON.parse(res.data).num,
          })
        }
      })
    },
  }),


  /**
   * 组件的方法列表
   */
  methods: {
    navtodetail: function (event) {
      // console.log(event.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/details/details?id=' + event.currentTarget.dataset.id,
      })
    }
  }
})