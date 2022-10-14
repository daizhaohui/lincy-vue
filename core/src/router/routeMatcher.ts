import {IRouteMatcher} from '../types/router';

export default class RouteMatcher implements IRouteMatcher{
  #meta:any = {};
  #name:string ='';
  #path: string = '';
  #components:any[] =[];
  #children:any[] = [];

  constructor(matcher:any){
    this.#meta = matcher.meta;
    this.#name =matcher.name;
    this.#path = matcher.path;
    this.#components =matcher.components;
    this.#children = matcher.children;
  }


  get meta(){
    return this.#meta;
  }
  get name(){
    return this.#name;
  }
  get path(){
    return this.#path;
  }
  get children(){
    return this.#children;
  }
  get components(){
    return this.#components;
  }
}