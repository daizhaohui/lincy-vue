import { IFileWriterContext, ITemplateDataOptions } from "../typedefines";
import fs from 'fs';
import  {replaceTemplateContent,getTemplateDataOptions} from './util';

export default function write(context:IFileWriterContext):void{
  const data: ITemplateDataOptions = getTemplateDataOptions(context);
  if(data.isTS){
    const content = replaceTemplateContent(context.fileMeta.template + '',data);
    fs.writeFileSync(context.fileMeta.fileName,content);
  }
  
}