// component/mycomponent.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propA:String,
    propB:Array
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
    myTap:function(){
      this.triggerEvent('myMethods', "mycomponent")
    }
  }
})
