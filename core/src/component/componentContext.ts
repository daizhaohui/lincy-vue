import {IComponentContext} from '../types/component';
import {IRouteLocationRaw} from '../types/router';

export default class ComponentContext implements IComponentContext{

  #appConfig: any = null;
  #instance: any = null;
  #currentRoute: any = null;
  #isRouteComponent:boolean = false;

  constructor(options:any){
    this.#appConfig = options.appConfig;
    this.#instance = options.instance;
    this.#currentRoute = (options.currentRoute as IRouteLocationRaw);
    this.#isRouteComponent = options.isRouteComponent;
  }

  get appConfig(){
    return this.#appConfig;
  }

  get instance(){
    return this.#instance;
  }

  get currentRoute(){
    return this.#currentRoute;
  }

  get isRouteComponent(){
    return this.#isRouteComponent;
  }
}