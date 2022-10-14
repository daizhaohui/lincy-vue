import { IFileWriterContext, ITemplateDataOptions } from "../typedefines";
import fs from 'fs';
import  {replaceTemplateContent,getTemplateDataOptions} from './util';


export default function write(context:IFileWriterContext):void{
  const options: ITemplateDataOptions = getTemplateDataOptions(context);
  if(options.isAntDesignVue){
    const data = getTemplateDataOptions(context);
    const content = replaceTemplateContent(context.fileMeta.template + '',data);
    fs.writeFileSync(context.fileMeta.fileName,content);
  }

}