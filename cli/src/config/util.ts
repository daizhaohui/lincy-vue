import { Mode } from '../lib/consts';
import { ICliConfig, ICdnItem } from "../lib/typedefines";
import { readJson } from '../lib/utils/read';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const path = require('path');
const fs = require('fs');
export default class ConfigUtil{


  static cdnIsMatch(cdnItem:ICdnItem,name:string):boolean{
    return cdnItem && (cdnItem.match===true || (cdnItem.match && cdnItem.match(name)===true));
  }

  static getCndItem(cliConfig:ICliConfig,type:string):ICdnItem{
    let i;
    const len:number = cliConfig.cdn.length || 0;
    for(i=0;i<len;i++){
      if(cliConfig.cdn[i].type === type){
        return cliConfig.cdn[i];
      }
    }
    return null;
  }

  static createCssUrl(mode:string):string{
    return mode === Mode.Dev ? '[name].css' : '[name].[hash:8].css';
  }

  static createFileRules(options:any):any[]{
    const { mode } = options;

    const getImageAssetFileName = (fileName:string):string=>{
      const paths:string[] = fileName.replace('src/assets/', '').split('/');
      paths.splice(paths.length-1,1);
      if(paths.length>0){
        return mode===Mode.Dev ? `${paths.join('/')}/[name].[ext]` : `${paths.join('/')}/[name].[hash:8][ext]`;
      }else {
        return mode===Mode.Dev ? "images/[name].[ext]" : "images/[name].[hash:8][ext]";
      }
    };

    const createFontUrl = (source:any):string=>{
      return mode===Mode.Dev ? "fonts/[name].[ext]" : "fonts/[name].[hash:8][ext]";
    };

    return [
      {
        test:/\.ico|svg$/,
        type: 'asset/inline'
      },
      {
        test: /\.(jpe?g|png|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: (source:any) => {
            return getImageAssetFileName(source.filename);
          },
        },
      },
      {
        test:/\.ttf|eot|woff2?$/i,
         type:"asset/resource",
         generator:{
           filename: (source:any)=>{
             return createFontUrl(source);
           }
         }
       }
    ]
  }

  // 创建ui库按需加载插件
  static createUILibraryPlugin(options:any):any[]{
    const { isMobile, packageConfig } = options;
    // 按需加载
    if(isMobile && packageConfig.dependencies.vant){
      return [
        [
          "babel-plugin-import",
          {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
          },
          "vant"
        ]
      ];
    } else if(!isMobile && packageConfig.dependencies['ant-design-vue']){
      return [
        [
          "babel-plugin-import",
          {
            libraryName: 'ant-design-vue',
            libraryDirectory: 'es',
            style: true
          },
          "ant-design-vue"
        ]
      ];
    } else if(!isMobile && packageConfig.dependencies['element-plus']){
      return [
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ];
    }
    return [];
  }

