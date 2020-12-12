/* 对请求解构防止耦合,并解决回调函数地狱 */
import axios from 'axios'
import { Toast } from 'vant'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
export function $http1(option) {
  //因为axios上层用了promise封装这里就直接return就可以了,如果没有就需要这样
  //但对于一般程序就是用这个promise封装
  // return new Promise((resolve, reject) => {
  //1.创建axios的实例对象1
  const instance1 = axios.create({
    baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
    timeout: 10000
    // headers: headers 设置请求头
  })
  //2.axios请求拦截器
  instance1.interceptors.request.use(
    config => {
      // Do something before request is sent
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      return config
    },
    error => {
      // Do something with request error
      console.log(error)
      return Promise.reject(error)
    }
  )
  //2.2响应拦截器
  instance1.interceptors.response.use(
    response => {
      // Do something before response is sent
      Toast.clear()
      return response
    },
    error => {
      // Do something with response error
      console.log(error)
      return Promise.reject(error)
    }
  )
  //发出真正的网络请求
  //   instance1(option).then(res=>{
  //     resolve(res)
  //   }).catch(err=>{
  //     reject(err)
  //   })
  //  })
  return instance1(option)
}
//类似放抖操作,计数判断
// let ajaxNum = 0
// export const request = (params) => {
//   //判断url中是否需要带有/my/,带有则是需要token的
//   //自动增加请求头token属性
//   //为防止和新header冲突,解构params,并添加一个属性header
//   let header={...params.header}
//   if(params.url.includes("/my/")){
//     header['Authorization']=wx.setStorageSync("token");

//   }
//   ajaxNum++
//   //弹框提示
//   wx.showLoading({
//     title: '加载中',
//     //蒙版遮盖操作
//     mask:true
//   })

//   //定义公共请求地址url--方便更改接口地址
//   const baseUrl= "https://api-hmugo-web.itheima.net/api/public/v1"
//   return new Promise((resolve, reject) => {
//     wx.request({
//       ...params,
//       header:header,
//       url:baseUrl+params.url,
//       success: (result) => {
//         resolve(result)
//       },
//       fail: (err) => {
//         reject(err)
//       },
//       complete:()=>{
//         ajaxNum--
//         //弹框关闭
//         if(ajaxNum===0){
//           wx.hideLoading()
//         }

//       }
//     });

//   });
// };
//$http2格式为通用简化格式
export function $http2(url, params = {}, type = 'GET') {
  //1.创建axios的实例对象1
  const instance1 = axios.create({
    baseURL: 'http://81.69.11.115:8888/api/private/v1',
    timeout: 10000
    // headers: headers 设置请求头
  })
  //2.axios请求拦截器
  instance1.interceptors.request.use(
    config => {
      // Do something before request is sent
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      return config
    },
    error => {
      // Do something with request error
      console.log(error)
      return Promise.reject(error)
    }
  )
  //2.2响应拦截器
  instance1.interceptors.response.use(
    response => {
      // Do something before response is sent
      Toast.clear()
      return response
    },
    error => {
      // Do something with response error
      console.log(error)
      return Promise.reject(error)
    }
  )
  // 执行异步ajax请求分类
  if (type === 'GET') {
    // 准备url query参数数据
    let dataStr = '' //数据拼接字符串
    Object.keys(params).forEach(key => {
      dataStr += key + '=' + params[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    // 发送get请求 因为是内置promise所以直接return即可
    return instance1.get(url)
  } else {
    //3.发出真正的网络请求
    // 发送post请求
    return instance1.post(url, params).then(res=>res.data)
  }
  // promise
  //   .then(function(response) {
  //     // 成功了调用resolve()返回的数据类结构 如res.data
  //     resolve(response)
  //   })
  //   .catch(function(error) {
  //     //失败了调用reject()
  //     reject(error)
  //   })

  //3.发出真正的网络请求
  //   instance1(option).then(res=>{
  //     resolve(res)
  //   }).catch(err=>{
  //     reject(err)
  //   })
  //  })
  // return instance1(url, (params = {}), type)
}
//$http2 是对$http3的简化
export function $http3(url, params = {}, type = 'GET') {
  //因为axios上层用了promise封装这里就直接return就可以了,如果没有就需要这样
  //但对于一般程序就是用这个promise封装
  return new Promise((resolve, reject) => {
    //1.创建axios的实例对象1
    const instance1 = axios.create({
      baseURL: 'http://81.69.11.115:8888/api/private/v1',
      timeout: 10000
      // headers: headers 设置请求头
    })
    //2.axios请求拦截器
    instance1.interceptors.request.use(
      config => {
        // Do something before request is sent
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner'
        })
        return config
      },
      error => {
        // Do something with request error
        console.log(error)
        return Promise.reject(error)
      }
    )
    // 执行异步ajax请求
    let promise
    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = '' //数据拼接字符串
      Object.keys(params).forEach(key => {
        dataStr += key + '=' + params[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url)
    } else {
      // 发送post请求
      promise = axios.post(url, params)
    }
    promise
      .then(function(response) {
        // 成功了调用resolve()返回的数据类结构 如res.data
        resolve(response)
      })
      .catch(function(error) {
        //失败了调用reject()
        reject(error)
      })

    //2.2响应拦截器
    instance1.interceptors.response.use(
      response => {
        // Do something before response is sent
        Toast.clear()
        return response
      },
      error => {
        // Do something with response error
        console.log(error)
        return Promise.reject(error)
      }
    )
    //3.发出真正的网络请求
    //   instance1(option).then(res=>{
    //     resolve(res)
    //   }).catch(err=>{
    //     reject(err)
    //   })
    //  })
    // return instance1(url, (params = {}), type)
  })
}
