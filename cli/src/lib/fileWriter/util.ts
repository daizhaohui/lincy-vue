import { IFileWriterContext, ITemplateDataOptions } from "../typedefines";
import fs from 'fs';
import path from 'path';
import template from 'art-template';
import { HtmlTemplate, Language, UILibrary } from "../consts";

export function isAntDesignVue(context:IFileWriterContext):boolean{
  return context.inputOptions.ui === UILibrary.AntDesignVue;
}

export function isElementUI(context:IFileWriterContext):boolean{
  return context.inputOptions.ui === UILibrary.ElementUI;
}

export function isVant(context:IFileWriterContext):boolean{
  return context.inputOptions.ui === UILibrary.Vant;
}

export function setDataOfUILibrary(data:any,context:IFileWriterContext):any{
  data.uiLibrary = context.inputOptions.ui || '';
  if(isAntDesignVue(context)){
    data.isAntDesignVue = true;
  }
  else if(isElementUI(context)){
    data.isElementUI = true;
  }
  else if(isVant(context)){
    data.isVant = true;
  }
}


export function isTSFile(context:IFileWriterContext):boolean{
  return context.inputOptions.program as string === Language.TypeScript;
}

export function getTemplateDataOptions(context:IFileWriterContext):ITemplateDataOptions | null{
  const data:any = {};
  setDataOfUILibrary(data,context);
  // ts或js引用不同的包
  data.isTS = context.inputOptions.program === Language.TypeScript;
  // html模板
  data.isMobile = context.inputOptions.template === HtmlTemplate.Mobile;
  data.projectName = context.inputOptions.projectName;
  return data as ITemplateDataOptions;
}


export function getRealFileName(context:IFileWriterContext):string{
  let fileName = path.join(context.rootPath,context.fileMeta.fileName);
  const isTS:boolean = isTSFile(context);
  if(context.fileMeta.type === 'js|ts'){
    fileName = fileName.replace('.*',isTS ? '.ts' : '.js');
  }
  return fileName;
}

export function writeContent(context:IFileWriterContext,content:string){
  fs.writeFileSync(context.fileMeta.fileName,content+'');
}

export function getTemplateContent(templateName:string):string{
  const fileName = path.join(__dirname,'../../templates/',templateName);
  return fs.readFileSync(fileName).toString();
}

export function replaceTemplateContent(templateName:string,data:any):string{
  const fileName = path.join(__dirname,'../../templates/',templateName);
  const content = template(fileName,data);
  return content;
}

export function getTemplateFilePath(templateName:string):string{
  return  path.join(__dirname,'../../templates/',templateName);
}

export function writeFromTemplate(context:IFileWriterContext,data?:any):void{
  const content = replaceTemplateContent(context.fileMeta.template + '',data?data:{});
  fs.writeFileSync(context.fileMeta.fileName,content);
}