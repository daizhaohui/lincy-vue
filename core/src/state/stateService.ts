import { EncDesCryptFunc, IStateService } from "../types/state";
import { encryptText,descryptText } from '../utils/internal/security'

export default class StateService implements IStateService{
  #encryptFunc:EncDesCryptFunc | null;
  #descryptFunc:EncDesCryptFunc | null;

  constructor(){
    this.#descryptFunc = null;
    this.#encryptFunc = null;
  }

  getItem(key: string):string | null{
    return localStorage.getItem(key);
  }
  setItem(key: string, value: string): void {
    localStorage.setItem(key,value);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  encrypt(value: string): string {
    if(!value) return '';
    return  this.#encryptFunc ? this.#encryptFunc(value) : encryptText(value);
  }
  descrypt(value: string): string {
    if(!value) return '';
    return this.#descryptFunc ? this.#descryptFunc(value) : descryptText(value);
  }
  setEnDesCrypt(encrypt: EncDesCryptFunc, descrypt: EncDesCryptFunc): void {
    this.#encryptFunc = encrypt;
    this.#descryptFunc =  descrypt;
  }

}