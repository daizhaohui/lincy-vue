import {Module,Observable,Action } from '../../../../src/state';
@Module("test")
export default class Test{

  @Observable('')
  static test1;

  @Observable('test2')
  static test2;

  @Action()
  static update(data){}
}
