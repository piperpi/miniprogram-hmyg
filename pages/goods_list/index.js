/*
页面动态渲染
2 上滑页面 滚动条触底 加载下一页数据功能
  页面触底事件onReachBottom
  先判断 有没有下一页数据
  当前的页码pagenum 和总页数比较
  总页数=Math.ceil(总条数/页容量)
  当前页码>=总页数 没有下一页 否则就相反
  在 onReachBottom 事件中 判断有没有下一页数据
  有数据pagenum++
  直接发送请求获取数据
  数据回来后 对商品数组进行拼接而不是全部替换
  4下拉刷新
  1 用户往下滑动页面的视乎开启下拉刷新效果
  2 找到下拉刷新事件 onPullDownRefresh
  3 重置
     1 重置页码
     2 重置商品数组 data中的商品数组 进行重置
     3 重新发送请求
     4 数据请求回来后 手动关闭下拉刷新效果
  6  异步请求正在等待效果
     正在等待的小效果 代码怎么写
      放在哪里 比较省事
      1 请求发送前 显示等待效果
      2 请求成功后就关闭
       3 放在request方法中
    7 优化   接口代码用es7  async方式
    1 脚手架工具 把js es6编译成es5 babel 来转
    2 后期学到小程序的第三方框架
      mpvue 自带脚手架工具 就会帮我们编译 es7->es5
      原生小程序代码 没有什么工具帮我们直接编译代码
*/
import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
// pages/goods_list/index.js
Page({
  data: {
    tabs: [
      { id: 0, title: '综合', isActive: true },
      { id: 1, title: '销量', isActive: false },
      { id: 2, title: '价格', isActive: false }
    ],
    //页面要渲染的商品数组
    goodsList: []
  },
  //接口用的参数
  QueryParams: {
    //搜素的关键字
    query: "",
    //分类id
    cid: "",
    //页码
    pagenum: 1,
    //页容量
    pagesize: 10
  },
  //总页数
  TotalPages: 1,
  //页面开始加载时触发
  //它的形参可以获取到url上的参数
  onLoad(options) {
    // console.log(options)
    //接收id并赋值
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query||""
    this.getGoodsList()

  },
  //获取商品列表数据
  async getGoodsList() {
    const result = await request({ url: '/goods/search', data: this.QueryParams })
    this.TotalPages = Math.ceil(result.total / this.QueryParams.pagesize)
    this.setData({
      //要拼接数组 显示全部数据
      goodsList: [...this.data.goodsList, ...result.goods]
    })
    //关闭请求回来后下拉刷新效果
    wx.stopPullDownRefresh()
    // .then(result=>{
    //   console.log(result)
    //   //计算总页数
    //   this.TotalPages=Math.ceil(result.total/this.QueryParams.pagesize)
    //   // console.log(this.TotalPages)
    //   this.setData({
    //     //要拼接数组 显示全部数据
    //     goodsList:[...this.data.goodsList,...result.goods]
    //   })
    //   //关闭请求回来后下拉刷新效果
    //   wx.stopPullDownRefresh()
    // })
  },
  //子组件触发的事件
  handleItemChange(e) {
    // console.log(e)
    //获取传递过来的索引
    const { index } = e.detail
    //获取tabs数组
    let { tabs } = this.data
    //循环修改tabs数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },
  //页面上拉滚动条触底事件
  onReachBottom() {
    //判断有没有下一页数据
    if (this.QueryParams.pagenum >= this.TotalPages) {
      //没有下一页数据
      //弹框提示
      wx.showToast({
        title: '没有下一页',
        icon: "none"
      });

    } else {
      //还存在下一页数据
      // 页面++
      this.QueryParams.pagenum++
      //重新发送请求
      this.getGoodsList()
    }
  },
  //监听用户下拉动作
  onPullDownRefresh() {
    this.QueryParams.pagenum = 1
    this.setData({
      goodsList: []
    })
    this.getGoodsList()
  }

})