import { IRouteLocationRaw } from "./router";


export declare interface IComponentContext{
  readonly appConfig: any;
  readonly instance: any;
  readonly currentRoute: IRouteLocationRaw;
  readonly isRouteComponent:boolean;
}

export declare interface IComponentPlugin{
  created(context:IComponentContext):void;
  beforeMount(context:IComponentContext):void;
  mounted(context:IComponentContext):void;
  beforeUpdate(context:IComponentContext):void;
  updated(context:IComponentContext):void;
  beforeUnmount(context:IComponentContext):void;
  unmounted(context:IComponentContext):void;
}