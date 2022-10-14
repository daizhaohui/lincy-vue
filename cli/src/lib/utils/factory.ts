import { ICreateContext,IBuildContext,IFileWriterContext} from "../typedefines";
import CreateContext from '../create/createContext';
import BuildContext from '../build/buildContext';
import FileWriterContext from '../fileWriter/fileWriterContext';


export function createInstance<T>(K:new(...args: any[])=>T,...rest: any[]):T{
  return new K(...rest);
}

export function createCreateContext(...args:any[]):ICreateContext{
  return createInstance<ICreateContext>(CreateContext,...args);
}


export function  createBuildContext(...args:any[]):IBuildContext{
  return createInstance<IBuildContext>(BuildContext,...args);
}

export function createFileWriterContext(...args:any[]):IFileWriterContext{
  return createInstance<IFileWriterContext>(FileWriterContext,...args);
}
