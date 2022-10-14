import { IBuildContext } from "../typedefines";
import BuildUtil from "./util";

export default class CommonScript{
  
  #buildContext: IBuildContext;
  #scriptLines:string[] = [];
  
  constructor(buildContext:IBuildContext){
    this.#buildContext = buildContext;
  }

  createRem(){
    const isMobile = BuildUtil.isMobile(this.#buildContext.inputOptions);
    const remUnit = isMobile ? (this.#buildContext.cliConfig.designPx || 750)/10: '';
    const script = `var _rem_unit_=${remUnit};`;
    isMobile && this.#scriptLines.push(script);
  }

  create():string{
    this.createRem();
    return this.#scriptLines.join('\n');
  }
}