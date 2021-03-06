import { $http1, $http2 } from './axios'
//home api
export function getHomeData1() {
  return $http1({
    url: '/home/swiperdata'
  })
}
export function getHomeData2() {
  return $http1({
    url: '/home/catitems'
  })
}
export function getHomeData3() {
  return $http1({
    url: '/home/floordata'
  })
}
//category api
export function getCategoryData1() {
  return $http1({
    url: '/categories'
  })
}
//goods_list api
export function getGoodsListData1(params) {
  return $http1({
    url: '/goods/search',
    params
  })
}
//detail api
export function getDetailData1(params) {
  return $http1({
    url: '/goods/detail',
    params
  })
}
//search api
export function getSearchData1(params) {
  return $http1({
    url: '/goods/qsearch',
    params: { query: params }
  })
}
// let baseURL2 = 'http://81.69.11.115:8888/api/private/v1'
//login api
export function postLoginData1(params) {
  return $http2('/login', params, 'POST')
}
