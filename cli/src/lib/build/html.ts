import { IBuildContext } from '../typedefines';
import HtmlTemplateUtil from '../utils/htmlTemplate';
import CommonScript  from './commonScript';
import path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');

export default class HtmlUtil{

  #context:IBuildContext = null;

  constructor(context:IBuildContext){
    this.#context = context;
  }

  createHtmlPlugin(){
    const templateName = HtmlTemplateUtil.getTemplateFile(this.#context.inputOptions.template+'');
    const templateParameters = {
      headers:'',
      bodys:'',
      commonScript: new CommonScript(this.#context).create()
    };
    const headers:string[] = [];
    const bodys: string[] = [];
    if(this.#context.cliConfig.injects){
      this.#context.cliConfig.injects.forEach(item=>{
        if(item.position === 'header'){
          headers.push(item.content);
        }
        else if(item.position === 'body'){
          bodys.push(item.content);
        }
      });
      if(headers.length>0){
        templateParameters["headers"] = headers.join('\n');
      }
      if(bodys.length>0){
        templateParameters["bodys"] = bodys.join('\n');
      }
    }
    const options = {
      filename:'index.html',
      inject: 'body',
      template: path.join(__dirname,'../../templates',templateName),
      templateParameters
    };
    this.#context.webpackConfig.plugins.push(new HtmlWebpackPlugin(options));
  }


}