  static createJSRule(options:any):any{
    const config:any =  {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ["@babel/preset-env",{"useBuiltIns": "usage", "bugfixes": true,
          "targets": "> 0.25%, not dead",
          corejs: {
            version: 3,
            proposals: true
          }
          }]
        ],
        plugins:[
          ["@vue/babel-plugin-jsx"],
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", {"loose": true}],
          ["@babel/plugin-proposal-private-methods", { "loose": true }],
          ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
          ["@babel/plugin-proposal-object-rest-spread"],
          ["@babel/plugin-transform-runtime", {
            corejs: false
          }]
        ]
      }
    };
    const UIPlugins = ConfigUtil.createUILibraryPlugin(options);
    UIPlugins.forEach(p=>{
      config.options.plugins.push(p);
    });
    return config;
  }

  static createTSRule(options:any):any{
    const config:any = {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ["@babel/preset-env",{"useBuiltIns": "usage", "bugfixes": true,
            "targets": "> 0.25%, not dead",
            corejs: {
              version: 3,
              proposals: true
            }
          }],
          ["@babel/preset-typescript",{
            allExtensions: true
          }]
        ],
        plugins:[
          ["@vue/babel-plugin-jsx"],
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", {"loose": true}],
          ["@babel/plugin-proposal-private-methods", { "loose": true }],
          ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
          ["@babel/plugin-proposal-object-rest-spread"],
          ["@babel/plugin-transform-runtime", {
            corejs: false,
          }]
        ]
      },
    };
    const UIPlugins = ConfigUtil.createUILibraryPlugin(options);
    UIPlugins.forEach(p=>{
      config.options.plugins.push(p);
    });
    return config;
  }

  static createStyleResourcesLoader(options:any):any{
    // compileThemeName 编译的皮肤名称，命令行传入。只编译制定的皮肤
    const { rootPath, theme, compileThemeName } = options;
    let themeLessFile;
    // 只编译选择的皮肤
    if(compileThemeName){
      themeLessFile =  path.join(rootPath, 'src/themes',compileThemeName,'/index.less');
    } else {
      themeLessFile = theme ?  path.join(rootPath, 'src/themes',theme,'/index.less') : null;
    }

    if(themeLessFile && !fs.existsSync(themeLessFile)){
      themeLessFile = null;
    }
    const patterns = [path.join(rootPath, 'src/themes/index.less')];
    if(themeLessFile){
      patterns.push(themeLessFile);
    }
    const rule = {
      loader: 'style-resources-loader',
      options: {
        patterns,
        injector: 'append'
      }
    };
    return rule;
  }

  static createDevCssLessConfig(options:any):any{
      const {mode} = options;
      const modifyVars = ConfigUtil.createModifyVars(options);
      const cssRule =   {
      test:/\.css$/i,
      use:[
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    };
    const lessRule = {
      test: /\.less$/i,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              strictMath: false,
              javascriptEnabled:true,
              modifyVars
            },
          },
        },
      ],
    };

    lessRule.use.push(ConfigUtil.createStyleResourcesLoader(options));

    return {
      cssRule,
      lessRule,
      plugins:[
        new MiniCssExtractPlugin({
          filename: ConfigUtil.createCssUrl(mode)
        })
      ]
    }
  }

  static createProdCssLessConfig(options:any):any{
    const {mode} = options;
    const modifyVars = ConfigUtil.createModifyVars(options);
    const cssRule =  {
      test: /\.css$/i,
      use:[
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader:'postcss-loader',
          options:{
              postcssOptions: {
                plugins: [['postcss-preset-env',{}]]
              }
            }
        }
      ]
    };
    const lessRule =  {
      test: /\.less$/i,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader:'postcss-loader',
          options:{
            postcssOptions: {
              plugins: [['postcss-preset-env',{}]],
            }
          }
        },
        {
          loader: "less-loader",
          options: {
            lessOptions: {
              strictMath: false,
              javascriptEnabled:true,
              modifyVars
            }
          },
        },
      ],
    };

    lessRule.use.push(ConfigUtil.createStyleResourcesLoader(options));

    const plugins = [
      new MiniCssExtractPlugin({
        filename:  ConfigUtil.createCssUrl(mode),
      })
    ]

    return {
      cssRule,
      lessRule,
      plugins
    }

  }

  static createCompressConfig(options:any):any{
    const {cliConfig, mode } = options;
    // 启动压缩算法
    let compress:any = cliConfig.compress;
    if(mode !== Mode.Prod || !compress || !compress.enabled) return null;
    compress= {
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    };
    if(cliConfig.compress.threshold){
      compress.threshold = cliConfig.compress.threshold;
    }
    if(cliConfig.compress.minRatio){
      compress.minRatio = cliConfig.compress.minRatio;
    }
    if(cliConfig.compress.deleteOriginalAssets!==undefined){
      compress.deleteOriginalAssets = cliConfig.compress.deleteOriginalAssets;
    }
    return new CompressionPlugin(compress);
  }

  static getMockTemplateFile(){
    return 'mock.js.art'
  }

  // 所有的样式统一放到一个文件中
  static getOptimizationSplitChunksOfCss(name:string){
    return {
      name,
      type: "css/mini-extract",
      chunks: 'all',
      enforce: true,
    };
  }
  static createAlias(options:any):any{
    const { rootPath, cliConfig, mode } = options;
    const names: string[] = ["@","@vue","vue","vue-i18n"];
      // 别名
    const alias: any = {
      "@": path.join(rootPath, 'src'),
      "@vue": path.join(rootPath, 'node_modules/@vue'),
      "vue": path.join(rootPath, 'node_modules/vue'),
      "vue-i18n": mode === Mode.Dev ? 'vue-i18n/dist/vue-i18n.cjs.js' : 'vue-i18n/dist/vue-i18n.cjs.prod.js',
    };
    if(cliConfig.alias && Object.keys(cliConfig.alias).length){
      Object.keys(cliConfig.alias).forEach(key=>{
        if(!names.includes(key)){
          alias[key] = cliConfig.alias[key];
        }
      });
    }
    return alias;
  }
  // 皮肤目录下的modifyVars.js值覆盖themes/modifyVars.js的值
  static createModifyVars(options:any):any{
    const { rootPath, theme } = options;
    let modifyVars:any = {};
    let fileName = path.join(rootPath,"src/themes/modifyVars.json")
    if(fs.existsSync(fileName)){
      modifyVars = readJson(fileName);
    }
    if(theme){
      fileName = path.join(rootPath, 'src/themes/', theme, 'modifyVars.json');
      if(fs.existsSync(fileName)){
        const themeModifyVars: any =  readJson(fileName);
        Object.keys(themeModifyVars).forEach((key:string)=>{
          modifyVars[key] = themeModifyVars[key];
        });
      }
    }
    return modifyVars;
  }
}