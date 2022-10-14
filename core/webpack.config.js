const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require('webpack');
const fs = require('fs');

const prefix = 'window.__lincy_vue_plugins__';

function readText(pathname) {
  var bin = fs.readFileSync(pathname);

  if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
      bin = bin.slice(3);
  }

  return bin.toString('utf-8');
}

const createScript = ()=>{
  let output = '';
  const files = fs.readdirSync(path.join(__dirname,'./__test__/app/src/locales'));
  let name;
  let content;
  let ext;
  let ret = null;
  files.forEach(f=>{
    name = path.basename(f).split('.')[0];
    ext = path.basename(f).split('.')[1];
    if(ext === 'json'){
      content = readText(path.join(__dirname,'./__test__/app/src/locales',f));
      output =  output + 'window.__lincy_vue__.lang.'+name+ '='+content+';';
    }
  });
  return output;
};

const templateParameters = {
  commonScript:createScript()
};

const getProvidPluginConfig = (options)=>{
  let entryFiles = {};
  let files,name;
  if(options.names && options.path){
    files = fs.readdirSync(path.join(__dirname,options.path));
    files.forEach(f=>{
      name = path.basename(f).split('.')[0];
      if(options.names.includes(name)){
        entryFiles[name] = f;
      }
    })
  }
  const ret = {};
  Object.keys(entryFiles).forEach(k=>{
    ret[prefix+k] = path.resolve(path.join(__dirname,options.path,entryFiles[k]));
  });
  return ret;
};

const providePluginOptions = getProvidPluginConfig({
  path:'./__test__/app/src/plugins',
  names:['http','router','track','app','component']
});


module.exports={
  mode: 'development',
  entry:'./__test__/app/src/app.ts',
  output:{
      path:path.resolve(__dirname,"dist"),
      filename:'bundle.js'
  },
  module: {
      rules: [  // 添加解析规则
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env",{"useBuiltIns": "usage",
              "corejs": {
                "version": 3,
                "proposals": true // 使用尚在“提议”阶段特性的 polyfill
              }}],
              ["@vue/babel-preset-jsx"]
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", {"loose": true}],
              ["@babel/plugin-proposal-object-rest-spread"],
              ["@babel/plugin-transform-runtime", {
                corejs: 3,
              }]
            ]
          }
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env",{"useBuiltIns": "usage",
                "corejs": {
                  "version": 3,
                  "proposals": true // 使用尚在“提议”阶段特性的 polyfill
              }}],
              ["@babel/preset-typescript",{
                allExtensions: true
              }]
            ],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", {"loose": true}],
              ["@babel/plugin-proposal-object-rest-spread"],
              ["@babel/plugin-transform-runtime", {
                corejs: 3,
              }]
            ]
          },
        },
        {
          test:/\.css$/,
          use:[ 
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ]
        },
        {
          test: /\.less$/i,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  strictMath: true,
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]'
          }
        }
      ]
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './__test__/app/index.html',
    inject: 'body',
    templateParameters,
  }),new VueLoaderPlugin(),
  new webpack.ProvidePlugin(providePluginOptions),
  new webpack.DefinePlugin({
    "__DEV__":JSON.stringify(true),
    "__TEST__":JSON.stringify(true),
    "__VERSION__":"'1.0.0'",
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.HotModuleReplacementPlugin({
    // Options...
  })
  ],
  resolve: {   // 需要打包的文件后缀
      extensions: [".ts", ".js",".vue",".json"],
      alias:{
        "@": path.join(__dirname, 'src')
      }
  },
  devServer:{
    compress: true,
    contentBase: path.join(__dirname, '__test__/dist'),
    open: 'Google Chrome',
    port: 8888,
    proxy: {
      '/queryTel': {
          target: 'https://tcc.taobao.com',
          secure: false,
          changeOrigin: true,
          pathRewrite: {'^/queryTel' : '/cc/json/mobile_tel_segment.htm'}
      },
      '/v2ex/test': {
        target: 'https://www.v2ex.com/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {'^/v2ex/test' : '/api/nodes/show.json'}
    },
    }
  },
}　　