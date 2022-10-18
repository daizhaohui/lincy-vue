import { IFileWriterContext, ICreateContext } from "../typedefines";
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import { HtmlTemplate } from '../consts';
import {createFileWriterContext} from '../utils/factory';
import HtmlTemplateUtil from '../utils/htmlTemplate';
import UIUtil from '../utils/ui';
import {getRealFileName} from '../fileWriter/util';

const PromptList = [
  {
    type: 'input',
    message: '请输入工程名称:',
    name: 'projectName',
  },
  {
    type: 'list',
    message: '请选择html模板:',
    name: 'template',
    choices:HtmlTemplateUtil.getAllTemplateNames(),
    filter: (val:string)=> { // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  },{
    type: 'list',
    message: '请选择UI库:',
    name: 'ui',
    choices: UIUtil.getDesktopUI()
  },{
    type: 'list',
    message: '请选择UI库:',
    name: 'ui',
    choices:  UIUtil.getMobileUI()
  }
];

export default class InitProject{

  #context:ICreateContext;

  constructor(context:ICreateContext){
    this.#context = context;
  }

  createDirectories(dir:string){
    const root = path.join(this.#context.path,dir);
    if(!fs.existsSync(root)){
      fs.mkdirSync(root);
    }
    this.#context.projectMeta.dirs.forEach((item:string)=>{
      const d = path.join(root,item);
      if(!fs.existsSync(d)){
        fs.mkdirSync(d);
      }
    });
  }

  createFiles(){
    let context:IFileWriterContext;
    const rootPath = path.join(this.#context.path,this.#context.inputOptions.projectName+'');
    let fileName;
    this.#context.projectMeta.files.forEach((f)=>{
      context = createFileWriterContext(this.#context.inputOptions,f,rootPath);
      fileName = getRealFileName(context);
      context.fileMeta.fileName = fileName;
      if(!fs.existsSync(fileName) || f.override){
        f.writer(context);
      }
    });
  }

  createProject(){
    // 创建目录结构
    this.createDirectories(this.#context.inputOptions.projectName+'');
    // 创建文件
    this.createFiles();
  }

  toSelectUILibrary(selected:any){
    if(selected.template===HtmlTemplate.Mobile){
      inquirer.prompt([PromptList[3]]).then((answers:any)=>{
        Object.assign(this.#context.inputOptions,selected,answers);
        this.createProject();
      });
     } else {
      inquirer.prompt([PromptList[2]]).then((answers:any)=>{
        Object.assign(this.#context.inputOptions,selected,answers);
        this.createProject();
      });
     }
  }

  run(){
    const selected :any = {};
    selected.projectName = this.#context.inputOptions.projectName;
    // 没有输入工程名
    if(this.#context.inputOptions.projectName===''){
      inquirer.prompt([PromptList[0],PromptList[1]]).then(answers => {
         Object.assign(selected,answers);
         this.toSelectUILibrary(selected);
      });
    } else {
      inquirer.prompt([PromptList[1]]).then(answers => {
        Object.assign(selected,answers);
        this.toSelectUILibrary(selected);
     });
    }
  }


}