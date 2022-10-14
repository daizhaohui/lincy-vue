调试代码
  1.进入core根目录
  2.npm install
  3.npm run test 
  4.__test__/app目录为运行的h5页面, 通过webpack构建运行,webpack配置文件为core/webpack.config.js

构建发布版本包
  1.进入core根目录
  2.修改发布包的版本号：dis/package.json版本号
  3.npm run build
  4.构建产物放在dist目录下
  5.提交npm包到npm包服务器（暂无）
