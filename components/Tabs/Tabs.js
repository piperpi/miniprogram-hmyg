// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   tabs:{
     //数据类型
     type:Array,
     //默认值
     value:[]
   }
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
    //点击切换
    handleItemChange(e){
      //  console.log(e)
       const {index}=e.currentTarget.dataset
      //  要触发父组件的自定义事件
      this.triggerEvent('itemChange',{index})
    }
  }
})
