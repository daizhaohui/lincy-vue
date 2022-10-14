import {ICreateContext, IInputOptions, IProjectMeta } from "../typedefines";

export default class CreateContext implements ICreateContext{

  #projectMeta:IProjectMeta;
  #path:string = '';
  #inputOptions:IInputOptions;

  constructor(inputOptions:IInputOptions,path:string,projectMeta:IProjectMeta){
    this.#projectMeta = projectMeta;
    this.#inputOptions = inputOptions;
    this.#path =path;
  }
  get projectMeta(){
    return this.#projectMeta;
  }
  get path(){
    return this.#path
  }
  get inputOptions(){
    return this.#inputOptions;
  }

}