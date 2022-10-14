import { ICliConfig, IFileMeta, IFileWriterContext } from "../typedefines";

export default class FileWriterContext implements IFileWriterContext{

  #cliConfig:ICliConfig|undefined;
  #inputOptions:any = null;
  #fileMeta:IFileMeta;
  #rootPath:string = '';

  constructor(inputOptions:any,fileMeta:IFileMeta,rootPath:string,cliConfig?:ICliConfig){
    this.#cliConfig = cliConfig;
    this.#inputOptions =inputOptions;
    this.#fileMeta = fileMeta;
    this.#rootPath = rootPath;
  }

  get cliConfig(){
    return this.#cliConfig;
  }
  get inputOptions(){
    return this.#inputOptions;
  }

  get fileMeta(){
    return this.#fileMeta;
  }

  get rootPath(){
    return this.#rootPath;
  }
}
