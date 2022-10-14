import cheerio from 'cheerio';
import { WebpackConfigEntryName } from '../lib/consts';
import ConfigUtil from '../config/util';
import { ICdnItem } from '../lib/typedefines';
const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlPlugin {

  options:any;

  constructor(options:any){
    this.options = options;
  }

  static GlobalThemesName = '__themes__';
  static themes:any = {};

  getFileName(name:string):string{
    const paths:string[] = name.split('/');
    return paths[paths.length-1];
  }

  isAppCss(href:string):boolean{
    return href.indexOf(`${WebpackConfigEntryName.app}`)!==-1
  }

  createCssCdnUrl(href:string,isTheme?:boolean):string{
    const { cliConfig } = this.options;
    const cdnItem: ICdnItem = ConfigUtil.getCndItem(cliConfig,'css');
    const cssName = this.getFileName(href);
    if(href.indexOf('.css')>0 && ConfigUtil.cdnIsMatch(cdnItem,cssName)===true){
      return `${cdnItem.address}/${cssName}`;
    } else {
      return isTheme ? `theme/${cssName}` : href;
    }
  }

  dealWhenCreateTheme(html:string,themes:string[]){
    const $ = cheerio.load(html);
    let href:string;
    $('link').each((index, item) => {
        href = $(item).attr('href');
        for (const theme of themes) {
            if (href.indexOf(theme) !== -1) {
                if(!HtmlPlugin.themes[theme]){
                  HtmlPlugin.themes[theme] = [];
                }
                HtmlPlugin.themes[theme].push(this.createCssCdnUrl(href,true));
            }
        }
        $(item).remove();
    });
    $('script').each((index:number, item:any) => {
      $(item).remove();
    });
}

  // 处理theme
  extractThemeCss($:any,themes:string[]):void{
    const defaultTheme =this.options.defaultTheme;
    const options = HtmlPlugin.themes;
    const globalThemes:any = {urls:{},current:'',default:defaultTheme,cssUrls:[]};
    // 添加默认主题
    for (const theme of themes) {
      if(!globalThemes.urls[theme]){
        globalThemes.urls[theme] = [];
      }
      if(options[theme]){
        options[theme].forEach((h:string)=>{
          globalThemes.urls[theme].push(h);
        });
      }
      // 默认的皮肤，删除
      if(defaultTheme && theme === defaultTheme){
        if(options[theme]){
          // 删除所有主题css，相关链接保存在window.__themes__中
          $('link').each((index:number, item:any) => {
            const href = $(item).attr('href');
            // 删除非主题css文件
            if(this.isAppCss(href)){
              // 保存以便恢复使用
              const url = this.createCssCdnUrl(href,false);
              // tslint:disable-next-line: no-unused-expression
              globalThemes.cssUrls.indexOf(url)===-1 && globalThemes.cssUrls.push(url);
              $(item).remove();
            }
          });
          options[theme].forEach((h:string)=>{
            $('head').append(`<link href="${h}" rel="stylesheet">`);
          });
          globalThemes.current = defaultTheme;
        }
      } else {
        $('link').each((index:number, item:any) => {
          const href = $(item).attr('href');
          // 保存非主题css文件，以便恢复使用
          if(this.isAppCss(href)){
            const url = this.createCssCdnUrl(href,false);
            // tslint:disable-next-line: no-unused-expression
            globalThemes.cssUrls.indexOf(url)===-1 && globalThemes.cssUrls.push(url);
          }
        });
      }
    }
    // 插入行内js
    $('head').append(`<script>window.${HtmlPlugin.GlobalThemesName}=${JSON.stringify(globalThemes)}</script>`);
  }

  dealWithCssCdnUrl($:any):void{
    const { cliConfig } = this.options;
    const cdnItem = ConfigUtil.getCndItem(cliConfig,'css');
    if(!cdnItem) return;
    $('link').each((index:number, item:any) => {
      let href = $(item).attr('href');
      href = this.createCssCdnUrl(href,!this.isAppCss(href));
      if(href.indexOf('.css')>0 ){
        $(item).attr('href', href);
      }
    });
  }

  dealWithJsCdnUrl($:any):void{
    const { cliConfig } = this.options;
    const cdnItem = ConfigUtil.getCndItem(cliConfig,'js');
    if(!cdnItem) return;
    let jsName;
    $('script').each((index:number, item:any) => {
      let src = $(item).attr('src');
      if(src){
        jsName = this.getFileName(src);
        if(ConfigUtil.cdnIsMatch(cdnItem,jsName)===true){
          src =  `${cdnItem.address}/${jsName}`;
          $(item).attr('src',src);
        }
      }
  });
  }

  apply (compiler:any) {
    const themes = this.options.themes;
    const name = this.options.name;
    // 处理皮肤
    compiler.hooks.compilation.tap('HtmlPlugin', (compilation:any) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlPlugin',
        (data:any, cb:any) => {
          // cdn 地址替换逻辑
          if(name === 'afterCreateTheme'){
            const $ = cheerio.load(data.html);
            if(themes && themes.length){
              this.extractThemeCss($,themes);
            }
            this.dealWithCssCdnUrl($);
            this.dealWithJsCdnUrl($);
            data.html = $.html();
          }
          else if(name==='createTheme'){
            // 皮肤处理逻辑
            if(themes && themes.length){
              this.dealWhenCreateTheme(data.html,themes);
            }
          }
          cb(null, data);
        }
      )
    });
  }
}

module.exports = HtmlPlugin;
