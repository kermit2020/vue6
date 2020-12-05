import {$http1} from './axios'

export function getHomeData1(){
  return $http1({
    url:'/home/swiperdata'
  })
} 
export function getHomeData2(){
  return $http1({
    url:'/home/catitems'
  })
} 

