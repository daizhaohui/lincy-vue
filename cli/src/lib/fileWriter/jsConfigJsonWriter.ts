import { IFileWriterContext } from "../typedefines";
import  {writeFromTemplate,isTSFile} from './util';

export default function write(context:IFileWriterContext):void{
  // js工程添加jsconfig.json(vetur插件)
  if(!isTSFile(context)){
    writeFromTemplate(context);
  }
}