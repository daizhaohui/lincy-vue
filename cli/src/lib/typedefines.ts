export type FileWriterFunc = (context:IFileWriterContext)=>void;
export type DayjsConfig = {
  plugins:string[],
  locale:string[]
}

export type DelExclude= (fileName:string)=>boolean;

export interface KeyValues{
  [key:string]: any;
}

export type MockConfig = {
  enabled:boolean,
  timeout:string
}

export type ThemeConfig = {
  enabled:boolean,
  default:string
}

export interface ITemplateDataOptions{
  isTS:boolean;
  isMobile:boolean;
  projectName:string;
  isAntDesignVue:boolean;
  isElementUI:boolean;
  isVant:boolean;
  output?:string;
  content?:string;
}


export type  CompressConfig = {
  enabled: boolean,
  threshold: number,
  minRatio: number,
  deleteOriginalAssets: boolean
}

export interface IMockOptions{
  templateFile:string,
  importMockJS:string,
  isToCreateMock:boolean,
  fileName:string,
  mockFileNames:string[],
  isTS:boolean,
  mockConfig:MockConfig
}
export interface IInputOptions{
  projectName?:string;
  ui?:string|boolean;
  // 编程语言
  program?:string;
  template?:string;
  mode?:string;
  startServer:boolean;
  // 语言
  language:string;
}

export interface IProjectMeta{
  files:IFileMeta[],
  dirs:string[]
}

export interface IFileMeta{
  type:string;
  fileName:string;
  writer:FileWriterFunc;
  template?:string;
  override:boolean;
}

export interface IFileWriterContext{
  readonly fileMeta:IFileMeta;
  readonly inputOptions:IInputOptions;
  readonly cliConfig?:ICliConfig;
  readonly rootPath:string;
}

export interface IInjectToHtml{
  content:string,
  position:string
}

// cli配置文件
export interface ICliConfig {
  plugins:[];
  rules:[];
  devServer:KeyValues;
  compress:CompressConfig;
  injects:IInjectToHtml[];
  splitChunks:KeyValues;
  mock:MockConfig;
  theme:ThemeConfig;
  cdn: ICdnItem[];
  designPx:number;
  defines:KeyValues;
}


// 创建工程上下文
export interface ICreateContext{
  readonly projectMeta: IProjectMeta;
  readonly path:string;
  readonly inputOptions:IInputOptions;
}


// 构建的上下文
export interface IBuildContext{
  readonly cliConfig: ICliConfig;
  readonly path:string;
  webpackConfig:any;
  readonly inputOptions:IInputOptions;
  readonly themeConfig:{
    themes:any[],
    themeWebpackConfigs:any[],
  };
  readonly packageConfig: any;
}

export type CdnMatchFunc = (name:string)=>boolean;
export interface ICdnItem {
 type: string;
 address: string;
 match: boolean | CdnMatchFunc;
}