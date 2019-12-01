//同时发送的ajax的次数
let ajaxTimes=0;
/* 封装*/ 
export const request=(params)=>{
  ajaxTimes++;
  return new Promise((resove,reject)=>{
    //显示加载图标
    wx.showLoading({
      title: '加载中',
    })
    

    const baseUrl="https://api.zbztb.cn/api/public/v1"
   wx.request({
     ...params,
     url:baseUrl+params.url,
     success:(result)=>{
       resove(result.data.message)
     },
     fall:(err)=>{
       reject(err);
     },
     complete:()=>{
      ajaxTimes--;
      if(ajaxTimes===0){
           //关闭正在等待图标
       wx.hideLoading();
      //  console.log(ajaxTimes)
      }
     }
   })
  })
}