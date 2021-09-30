// components/relevant-recommend/relevant-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    relevants:Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

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
