import { IApp,IAppContext } from '../types/app';
export default class AppContext implements IAppContext{

  #app:any = null;
  #config: any = null;

  constructor(...args: any[]){
    if(args.length>0){
      this.#app = (args[0] as IApp);
    }
    if(args.length>1){
      this.#config = args[1];
    }
  }

  get app(): IApp{
    return this.#app;
  }

  get config(): any{
    return this.#config;
  }

}