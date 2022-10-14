import { ICliConfig, IBuildContext, IInputOptions } from "../typedefines";

export default class BuildContext implements IBuildContext{

  #cliConfig:ICliConfig;
  #inputOptions:IInputOptions;
  #path:string = '';
  #themeConfig:any;
  #packageConfig:any;

  constructor(inputOptions:IInputOptions,cliConfig:ICliConfig,webpackConfig:any,path:string,themeConfig:any,packageConfig:any){
    this.webpackConfig = webpackConfig;
    this.#cliConfig = cliConfig;
    this.#inputOptions =inputOptions;
    this.#path = path;
    this.#themeConfig = themeConfig;
    this.#packageConfig = packageConfig;
  }

  get cliConfig(){
    return this.#cliConfig;
  }
  get inputOptions(){
    return this.#inputOptions;
  }
  get path(){
    return this.#path;
  }

  get themeConfig(){
    return this.#themeConfig;
  }
  get packageConfig(){
    return this.#packageConfig;
  }

  webpackConfig:any;

}