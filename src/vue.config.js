module.exports = {
  chainWebpack:config=>{
      //发布模式
      config.when(process.env.NODE_ENV === 'production',config=>{
          //entry找到默认的打包入口，调用clear则是删除默认的打包入口
          //add添加新的打包入口
          config.entry('app').clear().add('./src/main-prod.js')
          //使用externals设置排除项
          config.set('externals',{
            vue:'Vue',
            'vue-router':'VueRouter',
            axios:'axios',
            vant:'vant'
            // lodash:'_',
            // echarts:'echarts',
            // nprogress:'NProgress',
            // 'vue-quill-editor':'VueQuillEditor'
        })
        //使用插件
        config.plugin('html').tap(args=>{
          //添加参数isProd
          args[0].isProd = true
          return args
      })
      })
      //开发模式
      config.when(process.env.NODE_ENV === 'development'||process.env.NODE_ENV === 'test',config=>{
          // config.entry('app').clear().add('./src/main-dev.js')
          //使用插件
          config.plugin('html').tap(args=>{
            //添加参数isProd
            args[0].isProd = false
            return args
        })
      })

  },
  configureWebpack: {
    resolve: {
        alias: {
            //配置别名--在这里更改的东西要重启serve
            'assets': '@/assets',
            'common': '@/common',
            'components': '@/components',
            'halfway': '@/halfway',
            'views': '@/views',
            'pluginunit':'@/pluginunit'
        }
    }
},
devServer: {
    host: '192.168.1.100',  //本机电脑 ip 地址
    port: 8080,  //端口号
}
}