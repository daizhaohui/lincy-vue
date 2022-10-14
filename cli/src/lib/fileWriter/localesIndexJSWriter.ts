import { IFileWriterContext } from "../typedefines";
import fs from 'fs';

export default function write(context:IFileWriterContext|null,multiLang?:any):void{
  let fileName;
  // 多语言
  if(multiLang && multiLang.items.length){
    fileName = multiLang.fileName;
    const importOutput:string[] = [];
    const valueOutput:string[] =[];
    multiLang.items.forEach((item:string)=>{
      importOutput.push(`import ${item} from "./${item}.json";`);
      valueOutput.push(item);
    });
    const current = multiLang.items.length === 1 ? multiLang.items[0] : '';
    const output = `/* eslint-disable camelcase */\n${importOutput.join('\n')}\n\nconst langs = {${valueOutput.join(',')}};\nwindow.__lincy_vue__.lang ={items:langs,current:'${current}'};\n\nexport default langs;\n`;
    fs.writeFileSync(fileName,output);
  }
  // 初始化:str
  else {
    if(context){
      fs.writeFileSync(context.fileMeta.fileName,'export default {};\n');
    }
  }
}