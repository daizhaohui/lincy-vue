export declare interface VueComponent {
  name:string,
  component: any,
};

export  declare type VoidFunc = (...args:any[])=>void;
export  declare interface KeyValues{ [key:string]:any };
export  declare type ProperyName = string | symbol;
export  declare type Func = (...args:any[])=>void;
export  declare type ModulesType = {
  [key: string]: string;
};
