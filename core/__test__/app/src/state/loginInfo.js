import {Module,Observable } from '../../../../src/state';
@Module("user")
export default  class LoginInfo{

  @Observable('')
  static userId;
}
