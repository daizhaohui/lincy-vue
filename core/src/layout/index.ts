class Rem extends Number{

  #remUnit: number;

  constructor(px:number){
    super(px / 10);
    this.#remUnit = px / 10;
  }

  toString(decimal:number):string{
    if(decimal!==undefined){
      return `${this.#remUnit.toFixed(decimal)}rem`;
    } else {
      return `${this.#remUnit}rem`;
    }
  }
}

export function useRem(px:number):Rem{
  return new Rem(px);
}
