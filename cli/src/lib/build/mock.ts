import { IBuildContext, IMockOptions } from '../typedefines';
import fs from 'fs';
import path from 'path';
import Writer from  '../fileWriter/mockJSWriter';
import ConfigUtil from '../../config/util';
export default class MockUtil{

  static build(context:IBuildContext){
    const isTS = fs.existsSync(path.join(context.path,'/src/mock/index.ts'));
    const fileName = path.join(context.path,`/src/mock/index.${isTS?'ts':'js'}`);
    const isToCreateMock:boolean = context.cliConfig.mock && context.cliConfig.mock.enabled === true ? true : false;
    const importMockJS = MockUtil.getImportMockJS(context.path);
    const templateFile = ConfigUtil.getMockTemplateFile();
    Writer(null,{
      mockConfig: context.cliConfig.mock,
      templateFile,
      importMockJS,
      isToCreateMock,
      fileName,
      isTS,
      mockFileNames:MockUtil.getMockFileNames(context.path)
    } as IMockOptions)
  }

  static getImportMockJS(appPath:string){
    const dir = path.join(appPath,'node_modules/@lincy-vue/cli/node_modules/mockjs');
    if(fs.existsSync(dir)){
      return '@lincy-vue/cli/node_modules/mockjs';
    }
    return 'mockjs'
  };

  static getMockFileNames(appPath:string){
    const ret:string[] =[];
    const files = fs.readdirSync(path.join(appPath,'src/mock'))
    files.forEach(f=>{
      if((f.slice(-3) ==='.ts' || f.slice(-3) === '.js') && f.split('.')[0].toLowerCase()!=='index'){
        ret.push(f);
      }
    });
    return ret;
  };

}