import { IFileWriterContext } from '../typedefines';
import  {replaceTemplateContent,getTemplateDataOptions} from './util';
import fs from 'fs';

export default function write(context:IFileWriterContext):void{
  const data = getTemplateDataOptions(context);
  data.output = '{{ output }}';
  const content =replaceTemplateContent(context.fileMeta.template+'',data);
  fs.writeFileSync(context.fileMeta.fileName,content);
}