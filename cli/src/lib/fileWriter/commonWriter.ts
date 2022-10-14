import { IFileWriterContext } from "../typedefines";
import fs from 'fs';
import  {replaceTemplateContent,getTemplateDataOptions} from './util';

export default function write(context:IFileWriterContext):void{
  const data = getTemplateDataOptions(context);
  const content = replaceTemplateContent(context.fileMeta.template + '',data);
  fs.writeFileSync(context.fileMeta.fileName,content);
}