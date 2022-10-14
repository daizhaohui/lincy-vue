import { IFileWriterContext, IMockOptions } from "../typedefines";
import fs from 'fs';
import {replaceTemplateContent} from './util';


export default function write(context:IFileWriterContext|null,mockOptions?:IMockOptions):void{
  let content:string ='export default {};\n';
  // 初始化工程
  if(context){
    fs.writeFileSync(context.fileMeta.fileName,content);
  }
  else if(mockOptions){
    if(mockOptions.isToCreateMock){
      const data:any = {};
      data.tsAnyType = mockOptions.isTS ? ':any' : '';
      if(mockOptions.mockFileNames.length>0){
        const mocks:string[] = [];
        let name;
        data.mockTimeout = mockOptions.mockConfig.timeout ?  mockOptions.mockConfig.timeout : '200-600';
        data.imports = {};
        data.importMockJS = mockOptions.importMockJS;
        mockOptions.mockFileNames.forEach(m=>{
          name = m.slice(0,-3).replace('.','_');
          data.imports[name] = `./${m.slice(0,-3)}`;
          mocks.push(name);
        });
        data.mocks = `{${mocks.join(',')}}`;
        content = replaceTemplateContent(mockOptions.templateFile,data);
        fs.writeFileSync(mockOptions.fileName,content);
      }
    }
    else {
      fs.writeFileSync(mockOptions.fileName,content);
    }
  }
}