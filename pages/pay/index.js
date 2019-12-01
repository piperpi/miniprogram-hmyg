// 支持es7的async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
// 引入封装好的获取存储信息到本地存储的js文件
import { getStorageToken, getStorageCart, getStorageAddress } from '../../utils/storage';
// 引入封装好的请求数据的js文件
import { request } from '../../request/index.js';
// 引入封装好的获取收货地址的js文件
import { requestPayment, showToast } from '../../utils/asyncWX';
Page({
  data: {
    // 定义一个空对象存储地址信息
    address: {},
    // 定义购物车列表数据
    cart: {},
    // 定义一个总价
    totalPrice: 0,
    // 定义商品总量
    totalNum: 0
  }, 
  // 页面显示的时候触发
  onShow() {
    // 从本地存储中获取详细地址信息
    // const address = wx.getStorageSync("address") || {};
    const address = getStorageAddress() || {};
    // 从本地存储中获取所有商品信息
    // const cart = wx.getStorageSync("cart") || {};
    const cart = getStorageCart() || {};
    // 把商品信息对象转换成数组
    let cartArr = Object.values(cart);
    // 计算总价格
    let totalPrice = 0;
    // 计算总数量
    let totalNum = 0;
    // 遍历商品数组
    cartArr.forEach(v => {
      if (v.checked) {
        // 设置总价格
        totalPrice += v.num * v.goods_price;
        // 设置总数量
        totalNum += v.num;
      }
    });
    // 把数据重新设置回data中
    this.setData({ address, cart, totalPrice, totalNum });
  },
})