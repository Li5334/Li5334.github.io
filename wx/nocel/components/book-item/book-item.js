// components/book-item/book-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book:Object,
    rankingbool:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    booksjj:''
  },

  ready:function(){
    var jianjie = this.properties.book.shortIntro.replace(/\s+/g,"")
    this.setData({
      booksjj:jianjie
    })
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
