// components/top-bar/top-bar.js
Component({
  options: {
    styleIsolation: 'shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    topstyle:Number
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  // lifetimes: {
  //   attached: function() {
  //     // 在组件实例进入页面节点树时执行
  //     wx.setNavigationBarColor({
  //       frontColor: '#ffffff',
  //       backgroundColor: '#B9E1BF',
  //       success:(res)=>{
  //         console.log(res)
  //       },
  //       fail:(res2)=>{
  //         console.log(res2)
  //       }
  //     })
  //   },
  //   detached: function() {
  //     // 在组件实例被从页面节点树移除时执行
  //   },
  // },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickLeft: function () {
      wx.navigateBack({
        delta: 0,
      })
    }
  }
})
