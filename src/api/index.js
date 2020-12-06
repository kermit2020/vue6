import { $http1 } from './axios'
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
