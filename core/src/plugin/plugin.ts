import { IPlugin } from "../types/plugin";

export default class Plugin implements IPlugin{

  constructor(name:string,instance:any){
    this.name = name;
    this.instance = instance;
  }

  name: string;
  instance: any;

}